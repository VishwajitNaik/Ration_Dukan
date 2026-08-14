export default function StockWidget({ stock }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-gray-500 font-semibold">
          Current Stock
        </h2>

        <span className="text-sm text-gray-500">
          {stock.length} commodities
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {stock.map((item) => (
          <div
            key={item.commodity}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
          >
            <div>
              <p className="font-medium">
                {item.commodity.replaceAll("_", " ")}
              </p>

              <p className="text-xs text-gray-500">
                Available stock
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-500">
                {item.available}
              </p>

              <p className="text-xs text-gray-500">
                {item.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}