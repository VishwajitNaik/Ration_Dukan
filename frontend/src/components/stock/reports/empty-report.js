"use client";

export default function EmptyReport() {
  return (
    <div className="rounded-xl border border-dashed bg-white p-12 text-center">
      <h3 className="text-lg font-semibold text-gray-700">
        No Data Found
      </h3>

      <p className="mt-2 text-gray-500">
        There is no stock available.
      </p>
    </div>
  );
}