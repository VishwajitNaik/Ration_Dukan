"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import BatchInfoCard from "@/components/stock/batch-info-card";
import BatchItemsTable from "@/components/stock/batch-items-table";

import {
  useStockBatch,
} from "@/modules/stock/stock.hooks";

export default function ViewBatchPage() {
  const params = useParams();

  const {
    data,
    isLoading,
    error,
  } = useStockBatch(params.id);

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

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            {batch.batchNo}
          </h1>

          <p className="text-gray-500">
            Batch Details
          </p>

        </div>

        <Link
          href={`/stock/${batch._id}/edit`}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Edit Batch
        </Link>

      </div>

      <BatchInfoCard
        batch={batch}
      />

      <BatchItemsTable
        items={batch.items}
      />

    </div>
  );
}