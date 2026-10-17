export default function EmployeeModal({
  title = "Employee Details",
  children,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#193D32]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-modal-title"
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#F6F7F2] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-[#193D32] px-6 py-5 sm:px-8">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[3px] text-[#E6B653]">
              PEOPLE DESK
            </p>

            <h2
              id="employee-modal-title"
              className="text-2xl font-extrabold text-white"
            >
              {title}
            </h2>

            <p className="mt-1 text-sm text-[#C7D8CB]">
              Manage your employee information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-[#B85C38]"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#E3E5DC] bg-white px-6 py-4 sm:px-8">
          <span className="text-xs text-[#83877D]">
            Employee Management
          </span>

          <span className="rounded-full bg-[#E1EFE4] px-3 py-1 text-xs font-semibold text-[#28764E]">
            PeopleDesk
          </span>
        </div>
      </div>
    </div>
  );
}