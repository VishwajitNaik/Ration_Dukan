export default function KpiCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-xs text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}