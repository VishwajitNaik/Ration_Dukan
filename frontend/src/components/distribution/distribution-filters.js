"use client";

export default function DistributionFilters({
  search,
  setSearch,
  month,
  setMonth,
  year,
  setYear,
}) {
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="grid gap-4 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-3">

      <input
        type="text"
        placeholder="Search RC number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg border px-3 py-2"
      />

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="rounded-lg border px-3 py-2"
      >
        <option value="">All Months</option>

        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", {
              month: "long",
            })}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="rounded-lg border px-3 py-2"
      >
        <option value="">All Years</option>

        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

    </div>
  );
}