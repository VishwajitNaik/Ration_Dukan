"use client";

import { useEffect, useState } from "react";

import CollectorSelect from "./collector-select";
import DistributionItemRow from "./distribution-item-row";


export default function DistributionForm({
  rationCards,
  selectedCard,
  availableStock = [],
  onCardChange,
  onSubmit,
  loading,
}) {
  const [collectorId, setCollectorId] =
    useState("");

  const [distributionDate, setDistributionDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [remarks, setRemarks] =
    useState("");

const defaultItems = availableStock.map((stock) => ({
  commodity: stock._id,
  quantity: "",
  unit: stock.unit,
}));

const [items, setItems] =
  useState(defaultItems);

  useEffect(() => {
  setItems(
    availableStock.map((stock) => ({
      commodity: stock._id,
      quantity: "",
      unit: stock.unit,
      availableQty: stock.remainingQty,
    }))
  );
}, [availableStock]);

  const handleItemChange = (
    index,
    value
  ) => {
    const updated = [...items];

    updated[index] = value;

    setItems(updated);
  };

//   const handleAddItem = () => {
//     setItems([
//       ...items,
//       {
//         commodity: "WHEAT",
//         quantity: "",
//         unit: "KG",
//       },
//     ]);
//   };

//   const handleRemoveItem = (index) => {
//     setItems(
//       items.filter(
//         (_, i) => i !== index
//       )
//     );
//   };

const handleSubmit = (e) => {
  e.preventDefault();

  // Keep only commodities with quantity > 0
  const filteredItems = items
    .filter(
      (item) =>
        Number(item.quantity) > 0
    )
    .map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));

  // At least one commodity required
  if (filteredItems.length === 0) {
    alert(
      "Please enter quantity for at least one commodity."
    );
    return;
  }

  onSubmit({
    rationCardId:
      selectedCard?._id,
    collectedByMemberId:
      collectorId,
    distributionDate,
    remarks,
    items: filteredItems,
  });
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Ration Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">

        <h2 className="text-lg font-semibold text-gray-900">
          Beneficiary
        </h2>

        <div>

          <label className="block text-sm font-medium text-gray-700">
            Ration Card
          </label>

          <select
            value={
              selectedCard?._id || ""
            }
            onChange={(e) =>
              onCardChange(
                e.target.value
              )
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            <option value="">
              Select Ration Card
            </option>

            {rationCards.map((card) => (
              <option
                key={card._id}
                value={card._id}
              >
                {card.rcNumber} -{" "}
                {card.members?.find(
                  (m) => m.isHead
                )?.name || "-"}
              </option>
            ))}
          </select>

        </div>

        {selectedCard && (
          <CollectorSelect
            members={
              selectedCard.members ||
              []
            }
            value={collectorId}
            onChange={setCollectorId}
          />
        )}

      </div>

      {/* Distribution Details */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">

        <h2 className="text-lg font-semibold text-gray-900">
          Distribution Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div>

            <label className="block text-sm font-medium text-gray-700">
              Distribution Date
            </label>

            <input
              type="date"
              value={distributionDate}
              onChange={(e) =>
                setDistributionDate(
                  e.target.value
                )
              }
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />

          </div>

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700">
            Remarks
          </label>

          <textarea
            value={remarks}
            onChange={(e) =>
              setRemarks(
                e.target.value
              )
            }
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />

        </div>

      </div>

{/* Items */}
<div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">

  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold text-gray-900">
      Commodities
    </h2>
  </div>

  {items.length === 0 ? (
    <div className="rounded-lg border border-dashed p-4 text-center text-gray-500">
      No stock available for distribution.
    </div>
  ) : (
    <div className="space-y-4">
      {items.map((item, index) => (
        <DistributionItemRow
          key={item.commodity}
          item={item}
          index={index}
          onChange={handleItemChange}
        />
      ))}
    </div>
  )}

</div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Create Distribution"}
      </button>
    </form>
  );
}