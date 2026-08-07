import {
  drawTitle,
  drawLine,
  drawLabelValue,
} from "../pdf.helper.js";

export const generateStockRegisterPdf = (
  doc,
  data
) => {

  /**
   * Title
   */
  drawTitle(
    doc,
    "STOCK REGISTER"
  );

  drawLine(doc);

  /**
   * Period
   */
  drawLabelValue(
    doc,
    "Month",
    data.period.month ?? "-"
  );

  drawLabelValue(
    doc,
    "Year",
    data.period.year ?? "-"
  );

  drawLabelValue(
    doc,
    "Generated On",
    new Date().toLocaleString()
  );

  drawLine(doc);

  /**
   * Table Header
   */
  const startX = 40;
  let y = doc.y;

  doc
    .fontSize(11)
    .font("Helvetica-Bold");

  doc.text(
    "Commodity",
    startX,
    y,
    { width: 120 }
  );

  doc.text(
    "Opening",
    170,
    y,
    { width: 60, align: "right" }
  );

  doc.text(
    "Received",
    240,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    "Issued",
    320,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    "Closing",
    400,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    "Unit",
    490,
    y,
    { width: 50, align: "center" }
  );

  y += 20;

  doc
    .moveTo(40, y - 5)
    .lineTo(555, y - 5)
    .stroke();

  /**
   * Rows
   */
  doc.font("Helvetica");

  let totalOpening = 0;
  let totalReceived = 0;
  let totalIssued = 0;
  let totalClosing = 0;

  data.register.forEach((item) => {

    doc.text(
      item.commodity,
      startX,
      y,
      { width: 120 }
    );

    doc.text(
      item.opening.toString(),
      170,
      y,
      { width: 60, align: "right" }
    );

    doc.text(
      item.received.toString(),
      240,
      y,
      { width: 70, align: "right" }
    );

    doc.text(
      item.distributed.toString(),
      320,
      y,
      { width: 70, align: "right" }
    );

    doc.text(
      item.closing.toString(),
      400,
      y,
      { width: 70, align: "right" }
    );

    doc.text(
      item.unit,
      490,
      y,
      { width: 50, align: "center" }
    );

    totalOpening += item.opening;
    totalReceived += item.received;
    totalIssued += item.distributed;
    totalClosing += item.closing;

    y += 22;

    /**
     * New Page
     */
    if (y > 730) {

      doc.addPage();

      y = 50;

    }

  });

  /**
   * Total Line
   */
  doc
    .moveTo(40, y)
    .lineTo(555, y)
    .stroke();

  y += 10;

  doc.font("Helvetica-Bold");

  doc.text(
    "TOTAL",
    startX,
    y
  );

  doc.text(
    totalOpening.toString(),
    170,
    y,
    { width: 60, align: "right" }
  );

  doc.text(
    totalReceived.toString(),
    240,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    totalIssued.toString(),
    320,
    y,
    { width: 70, align: "right" }
  );

  doc.text(
    totalClosing.toString(),
    400,
    y,
    { width: 70, align: "right" }
  );

};