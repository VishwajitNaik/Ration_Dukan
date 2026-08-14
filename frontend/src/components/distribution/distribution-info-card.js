export default function DistributionInfoCard({
  distribution,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Distribution Information
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            RC Number
          </p>

          <p className="font-medium text-gray-900">
            {
              distribution.rationCardId
                ?.rcNumber
            }
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Collected By
          </p>

          <p className="font-medium text-gray-900">
            {
              distribution.collectedBy
                ?.name
            }{" "}
            (
            {
              distribution.collectedBy
                ?.relation
            }
            )
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Distribution Date
          </p>

          <p className="font-medium text-gray-900">
            {new Date(
              distribution.distributionDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Period
          </p>

          <p className="font-medium text-gray-900">
            {distribution.month}/
            {distribution.year}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm text-gray-500">
            Remarks
          </p>

          <p className="font-medium text-gray-900">
            {distribution.remarks ||
              "-"}
          </p>
        </div>

      </div>
    </div>
  );
}