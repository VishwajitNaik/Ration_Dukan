"use client";

export default function BatchConsumptionTable({
  batches,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Batch
              </th>

              <th className="px-4 py-3 text-left">
                Commodity
              </th>

              <th className="px-4 py-3 text-right">
                Received
              </th>

              <th className="px-4 py-3 text-right">
                Consumed
              </th>

              <th className="px-4 py-3 text-right">
                Remaining
              </th>

              <th className="px-4 py-3 text-center">
                Usage %
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {batches.map((item, index) => (

              <tr
                key={`${item.batchId}-${item.commodity}-${index}`}
                className="border-t"
              >

                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {item.batchNo}
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(
                      item.batchDate
                    ).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-4 py-3 font-medium">
                  {item.commodity.replace(
                    /_/g,
                    " "
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.receivedQty}{" "}
                  {item.unit}
                </td>

                <td className="px-4 py-3 text-right text-orange-600">
                  {item.consumedQty}{" "}
                  {item.unit}
                </td>

                <td className="px-4 py-3 text-right font-semibold">
                  {item.remainingQty}{" "}
                  {item.unit}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">

                    <div className="h-2 w-full rounded-full bg-gray-200">

                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            item.consumptionPercentage,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                    <span className="min-w-[48px] text-sm font-medium text-gray-700">
                      {item.consumptionPercentage}%
                    </span>

                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}