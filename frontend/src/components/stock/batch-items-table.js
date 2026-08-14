"use client";

export default function BatchItemsTable({
  items,
}) {
  return (
    <div className="overflow-hidden rounded-xl text-gray-600 border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Commodities
        </h2>
      </div>

      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr className="text-left text-sm text-gray-600">

            <th className="px-4 py-3">
              Commodity
            </th>

            <th className="px-4 py-3">
              Received
            </th>

            <th className="px-4 py-3">
              Remaining
            </th>

            <th className="px-4 py-3">
              Unit
            </th>

          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr
              key={item._id}
              className="border-t"
            >

              <td className="px-4 py-3  font-medium text-gray-900">
                {item.commodity.replace(
                  /_/g,
                  " "
                )}
              </td>

              <td className="px-4 py-3">
                {item.receivedQty}
              </td>

              <td className="px-4 py-3">
                {item.remainingQty}
              </td>

              <td className="px-4 py-3">
                {item.unit} 
              </td> 

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}