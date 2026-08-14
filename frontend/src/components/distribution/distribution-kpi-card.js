export default function DistributionKpiCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value ?? 0}
      </p>

      {subtitle && (
        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}


// export default function DistributionKpiCard({
//   title,
//   value,
//   subtitle,
// }) {
//   return (
//     <div className="rounded-xl border bg-white p-5 shadow-sm">
//       <p className="text-sm text-gray-500">
//         {title}
//       </p>

//       <p className="mt-2 text-3xl font-bold text-gray-900">
//         {value ?? 0}
//       </p>

//       {subtitle && (
//         <p className="mt-1 text-sm text-gray-500">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );
// }