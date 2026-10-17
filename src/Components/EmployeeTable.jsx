function StatusBadge({ status }) {
  const styles = {
    Active: "bg-[#E1EFE4] text-[#28764E]",
    "On Leave": "bg-[#FFF0CF] text-[#986B19]",
    Inactive: "bg-[#F5E3DC] text-[#A84C32]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || styles.Active
      }`}
    >
      {status}
    </span>
  );
}

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#D8DED2] bg-white px-6 py-16 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[#E1EFE4] text-3xl text-[#28835A]">
          ♙
        </div>
        <h3 className="text-lg font-bold text-[#193D32]">
          No employees found
        </h3>
        <p className="mt-2 text-sm text-[#83877D]">
          Try another search or add a new employee.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4E6DD] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9EBE2] px-5 py-5">
        <div>
          <h3 className="font-bold text-[#193D32]">
            All employees
          </h3>
          <p className="mt-1 text-xs text-[#83877D]">
            Employee information and management
          </p>
        </div>

        <span className="rounded-lg bg-[#E1EFE4] px-3 py-2 text-xs font-bold text-[#28764E]">
          {employees.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-[#F7F8F3]">
            <tr className="text-[10px] uppercase tracking-wider text-[#83877D]">
              <th className="px-5 py-4 font-bold">Employee</th>
              <th className="px-5 py-4 font-bold">Department</th>
              <th className="px-5 py-4 font-bold">Position</th>
              <th className="px-5 py-4 font-bold">Salary / year</th>
              <th className="px-5 py-4 font-bold">Status</th>
              <th className="px-5 py-4 font-bold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EDF0E8]">
            {employees.map((employee) => {
              const fullName =
                `${employee.firstName} ${employee.lastName}`;

              return (
                <tr
                  key={employee.id}
                  className="transition hover:bg-[#FAFBF7]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.image}
                        alt={fullName}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            "https://ui-avatars.com/api/?background=E1EFE4&color=193D32&name=" +
                            encodeURIComponent(fullName);
                        }}
                        className="h-11 w-11 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#193D32]">
                          {fullName}
                        </p>
                        <p className="mt-1 text-xs text-[#83877D]">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-[#F0F2EA] px-3 py-1.5 text-xs font-medium text-[#526450]">
                      {employee.department}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#626B60]">
                    {employee.position}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-[#193D32]">
                    {Number(employee.salary).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={employee.status}
                      onChange={(event) =>
                        onStatusChange(employee, event.target.value)
                      }
                      aria-label={`Change status for ${fullName}`}
                      className="mb-2 block w-full max-w-[115px] rounded-lg border border-[#E3E5DC] bg-white px-2 py-1.5 text-xs text-[#193D32] outline-none focus:border-[#28835A]"
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Inactive</option>
                    </select>
                    <StatusBadge status={employee.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(employee)}
                        className="rounded-lg bg-[#E1EFE4] px-3 py-2 text-xs font-bold text-[#28764E] transition hover:bg-[#CEE4D3]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(employee)}
                        className="rounded-lg bg-[#F5E3DC] px-3 py-2 text-xs font-bold text-[#A84C32] transition hover:bg-[#EFD2C6]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}