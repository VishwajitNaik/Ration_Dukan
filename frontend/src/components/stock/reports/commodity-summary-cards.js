"use client";

export default function CommoditySummaryCards({
  summary,
}) {
  const cards = [
    {
      label: "Total Commodities",
      value: summary.totalCommodities,
    },
    {
      label: "Total Received",
      value: summary.totalReceived,
    },
    {
      label: "Total Distributed",
      value: summary.totalDistributed,
    },
    {
      label: "Total Remaining",
      value: summary.totalRemaining,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {card.label}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}