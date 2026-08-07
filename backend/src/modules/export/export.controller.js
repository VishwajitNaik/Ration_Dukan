import { exportReport } from "./export.service.js";
import { reportServices } from "./report.registry.js";

export const exportReportController = async (
  req,
  res,
  next
) => {
  try {

    const {
      report,
      format,
      ...filters
    } = req.validatedData;

    /**
     * Get Report Service
     */
    const reportService =
      reportServices[report];

    if (!reportService) {

      throw new Error(
        `Report '${report}' is not supported.`
      );

    }

    /**
     * Fetch Report Data
     */
    const reportData =
      await reportService({
        ownerId: req.owner._id,
        ...filters,
      });

    /**
     * Export
     */
    const file =
      await exportReport({
        report,
        format,
        data: reportData,
      });

    /**
     * PDF Download
     */
    if (format === "PDF") {

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${report}.pdf`
      );

      file.pipe(res);

      return;

    }

    /**
     * Excel Download
     */
    if (format === "EXCEL") {

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${report}.xlsx`
      );

      await file.xlsx.write(res);

      return res.end();

    }

    /**
     * Print (JSON)
     */
    if (format === "PRINT") {

      return res.status(200).json({
        success: true,
        message: "Print data fetched successfully",
        data: reportData,
      });

    }

    /**
     * Invalid Format
     */
    return res.status(400).json({
      success: false,
      message: "Unsupported export format.",
    });

  } catch (error) {

    next(error);

  }

};