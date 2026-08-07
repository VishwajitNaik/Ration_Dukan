import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";

import {
  stockMismatchSchema,
  missingDistributionSchema,
  negativeStockSchema,
} from "./audit.validation.js";

import {
  getStockMismatch,
  getMissingDistribution,
  getNegativeStock,
} from "./audit.controller.js";

const router = express.Router();

/**
 * Stock Mismatch Audit
 */
router.get(
  "/stock-mismatch",

  authMiddleware,

  validateMiddleware(
    stockMismatchSchema
  ),

  getStockMismatch
);

router.get(
  "/missing-distribution",

  authMiddleware,

  validateMiddleware(
    missingDistributionSchema,
    "query" // ✅
  ),

  getMissingDistribution
);

router.get(

  "/negative-stock",

  authMiddleware,

  validateMiddleware(
    negativeStockSchema,
    "query" // ✅
  ),

  getNegativeStock

);

export default router;

