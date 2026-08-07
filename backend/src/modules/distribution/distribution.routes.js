import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";
import validateObjectId from "../../middlewares/objectId.middleware.js";

import {
  createDistributionSchema,
  updateDistributionSchema,
  distributionHistorySchema,
  distributionReportSchema,
  dailyDistributionRegisterSchema,
} from "./distribution.validation.js";

import {
  createDistributionController,
  updateDistributionController,
  deleteDistributionController,
  reverseDistribution,
  getDistribution,
  getDistributions,
  getDistributionHistory,
  getTodayReportController,
  getMonthlyReportController,
  getYearlyReportController,
  getCommodityReportController,
  getDashboardSummaryController,
  getDailyDistributionRegisterController,
} from "./distribution.controller.js";

const router = Router();

/**
 * Create Distribution
 */
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createDistributionSchema),
  createDistributionController
);

router.get(
  "/history",
  authMiddleware,
  validateMiddleware(distributionHistorySchema),
  getDistributionHistory
);

/**
 * Get All Distributions
 */
router.get(
  "/",
  authMiddleware,
  getDistributions
);



/**
 * Dashboard Summary
 */
router.get(
  "/reports/dashboard",
  authMiddleware,
  getDashboardSummaryController
);

/**
 * Today Report
 */
router.get(
  "/reports/today",
  authMiddleware,
  getTodayReportController
);

/**
 * Monthly Report
 */
router.get(
  "/reports/monthly",
  authMiddleware,
  validateMiddleware(
    distributionReportSchema,
    "query"
  ),
  getMonthlyReportController
);

/**
 * Yearly Report
 */
router.get(
  "/reports/yearly",
  authMiddleware,
  validateMiddleware(
    distributionReportSchema,
    "query"
  ),
  getYearlyReportController
);

/**
 * Commodity Report
 */
router.get(
  "/reports/commodity",
  authMiddleware,
  validateMiddleware(
    distributionReportSchema,
    "query"
  ),
  getCommodityReportController
);

router.get(
  "/register/daily",
  authMiddleware,
  validateMiddleware(
    dailyDistributionRegisterSchema,
    "query"
  ),
  getDailyDistributionRegisterController
);

/**
 * Get Single Distribution
 */
router.get(
  "/:id",
  authMiddleware,
  validateObjectId(),
  getDistribution
);

/**
 * Update Distribution
 */
router.put(
  "/:id",
  authMiddleware,
  validateObjectId(),
  validateMiddleware(updateDistributionSchema),
  updateDistributionController
);

/**
 * Delete Distribution
 */
router.delete(
  "/:id",
  authMiddleware,
  validateObjectId(),
  reverseDistribution
);

export default router;