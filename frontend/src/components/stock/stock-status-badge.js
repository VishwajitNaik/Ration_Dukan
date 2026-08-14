export default function StockStatusBadge({
  remainingQty,
}) {
  let color =
    "bg-green-100 text-green-700";

  let label = "Available";

  if (remainingQty <= 0) {
    color =
      "bg-red-100 text-red-700";

    label = "Finished";
  } else if (remainingQty <= 100) {
    color =
      "bg-yellow-100 text-yellow-700";

    label = "Low";
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}