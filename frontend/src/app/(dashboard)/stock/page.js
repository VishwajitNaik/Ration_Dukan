"use client";

import { useState } from "react";

import { toast } from "sonner";

import StockTable from "@/components/stock/stock-table";

import {
  useStockBatches,
  useDeleteStockBatch,
} from "@/modules/stock/stock.hooks";

export default function StockPage() {
  const [search, setSearch] =
    useState("");

  const {
    data,
    isLoading,
  } = useStockBatches({
    search,
    page: 1,
    limit: 10,
  });

  const deleteMutation =
    useDeleteStockBatch();

  const handleDelete = async (
    id
  ) => {
    if (
      !confirm(
        "Delete this stock batch?"
      )
    )
      return;

    try {
      await deleteMutation.mutateAsync(
        id
      );

      toast.success(
        "Stock batch deleted."
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Delete failed."
      );
    }
  };

  const batches =
    data?.data?.batches || [];

    console.log("data",data);

  return (
    <div className="space-y-6 ">
      <div className="flex items-center text-gray-900 justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Stock Batches
          </h1>

          <p className="text-gray-500">
            Manage received stock
          </p>
        </div>
      </div>

      <div className="rounded-xl text-gray-900  bg-white p-4">
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search commodity..."
          className="w-full rounded-lg px-4 py-3"
        />
      </div>

      {isLoading ? (
        <div>
          Loading...
        </div>
      ) : (
        <StockTable
          batches={batches}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}


// "use client";

// import StockKpiCard from "@/components/stock/stock-kpi-card";
// import CurrentStockWidget from "@/components/stock/current-stock-widget";
// import LowStockAlerts from "@/components/stock/low-stock-alerts";
// import StockQuickActions from "@/components/stock/stock-quick-actions";

// import { useStockSummary } from "@/modules/stock/stock.hooks";

// export default function StockPage() {
//   const { data, isLoading, error } =
//     useStockSummary();

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         Loading stock summary...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
//         Failed to load stock summary.
//       </div>
//     );
//   }

//   /**
//    * Backend returns an array directly
//    */
//   const stock = data?.data || [];

//   /**
//    * Temporary Low Stock
//    * (Later replace with /reports/low-stock API)
//    */
//   const lowStock = stock.filter(
//     (item) => item.remainingQty <= 100
//   );

//   /**
//    * KPI Values
//    */
//   const totalStock = stock.reduce(
//     (sum, item) =>
//       sum + Number(item.remainingQty || 0),
//     0
//   );

//   const totalReceived = stock.reduce(
//     (sum, item) =>
//       sum + Number(item.receivedQty || 0),
//     0
//   );

//   console.log("Stock:", stock);

//   return (
//     <div className="space-y-6">
//       {/* Title */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">
//           Stock Overview
//         </h1>

//         <p className="mt-1 text-gray-500">
//           Current inventory and stock status
//         </p>
//       </div>

//       {/* KPI */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <StockKpiCard
//           title="Commodities"
//           value={stock.length}
//         />

//         <StockKpiCard
//           title="Total Remaining"
//           value={totalStock}
//           subtitle="Current Stock"
//         />

//         <StockKpiCard
//           title="Total Received"
//           value={totalReceived}
//           subtitle="All Batches"
//         />

//         <StockKpiCard
//           title="Low Stock"
//           value={lowStock.length}
//           subtitle="Need Attention"
//         />
//       </div>

//       {/* Current Stock */}
//       <CurrentStockWidget stock={stock} />

//       {/* Low Stock */}
//       <LowStockAlerts lowStock={lowStock} />

//       {/* Quick Actions */}
//       <StockQuickActions />
//     </div>
//   );
// }