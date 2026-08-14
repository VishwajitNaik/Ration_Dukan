"use client";

export default function BatchConsumptionCards({
  summary,
}) {
  const cards = [
    {
      label: "Total Batches",
      value: summary.totalBatches,
    },
    {
      label: "Active Batches",
      value: summary.activeBatches,
    },
    {
      label: "Closed Batches",
      value: summary.closedBatches,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
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