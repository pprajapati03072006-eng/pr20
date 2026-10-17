import { initialEmployees } from "../data/employees.js";

const API_URL = "https://dummyjson.com/users";

function normalizeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    department: user.company?.department || "Engineering",
    position: user.company?.title || "Team Member",
    salary: user.salary || 60000,
    status: "Active",
    image: user.image || "",
  };
}

export async function getEmployees() {
  const response = await fetch(`${API_URL}?limit=10`);

  if (!response.ok) {
    throw new Error("Unable to fetch employees.");
  }

  const data = await response.json();
  return data.users.map(normalizeUser);
}

export async function createEmployee(employee) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Unable to create employee through the API.");
  }

  const data = await response.json();
  return { ...employee, id: data.id ?? Date.now() };
}

export async function updateEmployee(employee) {
  const response = await fetch(`${API_URL}/${employee.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Unable to update employee through the API.");
  }

  return employee;
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete employee through the API.");
  }

  return response.json();
}

export { initialEmployees };