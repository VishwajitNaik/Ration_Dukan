"use client";

import KpiCard from "@/components/dashboard/kpi-card";
import StockWidget from "@/components/dashboard/stock-widget";
import LowStockAlerts from "@/components/dashboard/low-stock-alerts";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";

import { useDashboard } from "@/modules/dashboard/dashboard.hooks";

export default function DashboardPage() {
  const { data, isLoading, error } =
    useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load dashboard.
      </div>
    );
  }

  const dashboard = data.data;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          FPS overview and daily activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Today's Cards"
          value={dashboard.today.cards}
        />

        <KpiCard
          title="Today's Transactions"
          value={dashboard.today.transactions}
        />

        <KpiCard
          title="Distributed Cards"
          value={dashboard.monthly.distributedCards}
          subtitle="Current month"
        />

        <KpiCard
          title="Pending Cards"
          value={dashboard.monthly.pendingCards}
          subtitle="Current month"
        />
      </div>

      {/* Stock + Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StockWidget stock={dashboard.stock} />
        </div>

        <LowStockAlerts
          lowStock={dashboard.lowStock}
        />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={dashboard.recentTransactions}
      />
    </div>
  );
}


// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800">
//         Dashboard
//       </h1>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">Today Cards</p>
//           <p className="mt-2 text-3xl font-bold">0</p>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">Transactions</p>
//           <p className="mt-2 text-3xl font-bold">0</p>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">Active Cards</p>
//           <p className="mt-2 text-3xl font-bold">1</p>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">Low Stock</p>
//           <p className="mt-2 text-3xl font-bold">0</p>
//         </div>
//       </div>
//     </div>
//   );
// }