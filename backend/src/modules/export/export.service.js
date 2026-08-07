import { generatePdf } from "./pdf/pdf.service.js";

export const exportReport = async ({
  report,
  format,
  data,
}) => {

  switch (format) {

    case "PDF":

      return await generatePdf({
        report,
        data,
      });

    case "EXCEL":

      return await generateExcel({
        report,
        data,
      });

    case "PRINT":

      return data;

    default:

      throw new Error(
        "Unsupported export format."
      );

  }

};