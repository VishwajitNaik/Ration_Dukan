"use client";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import CurrentStockTable from "@/components/stock/reports/current-stock-table";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";

import {
  useCurrentStockReport,
} from "@/modules/stock/stock.hooks";

export default function CurrentStockReportPage() {

  const {
    data,
    isLoading,
    error,
  } = useCurrentStockReport();

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

  const stock = data?.data || [];

  return (
    <div className="space-y-6">

      <ReportToolbar
        title="Current Stock Report"
      />

      {stock.length === 0 ? (
        <EmptyReport />
      ) : (
        <CurrentStockTable
          stock={stock}
        />
      )}

    </div>
  );
}