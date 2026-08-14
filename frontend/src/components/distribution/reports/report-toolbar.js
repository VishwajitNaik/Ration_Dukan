"use client";

export default function ReportToolbar({
  month,
  setMonth,
  year,
  setYear,
  date,
  setDate,
  showMonth = false,
  showYear = false,
  showDate = false,
}) {
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="flex flex-wrap gap-3 rounded-xl border bg-white p-4 shadow-sm">
      {showMonth && (
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
      )}

      {showYear && (
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      )}

      {showDate && (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />
      )}

      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
      >
        Print
      </button>
    </div>
  );
}