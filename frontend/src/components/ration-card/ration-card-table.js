"use client";

import Link from "next/link";

export default function RationCardTable({ cards }) {
  // Group cards by cardType
  const groupedCards = cards.reduce((acc, card) => {
    if (!acc[card.cardType]) {
      acc[card.cardType] = [];
    }

    acc[card.cardType].push(card);

    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedCards).map(
        ([cardType, group]) => (
          <div
            key={cardType}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            {/* Group Header */}
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {cardType}
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {group.length} Cards
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3">
                      RC Number
                    </th>

                    <th className="px-4 py-3">
                      Head
                    </th>

                    <th className="px-4 py-3">
                      Members
                    </th>

                    <th className="px-4 py-3">
                      Status
                    </th>

                    <th className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {group.map((card) => (
                    <tr
                      key={card._id}
                      className="border-t"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {card.rcNumber}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {card.members?.find(
                          (m) => m.isHead
                        )?.name || "-"}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {card.members?.filter(
                          (m) => !m.isDeleted
                        ).length || 0}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          {card.cardStatus}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <Link
                            href={`/ration-cards/${card._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </Link>

                          <Link
                            href={`/ration-cards/${card._id}/edit`}
                            className="text-indigo-600 hover:underline"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}