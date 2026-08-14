export default function AllocationList({
  allocations,
}) {
  if (!allocations?.length) {
    return (
      <p className="text-xs text-gray-500">
        No allocations
      </p>
    );
  }

  return (
    <ul className="space-y-1 text-xs text-gray-600">
      {allocations.map(
        (allocation, index) => (
          <li key={index}>
            <span className="font-medium text-gray-800">
              {allocation.batchNo}
            </span>
          </li>
        )
      )}
    </ul>
  );
}