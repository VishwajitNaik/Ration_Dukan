"use client";

export default function CommoditySummaryTable({
  commodities,
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
              Received
            </th>

            <th className="px-4 py-3 text-right">
              Distributed
            </th>

            <th className="px-4 py-3 text-right">
              Remaining
            </th>

            <th className="px-4 py-3 text-center">
              Cards
            </th>

            <th className="px-4 py-3 text-center">
              Unit
            </th>
          </tr>
        </thead>

        <tbody>
          {commodities.map((item) => (
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

              <td className="px-4 py-3 text-right">
                {item.received}
              </td>

              <td className="px-4 py-3 text-right">
                {item.distributed}
              </td>

              <td className="px-4 py-3 text-right font-semibold">
                {item.remaining}
              </td>

              <td className="px-4 py-3 text-center">
                {item.totalCards}
              </td>

              <td className="px-4 py-3 text-center">
                {item.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}