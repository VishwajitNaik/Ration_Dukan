"use client";

export default function LowStockTable({
  items,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Commodity
            </th>

            <th className="px-4 py-3 text-right">
              Remaining
            </th>

            <th className="px-4 py-3 text-right">
              Threshold
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.commodity}
              className="border-t"
            >
              <td className="px-4 py-3 font-medium">
                {item.commodity.replace(
                  /_/g,
                  " "
                )}
              </td>

              <td className="px-4 py-3 text-right font-semibold text-red-600">
                {item.remainingQty}{" "}
                {item.unit}
              </td>

              <td className="px-4 py-3 text-right">
                {item.threshold}{" "}
                {item.unit}
              </td>

              <td className="px-4 py-3 text-center">
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  LOW
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}