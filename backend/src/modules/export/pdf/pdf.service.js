import { createPdf } from "./pdf.helper.js";
import { pdfTemplates } from "./pdf.registry.js";

export const generatePdf = async ({
  report,
  data,
}) => {

  const doc = createPdf();

  const template = pdfTemplates[report];

  if (!template) {
    throw new Error(
      `PDF template not found for '${report}'.`
    );
  }

  template(doc, data);

  doc.end();

  return doc;

};