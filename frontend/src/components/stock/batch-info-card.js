"use client";

export default function BatchInfoCard({
  batch,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Batch Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Batch Number
          </p>

          <p className="font-semibold text-gray-900">
            {batch.batchNo}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Batch Date
          </p>

          <p className="font-semibold text-gray-900">
            {new Date(
              batch.batchDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Remarks
          </p>

          <p className="font-semibold text-gray-900">
            {batch.remarks || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Created
          </p>

          <p className="font-semibold text-gray-900">
            {new Date(
              batch.createdAt
            ).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}