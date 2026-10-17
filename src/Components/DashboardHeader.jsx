export default function DashboardHeader({
  search,
  setSearch,
  department,
  setDepartment,
  onAdd,
}) {
  return (
    <header className="mb-8">
      <p className="mb-5 text-xs text-[#83877D]">
        Workspace / Employee directory
      </p>

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 text-[10px] font-extrabold tracking-[2px] text-[#28835A]">
            PEOPLE OPERATIONS
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#193D32] sm:text-4xl">
            Employee directory<span className="text-[#E6B653]">.</span>
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#83877D]">
            Manage your people, organize teams, and keep employee
            information up to date.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#28835A] px-5 text-sm font-bold text-white transition hover:bg-[#206A48] active:scale-[0.98]"
        >
          <span className="text-xl">+</span>
          Add employee
        </button>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <label className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-[#E3E5DC] bg-white px-4 focus-within:border-[#28835A]">
          <span className="text-lg text-[#83877D]">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email, position..."
            aria-label="Search employees"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#A0A397]"
          />
        </label>

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          aria-label="Filter by department"
          className="h-12 rounded-xl border border-[#E3E5DC] bg-white px-4 text-sm text-[#193D32] outline-none focus:border-[#28835A]"
        >
          <option value="All">All departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>
    </header>
  );
}