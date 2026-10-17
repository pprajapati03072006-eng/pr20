import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#193D32] p-5 text-white md:sticky md:top-0 md:h-screen md:w-64 md:p-7">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E6B653] text-2xl font-black text-[#193D32]">
          P
        </div>
        <div>
          <h1 className="text-xl font-extrabold">PeopleDesk</h1>
          <p className="mt-1 text-[9px] tracking-[3px] text-[#C7D8CB]">
            TEAM MANAGEMENT
          </p>
        </div>
      </div>

      <p className="mb-4 text-[10px] font-bold tracking-[2px] text-[#AFC5B4]">
        WORKSPACE
      </p>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition ${
            isActive
              ? "bg-[#315646] font-bold text-white ring-1 ring-[#547863]"
              : "text-[#D7E1D9] hover:bg-[#284B3B]"
          }`
        }
      >
        <span className="text-lg">▦</span>
        Employees
        <span className="ml-auto text-[#E6B653]">→</span>
      </NavLink>

      <div className="mt-8 rounded-2xl border border-[#416451] bg-[#244A39] p-4">
        <div className="mb-3 text-xl text-[#E6B653]">✳</div>
        <p className="text-sm font-semibold">People first.</p>
        <p className="mt-2 text-xs leading-5 text-[#C7D8CB]">
          A simpler way to organize your team and manage employee records.
        </p>
      </div>

      <div className="mt-8 hidden border-t border-[#416451] pt-6 md:mt-auto md:block">
        <p className="text-sm font-semibold">Administrator</p>
        <p className="mt-1 text-xs text-[#C7D8CB]">HR workspace</p>
      </div>
    </aside>
  );
}