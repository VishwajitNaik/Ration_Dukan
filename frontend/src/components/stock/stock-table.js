"use client";

import Link from "next/link";

import StockStatusBadge from "./stock-status-badge";

export default function StockTable({
  batches,
  onDelete,
}) {
  if (!batches || batches.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        No stock batches found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm text-gray-600">
            <th className="w-32 px-4 py-3">
              Batch No
            </th>

            <th className="w-[320px] px-4 py-3">
              Batch Date
            </th>

            <th className="w-32 px-4 py-3">
              Commodities
            </th>

            <th className="w-32 px-4 py-3">
              Total Received
            </th>

            <th className="w-32 px-4 py-3">
              Total Remaining
            </th>

            <th className="w-28 px-4 py-3">
              Status
            </th>

            <th className="w-40 px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {batches.map((batch) => {
            const totalReceived =
              batch.items?.reduce(
                (sum, item) =>
                  sum +
                  Number(
                    item.receivedQty || 0
                  ),
                0
              ) || 0;

            const totalRemaining =
              batch.items?.reduce(
                (sum, item) =>
                  sum +
                  Number(
                    item.remainingQty || 0
                  ),
                0
              ) || 0;

            const commodityNames =
              batch.items
                ?.map((item) =>
                  item.commodity.replace(
                    /_/g,
                    " "
                  )
                )
                .join(", ") || "-";

            return (
              <tr
                key={batch._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {batch.batchNo}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {new Date(
                    batch.batchDate
                  ).toLocaleDateString()}
                </td>

  <td className="w-[320px] max-w-[320px] px-4 py-3">
  <div>
    <p className="mb-2 font-medium text-gray-900">
      {batch.items?.length || 0} Items
    </p>

    <div className="overflow-x-auto">
      <div className="flex w-max gap-2 pb-1">
        {batch.items?.map((item) => (
          <span
            key={item.commodity}
            className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {item.commodity.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </div>
  </div>
</td>

                <td className="px-4 py-3 text-gray-700">
                  {totalReceived}
                </td>

                <td className="px-4 py-3 font-medium text-gray-900">
                  {totalRemaining}
                </td>

                <td className="px-4 py-3">
                  <StockStatusBadge
                    remainingQty={
                      totalRemaining
                    }
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/stock/${batch._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      href={`/stock/${batch._id}/edit`}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(batch._id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}