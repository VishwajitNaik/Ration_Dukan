"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import DistributionInfoCard from "@/components/distribution/distribution-info-card";
import DistributionItemsTable from "@/components/distribution/distribution-items-table";
import ReverseDistributionButton from "@/components/distribution/reverse-distribution-button";

import {
  useDistribution,
  useReverseDistribution,
} from "@/modules/distribution/distribution.hooks";

export default function DistributionDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, error } =
    useDistribution(params.id);

  const reverseMutation =
    useReverseDistribution();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading distribution...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load distribution.
      </div>
    );
  }

  const distribution = data?.data;

  if (!distribution) {
    return (
      <div className="rounded-xl border p-6 text-gray-600">
        Distribution not found.
      </div>
    );
  }

  const handleReverse = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reverse this distribution?"
    );

    if (!confirmed) return;

    try {
      await reverseMutation.mutateAsync(
        distribution._id
      );

      toast.success(
        "Distribution reversed successfully."
      );

      router.push(
        "/distribution/list"
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Distribution Details
          </h1>

          <p className="mt-1 text-gray-500">
            Transaction ID:{" "}
            {distribution._id}
          </p>
        </div>

        <button
          type="button"
          disabled={
            reverseMutation.isPending
          }
          onClick={handleReverse}
          className="rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {reverseMutation.isPending
            ? "Reversing..."
            : "Reverse Distribution"}
        </button>

      </div>

      <DistributionInfoCard
        distribution={distribution}
      />

      <ReverseDistributionButton
        distributionId={distribution._id}
        redirectTo="/distribution/list"
        />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Distributed Commodities
        </h2>

        <DistributionItemsTable
          items={distribution.items}
        />
      </div>

    </div>
  );
}