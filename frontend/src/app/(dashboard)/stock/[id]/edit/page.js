"use client";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import StockForm from "@/components/stock/stock-form";

import {
  useStockBatch,
  useUpdateStockBatch,
} from "@/modules/stock/stock.hooks";

export default function EditBatchPage() {
  const params = useParams();

  const router = useRouter();

  const {
    data,
    isLoading,
    error,
  } = useStockBatch(params.id);

  const mutation =
    useUpdateStockBatch();

  if (isLoading) {
    return (
      <div>
        Loading batch...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load batch.
      </div>
    );
  }

  const batch = data?.data;

  if (!batch) {
    return (
      <div>
        Batch not found.
      </div>
    );
  }

  const defaultValues = {
    batchDate: batch.batchDate
      .split("T")[0],

    remarks: batch.remarks || "",

    items: batch.items.map(
      (item) => ({
        commodity:
          item.commodity,

        receivedQty:
          item.receivedQty,

        unit: item.unit,
      })
    ),
  };

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

        await mutation.mutateAsync({
          id: params.id,
          payload,
        });

        toast.success(
          "Batch updated successfully."
        );

        router.push(
          `/stock/${params.id}`
        );
      } catch (error) {
        console.error(
          error.response?.data
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Update failed."
        );
      }
    };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Edit Batch
        </h1>

        <p className="text-gray-500">
          Update received stock batch.
        </p>

      </div>

      <StockForm
      mode="edit"
        defaultValues={
          defaultValues
        }
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