"use client";

import { useState } from "react";
import { toast } from "sonner";

import DistributionFilters from "@/components/distribution/distribution-filters";
import DistributionTable from "@/components/distribution/distribution-table";

import {
  useDistributions,
  useReverseDistribution,
} from "@/modules/distribution/distribution.hooks";

export default function DistributionListPage() {
  const [search, setSearch] =
    useState("");

  const [month, setMonth] =
    useState("");

  const [year, setYear] =
    useState(
      new Date().getFullYear()
    );

  const [page, setPage] =
    useState(1);

  const { data, isLoading, error } =
    useDistributions({
      keyword: search,
      month: month || undefined,
      year: year || undefined,
      page,
      limit: 10,
    });

  const reverseMutation =
    useReverseDistribution();

  const distributions =
    data?.data?.distributions ||
    [];

  const pagination =
    data?.data?.pagination ||
    {};

  const handleReverse = async (
    id
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to reverse this distribution?"
    );

    if (!confirmed) return;

    try {
      await reverseMutation.mutateAsync(
        id
      );

      toast.success(
        "Distribution reversed successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to reverse distribution."
      );
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Distribution List
        </h1>

        <p className="mt-1 text-gray-500">
          View and manage ration distributions.
        </p>

      </div>

      <DistributionFilters
        search={search}
        setSearch={setSearch}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />

      {isLoading ? (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          Loading distributions...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          Failed to load distributions.
        </div>
      ) : (
        <>
          <DistributionTable
            distributions={
              distributions
            }
            onReverse={
              handleReverse
            }
            reversingId={
              reverseMutation.variables
            }
          />

          {/* Pagination */}
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-600">
              Page{" "}
              {pagination.page || 1} of{" "}
              {pagination.totalPages || 1}
            </p>

            <div className="flex gap-2">

              <button
                disabled={
                  !pagination.hasPrevious
                }
                onClick={() =>
                  setPage((p) =>
                    Math.max(1, p - 1)
                  )
                }
                className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={
                  !pagination.hasNext
                }
                onClick={() =>
                  setPage((p) => p + 1)
                }
                className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
              >
                Next
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
}