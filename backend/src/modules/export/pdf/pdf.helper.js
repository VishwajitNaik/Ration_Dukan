import PDFDocument from "pdfkit";

export const createPdf = () => {

  return new PDFDocument({
    size: "A4",
    margin: 40,
    bufferPages: true,
  });

};

export const drawTitle = (
  doc,
  title
) => {

  doc
    .fontSize(18)
    .text(title, {
      align: "center",
    });

  doc.moveDown();

};

export const drawSubTitle = (
  doc,
  title
) => {

  doc
    .fontSize(13)
    .text(title);

  doc.moveDown(0.5);

};

export const drawLine = (
  doc
) => {

  const y = doc.y;

  doc
    .moveTo(40, y)
    .lineTo(555, y)
    .stroke();

  doc.moveDown();

};

export const drawLabelValue = (
  doc,
  label,
  value
) => {

  doc
    .fontSize(11)
    .text(
      `${label}: ${value}`
    );

};