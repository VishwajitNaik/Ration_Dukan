"use client";

import { useState } from "react";

import ReportToolbar from "@/components/stock/reports/report-toolbar";
import ReportLoading from "@/components/stock/reports/report-loading";
import EmptyReport from "@/components/stock/reports/empty-report";

import BatchConsumptionCards from "@/components/stock/reports/batch-consumption-cards";
import BatchConsumptionTable from "@/components/stock/reports/batch-consumption-table";
import Pagination from "@/components/stock/reports/pagination";

import {
  useBatchConsumptionReport,
} from "@/modules/stock/stock.hooks";

export default function BatchConsumptionPage() {

  const [page, setPage] =
    useState(1);

  const {
    data,
    isLoading,
    error,
  } = useBatchConsumptionReport({
    page,
    limit: 10,
  });

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

  const summary =
    report.summary || {};

  const batches =
    report.batches || [];

  const pagination =
    report.pagination;

  return (
    <div className="space-y-6">

      <ReportToolbar title="Batch Consumption Report" />

      <BatchConsumptionCards
        summary={summary}
      />

      {batches.length === 0 ? (
        <EmptyReport />
      ) : (
        <>
          <BatchConsumptionTable
            batches={batches}
          />

          {pagination && (
            <Pagination
              pagination={
                pagination
              }
              onPageChange={setPage}
            />
          )}
        </>
      )}

    </div>
  );
}