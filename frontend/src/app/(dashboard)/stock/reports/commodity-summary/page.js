"use client";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";

import CommoditySummaryCards from "@/components/stock/reports/commodity-summary-cards";
import CommoditySummaryTable from "@/components/stock/reports/commodity-summary-table";

import {
  useCommoditySummaryReport,
} from "@/modules/stock/stock.hooks";

export default function CommoditySummaryPage() {
  const {
    data,
    isLoading,
    error,
  } = useCommoditySummaryReport();

  if (isLoading) {
    return <ReportLoading />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load report.
      </div>
    );
  }

  const report = data?.data || {};

  const summary =
    report.summary || {};

  const commodities =
    report.commodities || [];

  return (
    <div className="space-y-6">
      <ReportToolbar title="Commodity Summary" />

      <CommoditySummaryCards
        summary={summary}
      />

      {commodities.length === 0 ? (
        <EmptyReport />
      ) : (
        <CommoditySummaryTable
          commodities={commodities}
        />
      )}
    </div>
  );
}