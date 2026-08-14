import Link from "next/link";

const actions = [
  {
    label: "New Distribution",
    href: "/distribution/new",
  },
  {
    label: "Distribution List",
    href: "/distribution/list",
  },
  {
    label: "Today Report",
    href: "/distribution/reports/today",
  },
  {
    label: "Daily Register",
    href: "/distribution/reports/daily-register",
  },
];

export default function DistributionQuickActions() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
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