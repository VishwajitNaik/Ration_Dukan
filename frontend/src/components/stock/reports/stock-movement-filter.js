"use client";

import { STOCK_ITEMS } from "@/modules/stock/stock.constants";

export default function StockMovementFilter({
  filters,
  onChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Commodity
          </label>

          <select
            value={filters.commodity}
            onChange={(e) =>
              onChange("commodity", e.target.value)
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            {STOCK_ITEMS.map((item) => (
              <option
                key={item.commodity}
                value={item.commodity}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            From Date
          </label>

          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              onChange("fromDate", e.target.value)
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To Date
          </label>

          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              onChange("toDate", e.target.value)
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>

      </div>
    </form>
  );
}