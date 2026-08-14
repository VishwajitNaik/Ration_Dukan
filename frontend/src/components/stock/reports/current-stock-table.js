"use client";

export default function CurrentStockTable({
  stock,
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
              Remaining
            </th>

            <th className="px-4 py-3 text-center">
              Unit
            </th>

          </tr>

        </thead>

        <tbody>

          {stock.map((item) => (

            <tr
              key={item._id}
              className="border-t"
            >

              <td className="px-4 py-3 font-medium">
                {item._id.replace(/_/g, " ")}
              </td>

              <td className="px-4 py-3 text-right">
                {item.receivedQty}
              </td>

              <td className="px-4 py-3 text-right font-semibold">
                {item.remainingQty}
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