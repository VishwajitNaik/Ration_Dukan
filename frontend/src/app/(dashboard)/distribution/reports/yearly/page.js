"use client";

import { useState } from "react";
import ReportToolbar from "@/components/distribution/reports/report-toolbar";
import { useYearlyReport } from "@/modules/distribution/distribution.hooks";

const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function YearlyReportPage() {
  const [year, setYear] = useState(
    new Date().getFullYear()
  );

  const { data, isLoading, error } = useYearlyReport({
    year,
  });

  if (isLoading) {
    return (
      <div className="p-6">Loading yearly report...</div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load yearly report.
      </div>
    );
  }

  // API response: { success, message, data: { year, months } }
  const report = data?.data || {};

  // Show only months with activity
  const months = (report.months || []).filter(
    (m) =>
      m.totalDistributions > 0 ||
      m.totalCards > 0
  );

  // KPI totals
  const totalDistributions = months.reduce(
    (sum, month) =>
      sum + Number(month.totalDistributions || 0),
    0
  );

  const totalCards = months.reduce(
    (sum, month) =>
      sum + Number(month.totalCards || 0),
    0
  );

  const activeMonths = months.length;

  // Commodity totals across all months
  const commodityTotals = {};

  months.forEach((month) => {
    Object.entries(month.commodities || {}).forEach(
      ([commodity, qty]) => {
        commodityTotals[commodity] =
          (commodityTotals[commodity] || 0) +
          Number(qty || 0);
      }
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Yearly Distribution Report
        </h1>

        <p className="mt-1 text-gray-500">
          Annual distribution performance and commodity analysis
        </p>
      </div>

      {/* Toolbar */}
      <ReportToolbar
        year={year}
        setYear={setYear}
        showYear
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          title="Total Distributions"
          value={totalDistributions}
        />

        <Kpi
          title="Total Cards Served"
          value={totalCards}
        />

        <Kpi
          title="Active Months"
          value={activeMonths}
        />

        <Kpi title="Year" value={year} />
      </div>

      {/* Month Wise Summary */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Month Wise Summary
          </h2>

          <span className="text-sm text-gray-500">
            {activeMonths} Active Months
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  Month
                </th>

                <th className="px-4 py-3 text-right">
                  Distributions
                </th>

                <th className="px-4 py-3 text-right">
                  Cards Served
                </th>
              </tr>
            </thead>

            <tbody>
              {months.map((month) => (
                <tr
                  key={month.month}
                  className="border-t"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {MONTH_NAMES[month.month]}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {month.totalDistributions}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {month.totalCards}
                  </td>
                </tr>
              ))}

              {months.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No yearly data found.
                  </td>
                </tr>
              )}
            </tbody>

            {months.length > 0 && (
              <tfoot className="bg-gray-50 font-semibold text-gray-900">
                <tr>
                  <td className="px-4 py-3">
                    Total
                  </td>

                  <td className="px-4 py-3 text-right">
                    {totalDistributions}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {totalCards}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Commodity Summary */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Commodity Summary
          </h2>

          <span className="text-sm text-gray-500">
            Annual Commodity Totals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  Commodity
                </th>

                <th className="px-4 py-3 text-right">
                  Quantity Distributed
                </th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(commodityTotals).map(
                ([commodity, qty]) => (
                  <tr
                    key={commodity}
                    className="border-t"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {commodity.replace(/_/g, " ")}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {qty}
                    </td>
                  </tr>
                )
              )}

              {Object.keys(commodityTotals).length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No commodity data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Business insight */}
        {Object.keys(commodityTotals).length > 0 && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <p className="font-medium">
              Annual Insight
            </p>

            <p className="mt-1">
              This summary shows the total quantity distributed for each commodity during the selected year. Use it for government reporting, stock planning, and annual audit reconciliation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value ?? 0}
      </p>
    </div>
  );
}