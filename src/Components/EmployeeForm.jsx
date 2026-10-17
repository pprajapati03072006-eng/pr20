import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  department: "Engineering",
  position: "",
  salary: "",
  status: "Active",
  image: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#E3E5DC] bg-[#FAFBF7] px-4 py-3 text-sm outline-none transition focus:border-[#28835A] focus:ring-2 focus:ring-[#28835A]/10";

export default function EmployeeForm({
  employee,
  employees,
  onSave,
  onClose,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      employee
        ? { ...emptyForm, ...employee, salary: String(employee.salary ?? "") }
        : emptyForm
    );
    setError("");
  }, [employee]);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();

    if (!form.firstName.trim() || !form.lastName.trim() ||
        !form.position.trim() || !email) {
      setError("Please complete all required fields.");
      return;
    }

    const duplicate = employees.some(
      (item) =>
        item.email.toLowerCase() === email &&
        item.id !== employee?.id
    );

    if (duplicate) {
      setError("An employee with this email already exists.");
      return;
    }

    onSave({
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email,
      position: form.position.trim(),
      salary: Number(form.salary) || 0,
      id: employee?.id ?? `emp-${Date.now()}`,
      image:
        form.image.trim() ||
        `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#13271E]/60 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-form-title"
        className="my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="mb-2 text-[10px] font-extrabold tracking-[2px] text-[#28835A]">
              PEOPLE OPERATIONS
            </p>
            <h2
              id="employee-form-title"
              className="text-2xl font-extrabold text-[#193D32]"
            >
              {employee ? "Edit employee" : "Add new employee"}
            </h2>
            <p className="mt-2 text-sm text-[#83877D]">
              Enter the employee details below.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-xl px-3 py-2 text-xl text-[#83877D] hover:bg-[#F1F3EB]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#465448]">
              First name *
              <input
                required
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className={inputClass}
              />
            </label>

            <label className="text-xs font-bold text-[#465448]">
              Last name *
              <input
                required
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className={inputClass}
              />
            </label>
          </div>

          <label className="block text-xs font-bold text-[#465448]">
            Email address *
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="employee@company.com"
              className={inputClass}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#465448]">
              Department
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={inputClass}
              >
                {[
                  "Engineering",
                  "Design",
                  "Marketing",
                  "Finance",
                  "Human Resources",
                ].map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </label>

            <label className="text-xs font-bold text-[#465448]">
              Job title *
              <input
                required
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Software Engineer"
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#465448]">
              Annual salary
              <input
                type="number"
                min="0"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="60000"
                className={inputClass}
              />
            </label>

            <label className="text-xs font-bold text-[#465448]">
              Employment status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>

          <label className="block text-xs font-bold text-[#465448]">
            Profile image URL
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className={inputClass}
            />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-[#E9EBE2] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E3E5DC] px-5 py-3 text-sm font-semibold text-[#626B60] hover:bg-[#F6F7F2]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#28835A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#206A48]"
            >
              {employee ? "Save changes" : "Create employee"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}