"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DistributionForm from "@/components/distribution/distribution-form";
import { useStockSummary } from "@/modules/stock/stock.hooks";

import {
  useCreateDistribution,
} from "@/modules/distribution/distribution.hooks";

import {
  useRationCards,
} from "@/modules/ration-card/ration-card.hooks";

export default function NewDistributionPage() {
  const router = useRouter();

  const [selectedCardId, setSelectedCardId] =
    useState("");

  const {
    data: rationData,
    isLoading: rationLoading,
  } = useRationCards({
    page: 1,
    limit: 100,
  });

  const rationCards =
    rationData?.data?.cards || [];

  const selectedCard = useMemo(
    () =>
      rationCards.find(
        (card) =>
          card._id ===
          selectedCardId
      ),
    [rationCards, selectedCardId]
  );

  const mutation = useCreateDistribution();
  const { data: stockData } = useStockSummary();

  const availableStock = (stockData?.data || []).filter(
  (item) => Number(item.remainingQty) > 0
);

  const handleSubmit = async (
    values
  ) => {
    try {
      await mutation.mutateAsync(
        values
      );

      toast.success(
        "Distribution created successfully."
      );

      router.push(
        "/distribution"
      );
    } catch (error) {
      const message =
        error.response?.data
          ?.message ||
        "Failed to create distribution.";

      toast.error(message);
    }
  };

  if (rationLoading) {
    return (
      <div className="p-6">
        Loading ration cards...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          New Distribution
        </h1>

        <p className="mt-1 text-gray-500">
          Create monthly ration distribution for a beneficiary card.
        </p>

      </div>

      <DistributionForm
        selectedCard={selectedCard}
        availableStock={availableStock}
        onCardChange={setSelectedCardId}
        onSubmit={handleSubmit}
        loading={mutation.isPending}
        rationCards={rationCards}
      />

    </div>
  );
}