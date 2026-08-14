export default function CurrentStockWidget({
  stock,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Current Stock
        </h2>

        <span className="text-sm text-gray-500">
          {stock.length} Commodities
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stock.map((item) => (
          <div
            key={item._id}
            className="rounded-lg border p-4"
          >
            <p className="text-sm font-medium text-gray-500">
              {item._id.replace(/_/g, " ")}
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {item.remainingQty}
            </p>

            <p className="text-sm text-gray-500">
              {item.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}