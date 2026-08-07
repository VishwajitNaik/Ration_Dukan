import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";
import validateObjectId from "../../middlewares/objectId.middleware.js";

import {
  createStockBatchSchema,
  updateStockBatchSchema,
  lowStockReportSchema,
  batchWiseReportSchema,
  stockLedgerSchema,
  stockMovementSchema,
  stockRegisterSchema,
  batchConsumptionReportSchema,
  commoditySummaryReportSchema,
} from "./stock.validation.js";

import {
  createStockBatch,
  updateStockBatch,
  deleteStockBatch,
  getBatch,
  getBatches,
  currentStockSummary,
  getCurrentStockReportController,
  getLowStockReportController,
  getBatchWiseReportController,
  getStockLedgerController,
  getStockMovementReportController,
  getStockRegisterController,
  getBatchConsumptionReportController,
  getCommoditySummaryReportController,
} from "./stock.controller.js";

const router = Router();

/**
 * Create Stock Batch
 */
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createStockBatchSchema),
  createStockBatch
);

/**
 * Current Stock Summary
 */
router.get(
  "/summary",
  authMiddleware,
  currentStockSummary
);

/**
 * Get All Stock Batches
 */
router.get(
  "/",
  authMiddleware,
  getBatches
);

/**
 * Current Stock Report
 */
router.get(
  "/reports/current",
  authMiddleware,
  getCurrentStockReportController
);

/**
 * Low Stock Report
 */
router.get(
  "/reports/low-stock",
  authMiddleware,
  validateMiddleware(
    lowStockReportSchema,
    "query"
  ),
  getLowStockReportController
);

/**
 * Batch Wise Report
 */
router.get(
  "/reports/batches",
  authMiddleware,
  validateMiddleware(
    batchWiseReportSchema,
    "query"
  ),
  getBatchWiseReportController
);

/**
 * Stock Ledger Report
 */
router.get(
  "/reports/ledger",
  authMiddleware,
  validateMiddleware(
    stockLedgerSchema,
    "query"
  ),
  getStockLedgerController
);

/**
 * Stock Movement Report
 */
router.get(
  "/reports/movement",
  authMiddleware,
  validateMiddleware(
    stockMovementSchema,
    "query"
  ),
  getStockMovementReportController
);

/**
 * Stock Register
 */
router.get(
  "/reports/register",
  authMiddleware,
  validateMiddleware(
    stockRegisterSchema,
    "query"
  ),
  getStockRegisterController
);

/**
 * Batch Consumption Report
 */
router.get(
  "/reports/batch-consumption",
  authMiddleware,
  validateMiddleware(
    batchConsumptionReportSchema,
    "query"
  ),
  getBatchConsumptionReportController
);

/**
 * Commodity Summary Report
 */
router.get(
  "/reports/commodity-summary",
  authMiddleware,
  validateMiddleware(
    commoditySummaryReportSchema,
    "query"
  ),
  getCommoditySummaryReportController
);

/**
 * Get Single Stock Batch
 */
router.get(
  "/:id",
  authMiddleware,
  validateObjectId(),
  getBatch
);

/**
 * Update Stock Batch
 */
router.put(
  "/:id",
  authMiddleware,
  validateObjectId(),
  validateMiddleware(updateStockBatchSchema),
  updateStockBatch
);

/**
 * Delete Stock Batch
 */
router.delete(
  "/:id",
  authMiddleware,
  validateObjectId(),
  deleteStockBatch
);

export default router;