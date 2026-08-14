"use client";

export default function ReportToolbar({
  title,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <div className="flex gap-2">

        <button
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          PDF
        </button>

        <button
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Excel
        </button>

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Print
        </button>

      </div>
    </div>
  );
}