import {
  drawTitle,
  drawLine,
  drawLabelValue,
} from "../pdf.helper.js";

export const generateBeneficiaryRegisterPdf = (
  doc,
  data
) => {

  /**
   * Title
   */
  drawTitle(
    doc,
    "BENEFICIARY REGISTER"
  );

  drawLine(doc);

  /**
   * Summary
   */
  drawLabelValue(
    doc,
    "Total Beneficiaries",
    data.pagination.totalRecords
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
    .font("Helvetica-Bold")
    .fontSize(10);

  doc.text(
    "RC No",
    startX,
    y,
    { width: 70 }
  );

  doc.text(
    "Head of Family",
    110,
    y,
    { width: 150 }
  );

  doc.text(
    "Type",
    270,
    y,
    { width: 50 }
  );

  doc.text(
    "Members",
    330,
    y,
    { width: 60, align: "center" }
  );

  doc.text(
    "Status",
    400,
    y,
    { width: 70, align: "center" }
  );

  doc.text(
    "Last Distribution",
    480,
    y,
    { width: 90, align: "center" }
  );

  y += 20;

  doc
    .moveTo(40, y - 5)
    .lineTo(555, y - 5)
    .stroke();

  /**
   * Rows
   */
  doc
    .font("Helvetica")
    .fontSize(10);

  data.register.forEach((card) => {

    doc.text(
      card.rcNumber,
      startX,
      y,
      { width: 70 }
    );

    doc.text(
      card.headOfFamily || "-",
      110,
      y,
      { width: 150 }
    );

    doc.text(
      card.cardType,
      270,
      y,
      { width: 50 }
    );

    doc.text(
      String(card.totalMembers),
      330,
      y,
      { width: 60, align: "center" }
    );

    doc.text(
      card.cardStatus,
      400,
      y,
      { width: 70, align: "center" }
    );

    doc.text(
      card.lastDistributionDate
        ? new Date(
            card.lastDistributionDate
          ).toLocaleDateString()
        : "-",
      480,
      y,
      { width: 90, align: "center" }
    );

    y += 22;

    /**
     * Page Break
     */
    if (y > 730) {

      doc.addPage();

      y = 50;

      doc
        .font("Helvetica-Bold")
        .fontSize(10);

      doc.text("RC No", startX, y, { width: 70 });
      doc.text("Head of Family", 110, y, { width: 150 });
      doc.text("Type", 270, y, { width: 50 });
      doc.text("Members", 330, y, { width: 60, align: "center" });
      doc.text("Status", 400, y, { width: 70, align: "center" });
      doc.text("Last Distribution", 480, y, { width: 90, align: "center" });

      y += 20;

      doc
        .moveTo(40, y - 5)
        .lineTo(555, y - 5)
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(10);

    }

  });

  drawLine(doc);

  doc
    .font("Helvetica-Bold")
    .fontSize(11);

  doc.text(
    `Total Beneficiaries : ${data.pagination.totalRecords}`
  );

};