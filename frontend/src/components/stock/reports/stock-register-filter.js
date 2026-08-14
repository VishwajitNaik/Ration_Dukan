"use client";

import { STOCK_ITEMS } from "@/modules/stock/stock.constants";

export default function StockRegisterFilter({
  filters,
  onChange,
  onReset,
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">

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
            <option value="">
              All Commodities
            </option>

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

        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}