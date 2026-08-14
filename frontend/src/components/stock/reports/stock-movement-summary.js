"use client";

export default function StockMovementSummary({
  total,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        Total Movements
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {total}
      </p>
    </div>
  );
}