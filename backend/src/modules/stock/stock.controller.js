import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";
import { generateBatchNumber } from "../../utils/batchNumber.js";

import {
  createBatch,
  updateBatch,
  deleteBatch,
  findById,
  findAll,
  batchExists,
  getCurrentStockSummary,
  getCurrentStockReport,
  getLowStockReport,
  getBatchWiseReport,
  getStockLedger,
  getStockMovementReport,
  getStockRegister,
  getBatchConsumptionReport,
  getCommoditySummaryReport,
} from "./stock.service.js";

import {
  buildPagination,
} from "../../utils/pagination.js";


/**
 * Create Stock Batch
 */
export const createStockBatch = async (
  req,
  res,
  next
) => {
  try {

    const data = req.validatedData;

    data.ownerId = req.owner._id;

    data.batchNo = generateBatchNumber();

    /**
     * Initialize Remaining Quantity
     */
    data.items = data.items.map(
      (item) => ({
        ...item,
        remainingQty:
          item.receivedQty,
      })
    );

    const batch = await createBatch(
      data
    );

    return successResponse(
      res,
      "Stock batch created successfully",
      batch,
      201
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Update Stock Batch
 */
export const updateStockBatch = async (
  req,
  res,
  next
) => {
  try {

    const existingBatch = await findById(
      req.owner._id,
      req.params.id
    );

    if (!existingBatch) {
      return errorResponse(
        res,
        "Stock batch not found",
        404
      );
    }

    /**
     * Prevent update after stock distribution
     */
    const stockIssued = existingBatch.items.some(
      item =>
        item.remainingQty < item.receivedQty
    );

    if (stockIssued) {
      return errorResponse(
        res,
        "Stock batch cannot be updated because stock has already been distributed.",
        409
      );
    }

    /**
     * If received quantity changes,
     * reset remaining quantity.
     */
    const data = req.validatedData;

    if (data.items) {
      data.items = data.items.map(item => ({
        ...item,
        remainingQty: item.receivedQty,
      }));
    }

    const updatedBatch = await updateBatch(
      req.owner._id,
      req.params.id,
      data
    );

    return successResponse(
      res,
      "Stock batch updated successfully",
      updatedBatch
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Delete Stock Batch
 */
export const deleteStockBatch = async (
  req,
  res,
  next
) => {
  try {

    const existingBatch = await findById(
      req.owner._id,
      req.params.id
    );

    if (!existingBatch) {
      return errorResponse(
        res,
        "Stock batch not found",
        404
      );
    }

    /**
     * Prevent delete after stock distribution
     */
    const stockIssued =
      existingBatch.items.some(
        item =>
          item.remainingQty <
          item.receivedQty
      );

    if (stockIssued) {
      return errorResponse(
        res,
        "Stock batch cannot be deleted because stock has already been distributed.",
        409
      );
    }

    await deleteBatch(
      req.owner._id,
      req.params.id
    );

    return successResponse(
      res,
      "Stock batch deleted successfully"
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Batch
 */
export const getBatch = async (
  req,
  res,
  next
) => {
  try {

    const batch =
      await findById(
        req.owner._id,
        req.params.id
      );

    if (!batch) {
      return errorResponse(
        res,
        "Stock batch not found",
        404
      );
    }

    return successResponse(
      res,
      "Stock batch fetched successfully",
      batch
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Get All Batches
 */
export const getBatches = async (
  req,
  res,
  next
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const {
      fromDate,
      toDate,
      sortBy,
      sortOrder,
    } = req.query;

    const {
      batches,
      totalRecords,
    } = await findAll({
      ownerId: req.owner._id,
      page,
      limit,
      fromDate,
      toDate,
      sortBy,
      sortOrder,
    });

    return successResponse(
      res,
      "Stock batches fetched successfully",
      {
        batches,
        pagination:
          buildPagination(
            totalRecords,
            page,
            limit
          ),
      }
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Current Stock Summary
 */
export const currentStockSummary = async (
  req,
  res,
  next
) => {
  try {

    const summary =
      await getCurrentStockSummary(
        req.owner._id
      );

    return successResponse(
      res,
      "Current stock summary fetched successfully",
      summary
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Current Stock Report
 */
export const getCurrentStockReportController =
async (
  req,
  res,
  next
) => {
  try {

    const stock =
      await getCurrentStockReport(
        req.owner._id
      );

    return successResponse(
      res,
      "Current stock fetched successfully",
      {
        stock,
      }
    );

  } catch (error) {

    next(error);

  }
};

/**
 * Low Stock Report
 */
export const getLowStockReportController =
async (
  req,
  res,
  next
) => {
  try {

    const {
      threshold,
    } = req.validatedData;

    const stock =
      await getLowStockReport(
        req.owner._id,
        threshold
      );

    return successResponse(
      res,
      "Low stock report fetched successfully",
      {
        stock,
      }
    );

  } catch (error) {

    next(error);

  }
};

/**
 * Batch Wise Report
 */
export const getBatchWiseReportController =
async (
  req,
  res,
  next
) => {
  try {

    const {
      commodity,
    } = req.validatedData;

    const batches =
      await getBatchWiseReport(
        req.owner._id,
        commodity
      );

    return successResponse(
      res,
      "Batch wise report fetched successfully",
      {
        batches,
      }
    );

  } catch (error) {

    next(error);

  }
};

/**
 * Stock Ledger Report
 */
export const getStockLedgerController = async (
  req,
  res,
  next
) => {
  try {

    const {
      commodity,
      month,
      year,
      fromDate,
      toDate,
    } = req.validatedData;

    const ledger =
      await getStockLedger({
        ownerId: req.owner._id,
        commodity,
        month,
        year,
        fromDate,
        toDate,
      });

    return successResponse(
      res,
      "Stock ledger fetched successfully",
      ledger
    );

  } catch (error) {

    next(error);

  }
};

/**
 * Stock Movement Report
 */
export const getStockMovementReportController = async (
  req,
  res,
  next
) => {
  try {

    const {
      commodity,
      month,
      year,
      fromDate,
      toDate,
    } = req.validatedData;

    const report =
      await getStockMovementReport({
        ownerId: req.owner._id,
        commodity,
        month,
        year,
        fromDate,
        toDate,
      });

    return successResponse(
      res,
      "Stock movement report fetched successfully",
      report
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Stock Register
 */
export const getStockRegisterController = async (
  req,
  res,
  next
) => {
  try {

    const {
      month,
      year,
      fromDate,
      toDate,
    } = req.validatedData;

    const register =
      await getStockRegister({
        ownerId: req.owner._id,
        month,
        year,
        fromDate,
        toDate,
      });

    return successResponse(
      res,
      "Stock register fetched successfully",
      register
    );

  } catch (error) {

    next(error);

  }
};

/**
 * Batch Consumption Report
 */
export const getBatchConsumptionReportController = async (
  req,
  res,
  next
) => {
  try {

    const {
      commodity,
      batchNo,
      status,
      month,
      year,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.validatedData;

    const report =
      await getBatchConsumptionReport({
        ownerId: req.owner._id,
        commodity,
        batchNo,
        status,
        month,
        year,
        page,
        limit,
        sortBy,
        sortOrder,
      });

    return successResponse(
      res,
      "Batch consumption report fetched successfully",
      report
    );

  } catch (error) {

    next(error);

  }
};

/**
 * Commodity Summary Report
 */
export const getCommoditySummaryReportController = async (
  req,
  res,
  next
) => {
  try {

    const {
      commodity,
      month,
      year,
      fromDate,
      toDate,
    } = req.validatedData;

    const report =
      await getCommoditySummaryReport({
        ownerId: req.owner._id,
        commodity,
        month,
        year,
        fromDate,
        toDate,
      });

    return successResponse(
      res,
      "Commodity summary report fetched successfully",
      report
    );

  } catch (error) {

    next(error);

  }
};