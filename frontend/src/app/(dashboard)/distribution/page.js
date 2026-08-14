"use client";

import DistributionKpiCard from "@/components/distribution/distribution-kpi-card";
import DistributionSummaryWidget from "@/components/distribution/distribution-summary-widget";
import DistributionQuickActions from "@/components/distribution/distribution-quick-actions";

import {
  useDistributionDashboard,
} from "@/modules/distribution/distribution.hooks";

export default function DistributionPage() {
  const {
    data,
    isLoading,
    error,
  } = useDistributionDashboard();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load dashboard.
      </div>
    );
  }

const dashboard = data?.data || {};

const today = dashboard.today || {};

const summary = {
  totalDistributions:
    today.totalDistributions || 0,

  todayDistributions:
    today.totalDistributions || 0,

  monthlyDistributions:
    today.totalDistributions || 0,

  totalBeneficiaryCards:
    today.totalCards || 0,
};

const commodities = Object.entries(
  today.commodities || {}
).map(([commodity, quantity]) => ({
  commodity,
  quantity,
  unit:
    commodity === "PALM_OIL"
      ? "LITER"
      : "KG",
}));

console.log("today:", today);
console.log("summary:", summary);
console.log("commodities:", commodities);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Distribution Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Ration distribution overview and activity
        </p>
      </div>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DistributionKpiCard
          title="Total Distributions"
          value={
            summary.totalDistributions
          }
        />

        <DistributionKpiCard
          title="Today Distributions"
          value={
            summary.todayDistributions
          }
        />

        <DistributionKpiCard
          title="Monthly Distributions"
          value={
            summary.monthlyDistributions
          }
        />

        <DistributionKpiCard
          title="Beneficiary Cards"
          value={
            summary.totalBeneficiaryCards
          }
        />
      </div>

      {/* Commodity Summary */}
      <DistributionSummaryWidget
        commodities={commodities}
      />

      {/* Quick Actions */}
      <DistributionQuickActions />
    </div>
  );
}