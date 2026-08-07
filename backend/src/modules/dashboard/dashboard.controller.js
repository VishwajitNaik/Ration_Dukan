import { successResponse } from "../../utils/response.js";
import { getDashboard } from "./dashboard.service.js";

/**
 * FPS Dashboard
 */
export const getDashboardController = async (
  req,
  res,
  next
) => {
  try {

    const {
      threshold,
      recentLimit,
    } = req.validatedData;

    const dashboard =
      await getDashboard({
        ownerId: req.owner._id,
        threshold,
        recentLimit,
      });

    return successResponse(
      res,
      "Dashboard fetched successfully",
      dashboard
    );

  } catch (error) {

    next(error);

  }
};