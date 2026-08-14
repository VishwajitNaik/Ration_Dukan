export default function DistributionSummaryWidget({
  commodities,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Commodity Distribution
        </h2>

        <span className="text-sm text-gray-500">
          {commodities.length} Commodities
        </span>
      </div>

      {commodities.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
          No distribution data available.
        </div>
      ) : (
        <div className="space-y-3">
          {commodities.map((item) => (
            <div
              key={item.commodity}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {item.commodity.replace(/_/g, " ")}
                </p>

                <p className="text-sm text-gray-500">
                  Distributed
                </p>
              </div>

              <p className="text-lg font-semibold text-gray-900">
                {item.quantity} {item.unit}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// export default function DistributionSummaryWidget({
//   commodities,
// }) {
//   return (
//     <div className="rounded-xl border bg-white p-6 shadow-sm">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Commodity Distribution
//         </h2>

//         <span className="text-sm text-gray-500">
//           {commodities.length} Commodities
//         </span>
//       </div>

//       {commodities.length === 0 ? (
//         <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
//           No distribution data available.
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {commodities.map((item) => (
//             <div
//               key={item.commodity}
//               className="flex items-center justify-between rounded-lg border p-3"
//             >
//               <div>
//                 <p className="font-medium text-gray-900">
//                   {item.commodity.replace(
//                     /_/g,
//                     " "
//                   )}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   Distributed
//                 </p>
//               </div>

//               <p className="text-lg font-semibold text-gray-900">
//                 {item.quantity} {item.unit}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }