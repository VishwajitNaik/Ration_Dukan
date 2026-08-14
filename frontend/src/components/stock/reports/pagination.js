"use client";

export default function Pagination({
  pagination,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-600">
        Page {pagination.page} of{" "}
        {pagination.totalPages}
      </div>

      <div className="flex gap-2">

        <button
          disabled={!pagination.hasPrevious}
          onClick={() =>
            onPageChange(
              pagination.page - 1
            )
          }
          className="rounded-lg border px-3 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={!pagination.hasNext}
          onClick={() =>
            onPageChange(
              pagination.page + 1
            )
          }
          className="rounded-lg border px-3 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}