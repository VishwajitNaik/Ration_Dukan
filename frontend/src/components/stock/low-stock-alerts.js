export default function LowStockAlerts({
  lowStock,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Low Stock Alerts
      </h2>

      <div className="mt-4 space-y-3">
        {lowStock.length === 0 ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            No low stock items.
          </div>
        ) : (
          lowStock.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
            >
              <div>
                <p className="font-medium text-red-700">
                  {item._id.replace(/_/g, " ")}
                </p>

                <p className="text-sm text-red-600">
                  Remaining: {item.remainingQty}{" "}
                  {item.unit}
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                LOW
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}