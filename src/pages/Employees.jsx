import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/Sidebar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import EmployeeStats from "../components/EmployeeStats.jsx";
import EmployeeTable from "../components/EmployeeTable.jsx";
import EmployeeForm from "../components/EmployeeForm.jsx";

import { initialEmployees } from "../data/employees.js";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeApi.js";

const STORAGE_KEY = "peopledesk-employees";

function readSavedEmployees() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return JSON.parse(saved);
  } catch {
    console.warn("Could not read saved employee records.");
  }

  return null;
}

export default function Employees() {
  const [employees, setEmployees] = useState(
    () => readSavedEmployees() ?? initialEmployees
  );
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiMode, setApiMode] = useState("local");
  const [apiError, setApiError] = useState("");

  // Load API data on the first visit only when there are no saved records.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (readSavedEmployees() !== null) return;

      setLoading(true);

      try {
        const data = await getEmployees();

        if (cancelled) return;

        setEmployees(data);
        setApiMode("api");
        setApiError("");
      } catch {
        if (cancelled) return;

        setApiError("API unavailable. Showing sample employee records.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // Persist records locally so refreshes retain CRUD changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {
      setNotice("Could not save changes to browser storage.");
    }
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch = [
        employee.firstName,
        employee.lastName,
        employee.email,
        employee.department,
        employee.position,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  function openAddForm() {
    setEditingEmployee(null);
    setFormOpen(true);
  }

  function openEditForm(employee) {
    setEditingEmployee(employee);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingEmployee(null);
  }

  async function handleSave(employee) {
    const isEditing = employees.some(
      (item) => item.id === employee.id
    );

    // Update UI immediately; API calls run in the background.
    setEmployees((current) =>
      isEditing
        ? current.map((item) =>
            item.id === employee.id ? employee : item
          )
        : [employee, ...current]
    );

    closeForm();
    setNotice(
      isEditing
        ? "Employee updated successfully."
        : "Employee added successfully."
    );

    try {
      if (isEditing) {
        await updateEmployee(employee);
      } else {
        await createEmployee(employee);
      }
    } catch {
      setNotice(
        "Changes are saved locally, but the API request failed."
      );
    }
  }

  async function handleDelete(employee) {
    const confirmed = window.confirm(
      `Delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmed) return;

    setEmployees((current) =>
      current.filter((item) => item.id !== employee.id)
    );

    setNotice("Employee deleted successfully.");

    try {
      await deleteEmployee(employee.id);
    } catch {
      setNotice(
        "Employee removed locally, but the API request failed."
      );
    }
  }

  async function handleStatusChange(employee, status) {
    const updated = { ...employee, status };

    setEmployees((current) =>
      current.map((item) =>
        item.id === employee.id ? updated : item
      )
    );

    try {
      await updateEmployee(updated);
    } catch {
      setNotice("Status saved locally; API update failed.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#193D32] md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1600px]">
          <DashboardHeader
            search={search}
            setSearch={setSearch}
            department={department}
            setDepartment={setDepartment}
            onAdd={openAddForm}
          />

          {notice && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-[#CDE3D1] bg-[#E8F3E9] px-4 py-3 text-sm font-medium text-[#28764E]"
            >
              <span>{notice}</span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="text-xl"
              >
                ×
              </button>
            </div>
          )}

          {apiError && (
            <div className="mb-5 rounded-xl border border-[#EBD8AA] bg-[#FFF5DA] px-4 py-3 text-sm text-[#795D22]">
              {apiError}
            </div>
          )}

          <EmployeeStats employees={employees} />

          {loading && (
            <p className="mb-4 text-sm text-[#83877D]">
              Loading employee data from API…
            </p>
          )}

          <EmployeeTable
            employees={filteredEmployees}
            onEdit={openEditForm}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />

          <footer className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[#E3E5DC] py-5 text-xs text-[#83877D]">
            <span>© 2026 PeopleDesk</span>
            <span>
              {apiMode === "api" ? "API connected" : "Local records"}
            </span>
          </footer>
        </div>
      </main>

      {formOpen && (
        <EmployeeForm
          employee={editingEmployee}
          employees={employees}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
}