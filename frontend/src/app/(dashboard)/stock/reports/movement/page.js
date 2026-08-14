"use client";

import { useState } from "react";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";

import StockMovementFilter from "@/components/stock/reports/stock-movement-filter";
import StockMovementSummary from "@/components/stock/reports/stock-movement-summary";
import StockMovementTable from "@/components/stock/reports/stock-movement-table";

import {
  useStockMovementReport,
} from "@/modules/stock/stock.hooks";

export default function StockMovementPage() {

  const [filters, setFilters] =
    useState({
      commodity: "RICE",
      fromDate: "2026-08-01",
      toDate: "2026-08-31",
    });

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useStockMovementReport(filters);

  const handleChange = (
    key,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch();
  };

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

  const report =
    data?.data || {};

  const movements =
    report.movements || [];

    console.log("report", report);
    

  return (
    <div className="space-y-6">

      <ReportToolbar title="Stock Movement Report" />

      <StockMovementFilter
        filters={filters}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <StockMovementSummary
        total={
          report.totalMovements || 0
        }
      />

      {movements.length === 0 ? (
        <EmptyReport />
      ) : (
        <StockMovementTable
          movements={movements}
        />
      )}

    </div>
  );
}