import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";

import {
  monthlyGovernmentReportSchema,
} from "./reports.validation.js";

import {
  getMonthlyGovernmentReportController,
} from "./reports.controller.js";

const router = express.Router();

/**
 * Monthly Government Report
 */
router.get(
  "/government/monthly",
  authMiddleware,
  validateMiddleware(
    monthlyGovernmentReportSchema,
    "query"
  ),
  getMonthlyGovernmentReportController
);

export default router;