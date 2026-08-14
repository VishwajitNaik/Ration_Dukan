import { format } from "date-fns";

export default function RecentTransactions({
  transactions,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Transactions
        </h2>

        <span className="text-sm text-gray-500">
          {transactions.length} records
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-3">RC Number</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Qty</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-500"
                >
                  No transactions today.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.distributionId}
                  className="border-b last:border-0"
                >
                  <td className="py-3 font-medium">
                    {tx.rcNumber}
                  </td>

                  <td className="py-3">
                    {format(new Date(tx.date), "dd MMM yyyy")}
                  </td>

                  <td className="py-3">
                    {tx.totalItems}
                  </td>

                  <td className="py-3">
                    {tx.totalQuantity}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}