"use client";

export default function StockLedgerCard({
  ledger,
}) {
  const rows = [
    {
      label: "Opening Stock",
      value: ledger.opening,
    },
    {
      label: "Received",
      value: ledger.received,
    },
    {
      label: "Distributed",
      value: ledger.distributed,
    },
    {
      label: "Closing Stock",
      value: ledger.closing,
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            {ledger.commodity.replace(
              /_/g,
              " "
            )} Ledger
          </h2>

          <p className="text-sm text-gray-500">
            {ledger.month
              ? `Month: ${ledger.month}`
              : "All Months"}
            {" • "}
            {ledger.year || "All Years"}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ledger.balanced
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {ledger.balanced
            ? "Balanced"
            : "Mismatch"}
        </span>

      </div>

      <div className="space-y-4">

        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b pb-3"
          >

            <span className="text-gray-600">
              {row.label}
            </span>

            <span className="text-lg font-semibold text-gray-900">
              {row.value}
            </span>

          </div>
        ))}

      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
        <strong>Formula:</strong>
        <br />
        Opening + Received - Distributed = Closing
        <br />
        {ledger.opening} + {ledger.received} -{" "}
        {ledger.distributed} = {ledger.closing}
      </div>

    </div>
  );
}