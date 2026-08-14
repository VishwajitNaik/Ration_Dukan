export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-gray-200"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-96 rounded-2xl bg-gray-200 lg:col-span-2" />
        <div className="h-96 rounded-2xl bg-gray-200" />
      </div>

      <div className="h-80 rounded-2xl bg-gray-200" />
    </div>
  );
}