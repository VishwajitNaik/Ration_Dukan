"use client";

import { useState, useEffect } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";

import StockLedgerFilter from "@/components/stock/reports/stock-ledger-filter";
import StockLedgerCard from "@/components/stock/reports/stock-ledger-card";

import {
  useStockLedgerReport,
} from "@/modules/stock/stock.hooks";

export default function StockLedgerPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const [filters, setFilters] =
    useState({
      commodity:
        searchParams.get("commodity") || "RICE",

      month:
        searchParams.get("month") || "",

      year:
        searchParams.get("year") ||
        new Date().getFullYear().toString(),
    });

  /**
   * Update URL whenever filters change
   */
  useEffect(() => {

    const params = new URLSearchParams();

    if (filters.commodity) {
      params.set(
        "commodity",
        filters.commodity
      );
    }

    if (filters.month) {
      params.set(
        "month",
        filters.month
      );
    }

    if (filters.year) {
      params.set(
        "year",
        filters.year
      );
    }

    router.replace(
      `/stock/reports/ledger?${params.toString()}`
    );

  }, [filters, router]);

  const {
    data,
    isLoading,
    error,
  } = useStockLedgerReport(filters);

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
    // No refetch needed
  };

  if (isLoading) {
    return <ReportLoading />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load ledger.
      </div>
    );
  }

  const ledger = data?.data;
  console.log("ledger", ledger);
  

  return (
    <div className="space-y-6">

      <ReportToolbar title="Stock Ledger" />

      <StockLedgerFilter
        filters={filters}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {!ledger ? (
        <EmptyReport />
      ) : (
        <StockLedgerCard ledger={ledger} />
      )}

    </div>
  );
}