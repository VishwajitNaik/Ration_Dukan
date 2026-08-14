import AllocationList from "./allocation-list";

export default function DistributionItemsTable({
  items,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

      <table className="min-w-full text-sm">

        <thead className="bg-gray-50 text-left text-gray-600">

          <tr>
            <th className="px-4 py-3">
              Commodity
            </th>
            <th className="px-4 py-3">
              Quantity
            </th>
            <th className="px-4 py-3">
              Unit
            </th>
            <th className="px-4 py-3">
              Batch Allocation
            </th>
          </tr>

        </thead>

        <tbody>

          {items.map((item, index) => (
            <tr
              key={index}
              className="border-t"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {item.commodity.replace(
                  /_/g,
                  " "
                )}
              </td>

              <td className="px-4 py-3 text-gray-700">
                {item.quantity}
              </td>

              <td className="px-4 py-3 text-gray-700">
                {item.unit}
              </td>

              <td className="px-4 py-3">
                <AllocationList
                  allocations={
                    item.allocations
                  }
                />
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}