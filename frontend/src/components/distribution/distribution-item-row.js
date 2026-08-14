"use client";

export default function DistributionItemRow({
  item,
  index,
  onChange,
}) {
//   const handleCommodityChange = (
//     commodity
//   ) => {
//     onChange(index, {
//       ...item,
//       commodity,
//       unit:
//         commodity === "PALM_OIL"
//           ? "LITER"
//           : "KG",
//     });
//   };

  return (
    <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">

  <div>
  <label className="block text-sm font-medium text-gray-700">
    Commodity
  </label>

  <input
    value={item.commodity.replace(/_/g, " ")}
    readOnly
    className="mt-1 w-full rounded-lg border bg-gray-100 px-3 py-2"
  />

  <p className="mt-1 text-xs text-gray-500">
    Available: {item.availableQty} {item.unit}
  </p>
</div>

      <div>

        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={item.quantity}
          onChange={(e) =>
            onChange(index, {
              ...item,
              quantity:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="0"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-700">
          Unit
        </label>

        <input
          value={item.unit}
          readOnly
          className="mt-1 w-full rounded-lg border bg-gray-100 px-3 py-2"
        />

      </div>

    </div>
  );
}