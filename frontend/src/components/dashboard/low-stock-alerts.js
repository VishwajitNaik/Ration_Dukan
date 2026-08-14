export default function LowStockAlerts({ lowStock }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <h2 className="text-lg text-gray-500 font-semibold">
        Low Stock Alerts
      </h2>

      <div className="mt-4">
        {lowStock.length === 0 ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            No low stock items.
          </div>
        ) : (
          <div className="space-y-3">
            {lowStock.map((item) => (
              <div
                key={item.commodity}
                className="rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-red-800">
                    {item.commodity.replaceAll("_", " ")}
                  </span>

                  <span className="font-semibold text-red-700">
                    {item.available} {item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}