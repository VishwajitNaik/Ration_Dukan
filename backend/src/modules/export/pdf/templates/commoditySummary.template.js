export const generateCommoditySummaryPdf = (
  doc,
  data
) => {

  doc
    .fontSize(20)
    .text("Commodity Summary Report", {
      align: "center",
    });

  doc.moveDown();

  doc.text("This is a PDF Test");

  doc.moveDown();

  doc.text(
    JSON.stringify(data.summary)
  );

};

// export const generateCommoditySummaryPdf = (
//   doc,
//   data
// ) => {

//   doc
//     .fontSize(18)
//     .text(
//       "Commodity Summary Report",
//       {
//         align: "center",
//       }
//     );

//   doc.moveDown();

//   data.commodities.forEach(
//     commodity => {

//       doc.text(
//         `${commodity.commodity}    Received: ${commodity.received} ${commodity.unit}    Distributed: ${commodity.distributed}    Remaining: ${commodity.remaining}`
//       );

//     }
//   );

//   doc.moveDown();

//   doc.text(
//     `Total Received : ${data.summary.totalReceived}`
//   );

//   doc.text(
//     `Total Distributed : ${data.summary.totalDistributed}`
//   );

//   doc.text(
//     `Total Remaining : ${data.summary.totalRemaining}`
//   );

// };