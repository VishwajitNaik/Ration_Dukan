"use client";

import { useState } from "react";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";
import StockRegisterFilter from "@/components/stock/reports/stock-register-filter";
import StockRegisterTable from "@/components/stock/reports/stock-register-table";

import {
  useStockRegisterReport,
} from "@/modules/stock/stock.hooks";

export default function StockRegisterPage() {
  const today = new Date();

  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [filters, setFilters] =
    useState({
      fromDate: firstDay
        .toISOString()
        .split("T")[0],

      toDate: today
        .toISOString()
        .split("T")[0],

      commodity: "",
    });

  const {
    data,
    isLoading,
    error,
  } = useStockRegisterReport(filters);

  const handleChange = (
    key,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      fromDate: firstDay
        .toISOString()
        .split("T")[0],

      toDate: today
        .toISOString()
        .split("T")[0],

      commodity: "",
    });
  };

  if (isLoading) {
    return <ReportLoading />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load stock register.
      </div>
    );
  }

  const period = data?.data?.period;
  const batchDate = data?.data?.batchDate;
const createdAt = data?.data?.createdAt;
console.log("batchDate:", batchDate);
console.log("createdAt:", createdAt);


  const records =
    data?.data?.register || [];

  console.log(
    "Stock Register Response:",
    data
  );

  return (
    <div className="space-y-6">
      <ReportToolbar title="Stock Register" />

      <StockRegisterFilter
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
      />

      {period && (
        <div className="rounded-xl border bg-white p-4 text-sm text-gray-700">
          <span className="font-medium">
            Period:
          </span>{" "}
          {new Date(
            period.fromDate
          ).toLocaleDateString()}{" "}
          to{" "}
          {new Date(
            period.toDate
          ).toLocaleDateString()}
        </div>
      )}

      <div className="rounded-xl border bg-white p-4">
  <div className="grid gap-4 sm:grid-cols-2">
    <div>
      <p className="text-sm text-gray-500">
        Batch Date
      </p>

      <p className="font-medium text-gray-900">
        {batchDate
          ? new Date(batchDate).toLocaleDateString("en-GB")
          : "-"}
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-500">
        Created At
      </p>

      <p className="font-medium text-gray-900">
        {createdAt
          ? new Date(createdAt).toLocaleDateString("en-GB")
          : "-"}
      </p>
    </div>
  </div>
</div>

      {records.length === 0 ? (
        <EmptyReport />
      ) : (
        <StockRegisterTable
          records={records}
        />
      )}
    </div>
  );
}