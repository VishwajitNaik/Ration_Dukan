"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import StockForm from "@/components/stock/stock-form";

import {
  useCreateStockBatch,
} from "@/modules/stock/stock.hooks";

export default function NewStockPage() {
  const router = useRouter();

  const mutation =
    useCreateStockBatch();

  const handleSubmit =
    async (values) => {
      try {
        const payload = {
          ...values,

          items:
            values.items.filter(
              (item) =>
                Number(
                  item.receivedQty
                ) > 0
            ),
        };

        await mutation.mutateAsync(
          payload
        );

        toast.success(
          "Stock batch created successfully."
        );

        router.push("/stock");
      } catch (error) {
        console.error(
          error.response?.data
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to create batch."
        );
      }
    };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Receive Stock Batch
        </h1>

        <p className="text-gray-500">
          Enter all commodities received in a single batch.
        </p>
      </div>

      <StockForm
      mode="create"
        onSubmit={
          handleSubmit
        }
        loading={
          mutation.isPending
        }
      />
    </div>
  );
}