"use client";

import {
  useTodayReport,
} from "@/modules/distribution/distribution.hooks";

export default function TodayReportPage() {
  const { data, isLoading } =
    useTodayReport();

  if (isLoading)
    return <div>Loading...</div>;

  const report = data?.data || {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Today Distribution Report
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Distributions
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {
              report.totalDistributions
            }
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Cards
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {report.totalCards}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Commodity Summary
        </h2>

        <div className="space-y-2">
          {Object.entries(
            report.commodities || {}
          ).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b pb-2"
            >
              <span className="text-gray-700">
                {key.replace(/_/g, " ")}
              </span>

              <span className="font-medium text-gray-900">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}