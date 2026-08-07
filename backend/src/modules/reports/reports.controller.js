import { successResponse } from "../../utils/response.js";
import { getMonthlyGovernmentReport } from "./reports.service.js";

/**
 * Monthly Government Report
 */
export const getMonthlyGovernmentReportController = async (
  req,
  res,
  next
) => {
  try {

    const {
      month,
      year,
      format,
    } = req.validatedData;

    const report =
      await getMonthlyGovernmentReport({
        ownerId: req.owner._id,
        month,
        year,
      });

    /**
     * Future Support
     */
    if (format === "PDF") {

      // TODO:
      // Generate PDF

    }

    if (format === "EXCEL") {

      // TODO:
      // Generate Excel

    }

    return successResponse(
      res,
      "Monthly government report fetched successfully",
      report
    );

  } catch (error) {

    next(error);

  }
};