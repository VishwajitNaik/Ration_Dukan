import Link from "next/link";

export default function StockQuickActions() {
  const actions = [
    {
      label: "Receive Stock",
      href: "/stock/new",
    },
    {
      label: "Batch List",
      href: "/stock",
    },
    {
      label: "Stock Register",
      href: "/stock/reports/register",
    },
    {
      label: "Commodity Summary",
      href: "/stock/reports/commodity-summary",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-lg border px-4 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}