"use client";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";
import LowStockTable from "@/components/stock/reports/low-stock-table";

import {
  useLowStockReport,
} from "@/modules/stock/stock.hooks";

export default function LowStockReportPage() {
  const {
    data,
    isLoading,
    error,
  } = useLowStockReport();

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

//   const items = data?.data || [];

const items = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <ReportToolbar title="Low Stock Report" />

      {items.length === 0 ? (
        <EmptyReport />
      ) : (
        <LowStockTable items={items} />
      )}
    </div>
  );
}