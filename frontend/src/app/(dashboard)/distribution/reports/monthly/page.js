"use client";

import { useState } from "react";
import ReportToolbar from "@/components/distribution/reports/report-toolbar";
import { useMonthlyReport } from "@/modules/distribution/distribution.hooks";

export default function MonthlyReportPage() {
  const [month, setMonth] = useState(
    new Date().getMonth() + 1
  );

  const [year, setYear] = useState(
    new Date().getFullYear()
  );

  const { data, isLoading } = useMonthlyReport({
    month,
    year,
  });

  if (isLoading) return <div>Loading...</div>;

  // FIX
  const report = data?.data || {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Monthly Distribution Report
      </h1>

      <ReportToolbar
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        showMonth
        showYear
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi
          title="Total Distributions"
          value={report.totalDistributions}
        />

        <Kpi
          title="Total Cards"
          value={report.totalCards}
        />

        <Kpi
          title="Month"
          value={`${report.month}/${report.year}`}
        />
      </div>

      <CommoditySummary
        commodities={report.commodities || {}}
      />
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value ?? 0}
      </p>
    </div>
  );
}

function CommoditySummary({ commodities }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Commodity Totals
      </h2>

      <div className="space-y-2">
        {Object.entries(commodities).map(
          ([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {key.replace(/_/g, " ")}
              </span>

              <span className="font-medium">
                {value}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}