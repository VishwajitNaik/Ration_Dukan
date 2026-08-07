import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";

import {
  exportReportSchema,
} from "./export.validation.js";

import {
  exportReportController,
} from "./export.controller.js";

const router = express.Router();

/**
 * Export Report
 */
router.post(
  "/",
  authMiddleware,
  validateMiddleware(
    exportReportSchema
  ),
  exportReportController
);

export default router;