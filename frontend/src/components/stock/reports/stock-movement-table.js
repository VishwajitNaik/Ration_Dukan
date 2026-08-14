"use client";

export default function StockMovementTable({
  movements,
}) {
  let runningBalance = 0;

  const getBadge = (type) => {
    switch (type) {
      case "RECEIVED":
        return "bg-green-100 text-green-700";

      case "DISTRIBUTED":
        return "bg-red-100 text-red-700";

      case "REVERSED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Date
              </th>

              <th className="px-4 py-3 text-left">
                Type
              </th>

              <th className="px-4 py-3 text-left">
                Reference
              </th>

              <th className="px-4 py-3 text-right">
                Quantity
              </th>

              <th className="px-4 py-3 text-right">
                Balance
              </th>

            </tr>

          </thead>

          <tbody>

            {movements.map((item, index) => {

              if (
                item.type === "RECEIVED" ||
                item.type === "REVERSED"
              ) {
                runningBalance += Number(
                  item.quantity
                );
              } else if (
                item.type === "DISTRIBUTED"
              ) {
                runningBalance -= Number(
                  item.quantity
                );
              }

              return (
                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="px-4 py-3">
                    {new Date(
                      item.date
                    ).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getBadge(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="px-4 py-3">

                    {item.batchNo && (
                      <div className="text-sm text-gray-900">
                        Batch: {item.batchNo}
                      </div>
                    )}

                    {item.rcNumber && (
                      <div className="text-sm text-gray-900">
                        RC: {item.rcNumber}
                      </div>
                    )}

                  </td>

                  <td
                    className={`px-4 py-3 text-right font-medium ${
                      item.type ===
                      "DISTRIBUTED"
                        ? "text-red-600"
                        : "text-green-700"
                    }`}
                  >
                    {item.type ===
                    "DISTRIBUTED"
                      ? "-"
                      : "+"}
                    {item.quantity}{" "}
                    {item.unit}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold">
                    {runningBalance}{" "}
                    {item.unit}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>
    </div>
  );
}