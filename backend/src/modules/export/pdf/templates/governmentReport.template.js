import {
  drawTitle,
  drawLine,
  drawLabelValue,
} from "../pdf.helper.js";

export const generateGovernmentReportPdf = (
  doc,
  data
) => {

  /**
   * Title
   */
  drawTitle(
    doc,
    "MONTHLY GOVERNMENT REPORT"
  );

  drawLine(doc);

  /**
   * Report Info
   */
  drawLabelValue(
    doc,
    "Month",
    `${data.month} / ${data.year}`
  );

  drawLabelValue(
    doc,
    "Generated On",
    new Date(
      data.generatedAt
    ).toLocaleString()
  );

  drawLine(doc);

  /**
   * Card Summary
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("CARD SUMMARY");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11);

  drawLabelValue(
    doc,
    "Active Cards",
    data.cards.totalActive
  );

  drawLabelValue(
    doc,
    "Distributed",
    data.cards.distributed
  );

  drawLabelValue(
    doc,
    "Pending",
    data.cards.pending
  );

  doc.moveDown();

  drawLine(doc);

  /**
   * Commodity Table
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("COMMODITY SUMMARY");

  doc.moveDown(0.5);

  let y = doc.y;

  doc
    .font("Helvetica-Bold")
    .fontSize(10);

  doc.text(
    "Commodity",
    40,
    y,
    { width: 130 }
  );

  doc.text(
    "Received",
    180,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    "Issued",
    270,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    "Balance",
    360,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    "Unit",
    460,
    y,
    { width: 60, align: "center" }
  );

  y += 18;

  doc
    .moveTo(40, y - 5)
    .lineTo(555, y - 5)
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(10);

  data.commodities.forEach(
    item => {

      doc.text(
        item.commodity,
        40,
        y,
        { width: 130 }
      );

      doc.text(
        String(item.received),
        180,
        y,
        { width: 70, align: "right" }
      );

      doc.text(
        String(item.issued),
        270,
        y,
        { width: 70, align: "right" }
      );

      doc.text(
        String(item.remaining),
        360,
        y,
        { width: 70, align: "right" }
      );

      doc.text(
        item.unit,
        460,
        y,
        { width: 60, align: "center" }
      );

      y += 20;

      if (y > 730) {

        doc.addPage();

        y = 50;

      }

    }
  );

  doc.moveDown();

  drawLine(doc);

  /**
   * Stock Summary
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("OVERALL STOCK SUMMARY");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11);

  drawLabelValue(
    doc,
    "Total Received",
    data.stockSummary.received
  );

  drawLabelValue(
    doc,
    "Total Distributed",
    data.stockSummary.distributed
  );

  drawLabelValue(
    doc,
    "Total Remaining",
    data.stockSummary.remaining
  );

  doc.moveDown();

  drawLine(doc);

  /**
   * Footer
   */
  doc
    .fontSize(10)
    .font("Helvetica-Oblique")
    .text(
      "This report is system generated.",
      {
        align: "center",
      }
    );

};