"use client";

import Link from "next/link";
import ReverseDistributionButton from "./reverse-distribution-button";

export default function DistributionTable({
  distributions,
  onReverse,
  reversingId,
}) {
  if (distributions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
        No distributions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

      <table className="min-w-full text-sm">

        <thead className="bg-gray-50 text-left text-gray-600">

          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">RC Number</th>
            <th className="px-4 py-3">Collected By</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>

        </thead>

        <tbody>

          {distributions.map((distribution) => (
            <tr
              key={distribution._id}
              className="border-t"
            >
              <td className="px-4 py-3 text-gray-700">
                {new Date(
                  distribution.distributionDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 font-medium text-gray-900">
                {
                  distribution.rationCardId
                    ?.rcNumber
                }
              </td>

              <td className="px-4 py-3 text-gray-700">
                {distribution.collectedBy?.name}
              </td>

              <td className="px-4 py-3 text-gray-700">
                {distribution.items.length} items
              </td>

<td className="px-4 py-3">
  <span
    className={`rounded-full px-2 py-1 text-xs font-medium ${
      distribution.isDeleted
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {distribution.isDeleted
      ? "REVERSED"
      : "ACTIVE"}
  </span>
</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">

                  <Link
                    href={`/distribution/${distribution._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>

                    {!distribution.isDeleted && (
                    <ReverseDistributionButton
                        distributionId={distribution._id}
                    />
                    )}

                </div>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}