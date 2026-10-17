const cards = [
  {
    label: "Total employees",
    key: "total",
    icon: "♙",
    color: "bg-[#E1EFE4] text-[#28835A]",
  },
  {
    label: "Active employees",
    key: "active",
    icon: "✓",
    color: "bg-[#F9EBCB] text-[#987021]",
  },
  {
    label: "Departments",
    key: "departments",
    icon: "▦",
    color: "bg-[#F3E2D8] text-[#B85C38]",
  },
];

export default function EmployeeStats({ employees }) {
  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "Active").length,
    departments: new Set(employees.map((e) => e.department)).size,
  };

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.key}
          className="flex items-center gap-4 rounded-2xl border border-[#E4E6DD] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl font-bold ${card.color}`}
          >
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-medium text-[#83877D]">
              {card.label}
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-[#193D32]">
              {String(stats[card.key]).padStart(2, "0")}
            </h3>
          </div>
        </article>
      ))}
    </section>
  );
}