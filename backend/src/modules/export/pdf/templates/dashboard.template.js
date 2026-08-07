import {
  drawTitle,
  drawLine,
  drawLabelValue,
} from "../pdf.helper.js";

export const generateDashboardPdf = (
  doc,
  data
) => {

  /**
   * Title
   */
  drawTitle(
    doc,
    "FPS DASHBOARD"
  );

  drawLine(doc);

  /**
   * Generated On
   */
  drawLabelValue(
    doc,
    "Generated On",
    new Date().toLocaleString()
  );

  drawLine(doc);

  /**
   * Today's Summary
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("TODAY'S SUMMARY");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11);

  drawLabelValue(
    doc,
    "Cards Distributed",
    data.today.cards
  );

  drawLabelValue(
    doc,
    "Transactions",
    data.today.transactions
  );

  doc.moveDown();

  drawLine(doc);

  /**
   * Monthly Summary
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("MONTHLY SUMMARY");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11);

  drawLabelValue(
    doc,
    "Distributed Cards",
    data.monthly.distributedCards
  );

  drawLabelValue(
    doc,
    "Pending Cards",
    data.monthly.pendingCards
  );

  doc.moveDown();

  drawLine(doc);

  /**
   * Current Stock
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("CURRENT STOCK");

  doc.moveDown(0.5);

  let y = doc.y;

  doc
    .font("Helvetica-Bold")
    .fontSize(10);

  doc.text("Commodity", 40, y, {
    width: 180,
  });

  doc.text("Available", 250, y, {
    width: 100,
    align: "right",
  });

  doc.text("Unit", 380, y, {
    width: 80,
    align: "center",
  });

  y += 18;

  doc
    .moveTo(40, y - 5)
    .lineTo(555, y - 5)
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(10);

  data.stock.forEach((item) => {

    doc.text(
      item.commodity,
      40,
      y,
      {
        width: 180,
      }
    );

    doc.text(
      String(item.available),
      250,
      y,
      {
        width: 100,
        align: "right",
      }
    );

    doc.text(
      item.unit,
      380,
      y,
      {
        width: 80,
        align: "center",
      }
    );

    y += 18;

  });

  doc.moveDown();

  drawLine(doc);

  /**
   * Low Stock
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("LOW STOCK");

  doc.moveDown(0.5);

  if (data.lowStock.length === 0) {

    doc
      .font("Helvetica")
      .text(
        "No low stock items."
      );

  } else {

    data.lowStock.forEach(
      (item) => {

        doc.text(
          `${item.commodity} : ${item.available} ${item.unit}`
        );

      }
    );

  }

  doc.moveDown();

  drawLine(doc);

  /**
   * Recent Transactions
   */
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("RECENT TRANSACTIONS");

  doc.moveDown(0.5);

  if (
    data.recentTransactions.length === 0
  ) {

    doc
      .font("Helvetica")
      .text(
        "No recent transactions."
      );

  } else {

    data.recentTransactions.forEach(
      (tx) => {

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(
            `${tx.time} | ${tx.rcNumber} | ${tx.totalItems} Items | ${tx.totalQuantity} Qty`
          );

      }
    );

  }

  doc.moveDown();

  drawLine(doc);

  /**
   * Footer
   */
  doc
    .fontSize(10)
    .font("Helvetica-Oblique")
    .text(
      "FPS Dashboard generated automatically by Ration Dukan Management System.",
      {
        align: "center",
      }
    );

};