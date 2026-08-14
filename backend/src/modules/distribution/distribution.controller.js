import mongoose from "mongoose";
import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";
import Distribution from "./distribution.model.js";
import StockBatch from "../stock/stock.model.js";

import {
  createDistribution,
  updateDistribution,
  deleteDistribution,
  findById,
  findAll,
  distributionExists,
  softDeleteDistribution,
  getDistributionHistoryService,
  getTodayReport,
  getMonthlyReport,
  getYearlyReport,
  getCommodityReport,
  getDashboardSummary,
  getDailyDistributionRegister,
} from "./distribution.service.js";

import { restoreAllocation } from "../../utils/restoreAllocation.js";

import {
  findById as findRationCardById,
} from "../rationCard/rationCard.service.js";

import {
  buildPagination,
} from "../../utils/pagination.js";

import {
  getAvailableStock,
} from "../stock/stock.service.js";

import {
  allocateFIFOStock,
} from "../../utils/fifoAllocation.js";

import { applyAllocation } from "../../utils/applyAllocation.js";

/**
 * Create Distribution
 */
// export const createDistributionController = async (
//   req,
//   res,
//   next
// ) => {
//   try {

//     const data = req.validatedData;

//     /**
//      * Find Ration Card
//      */
//     const rationCard = await findRationCardById(
//       req.owner._id,
//       data.rationCardId
//     );

//     if (!rationCard) {
//       return errorResponse(
//         res,
//         "Ration Card not found",
//         404
//       );
//     }

//     if (rationCard.cardStatus !== "ACTIVE") {
//       return errorResponse(
//         res,
//         "Ration Card is not active",
//         409
//       );
//     }

//     /**
//      * Monthly Distribution Check
//      */
//     const distributionDate = new Date(
//       data.distributionDate
//     );

//     const month =
//       distributionDate.getMonth() + 1;

//     const year =
//       distributionDate.getFullYear();

//     const alreadyDistributed =
//       await distributionExists(
//         req.owner._id,
//         data.rationCardId,
//         month,
//         year
//       );

//     if (alreadyDistributed) {
//       return errorResponse(
//         res,
//         "Ration has already been distributed for this month.",
//         409
//       );
//     }

//     data.ownerId = req.owner._id;
//     data.month = month;
//     data.year = year;

//         /**
//      * 7.6.4 Check Stock Availability
//      */
//     for (const item of data.items) {

//       const availableQty =
//         await getAvailableStock(
//           req.owner._id,
//           item.commodity
//         );

//       if (availableQty < item.quantity) {

//         return errorResponse(
//           res,
//           `${item.commodity} stock is insufficient. Available: ${availableQty} ${item.unit}`,
//           409
//         );

//       }

//     }

//     for (const item of data.items) {

//         const allocationPlan =
//   await allocateFIFOStock(
//     req.owner._id,
//     item.commodity,
//     item.quantity
//   );

// item.allocations = allocationPlan.allocations;

// }

//     const distribution =
//       await createDistribution(data);

//     return successResponse(
//       res,
//       "Distribution created successfully",
//       distribution,
//       201
//     );

//   } catch (error) {
//     next(error);
//   }
// };

export const createDistributionController = async (
  req,
  res,
  next
) => {

  const session = await mongoose.startSession();

  try {

    const data = req.validatedData;

    /**
     * Find Ration Card
     */
    const rationCard = await findRationCardById(
      req.owner._id,
      data.rationCardId
    );

    if (!rationCard) {
      return errorResponse(
        res,
        "Ration Card not found",
        404
      );
    }

    if (rationCard.cardStatus !== "ACTIVE") {
      return errorResponse(
        res,
        "Ration Card is not active",
        409
      );
    }

    /**
     * Validate Collected By Member
     */
    const member = rationCard.members.id(
      data.collectedByMemberId
    );

    if (!member) {
      return errorResponse(
        res,
        "Selected collector not found in this ration card.",
        404
      );
    }

    if (member.isDeleted) {
      return errorResponse(
        res,
        "Selected collector has been deleted.",
        409
      );
    }

    if (member.status !== "ACTIVE") {
      return errorResponse(
        res,
        "Selected collector is not active.",
        409
      );
    }

    /**
     * Collector Snapshot
     */
    data.collectedBy = {
      memberId: member._id,
      name: member.name,
      relation: member.relation,
    };

    delete data.collectedByMemberId;

    if (!member) {
      return errorResponse(
        res,
        "Selected collector is not a member of this ration card.",
        404
      );
    }

    /**
     * Snapshot of Collector
     */
    data.collectedBy = {
      memberId: member._id,
      name: member.name,
      relation: member.relation,
    };

    delete data.collectedByMemberId;

    /**
     * Monthly Distribution Check
     */
    const distributionDate = new Date(
      data.distributionDate
    );

    const month =
      distributionDate.getMonth() + 1;

    const year =
      distributionDate.getFullYear();

    const alreadyDistributed =
      await distributionExists(
        req.owner._id,
        data.rationCardId,
        month,
        year
      );

    if (alreadyDistributed) {
      return errorResponse(
        res,
        "Ration has already been distributed for this month.",
        409
      );
    }

    data.ownerId = req.owner._id;
    data.month = month;
    data.year = year;
    data.distributedBy = req.owner._id;

    /**
     * Stock Availability Check
     */
    for (const item of data.items) {

      const availableQty =
        await getAvailableStock(
          req.owner._id,
          item.commodity
        );

      if (availableQty < item.quantity) {

        return errorResponse(
          res,
          `${item.commodity} stock is insufficient. Available: ${availableQty} ${item.unit}`,
          409
        );

      }

    }

    /**
     * Build FIFO Allocation Plan
     */
    for (const item of data.items) {

      const allocationPlan =
        await allocateFIFOStock(
          req.owner._id,
          item.commodity,
          item.quantity
        );

      item.allocations =
        allocationPlan.allocations;

    }

/**
 * START TRANSACTION
 */
session.startTransaction();

/**
 * Apply Allocation
 */
for (const item of data.items) {

  await applyAllocation(
    item.commodity,
    item.allocations,
    session
  );

}

    /**
     * Save Distribution
     */

    const distribution =
      await createDistribution(
        data,
        { session }
      );

    await session.commitTransaction();

    return successResponse(
      res,
      "Distribution created successfully",
      distribution[0],
      201
    );

  } catch (error) {

    await session.abortTransaction();

    next(error);

  } finally {

    session.endSession();

  }

};

/**
 * Update Distribution
 */
export const updateDistributionController = async (
  req,
  res,
  next
) => {
  try {

    const data = req.validatedData;

    if (data.distributionDate) {

      const distributionDate =
        new Date(
          data.distributionDate
        );

      data.month =
        distributionDate.getMonth() + 1;

      data.year =
        distributionDate.getFullYear();

    }

    const distribution =
      await updateDistribution(
        req.owner._id,
        req.params.id,
        data
      );

    if (!distribution) {
      return errorResponse(
        res,
        "Distribution not found",
        404
      );
    }

    return successResponse(
      res,
      "Distribution updated successfully",
      distribution
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Delete Distribution
 */
export const deleteDistributionController = async (
  req,
  res,
  next
) => {
  try {

    const distribution =
      await deleteDistribution(
        req.owner._id,
        req.params.id
      );

    if (!distribution) {
      return errorResponse(
        res,
        "Distribution not found",
        404
      );
    }

    return successResponse(
      res,
      "Distribution deleted successfully"
    );

  } catch (error) {
    next(error);
  }
};

export const getDistribution = async (
  req,
  res,
  next
) => {
  try {

 const distributionDoc =
  await findById(
    req.owner._id,
    req.params.id
  );

if (!distributionDoc) {
  return errorResponse(
    res,
    "Distribution not found",
    404
  );
}

    const distribution =
      distributionDoc.toObject();   

    /**
     * Collect batch ids from allocations
     */
    const batchIds =
      distribution.items.flatMap((item) =>
        item.allocations
          .map((a) => a.batchId)
          .filter(Boolean)
      );

    if (batchIds.length > 0) {

      const batches =
        await StockBatch.find({
          _id: { $in: batchIds },
        }).select("_id batchNo");

      const batchMap =
        Object.fromEntries(
          batches.map((b) => [
            String(b._id),
            b.batchNo,
          ])
        );

      /**
       * Attach batchNo to old records
       */
      distribution.items.forEach((item) => {
        item.allocations.forEach(
          (allocation) => {

            const id =
              allocation.batchId
                ? String(
                    allocation.batchId
                  )
                : null;

            allocation.batchNo =
              allocation.batchNo ||
              (id
                ? batchMap[id]
                : null);

          }
        );
      });

    }

    return successResponse(
      res,
      "Distribution fetched successfully",
      distribution
    );

  } catch (error) {
    next(error);
  }
};



/**
 * Get All Distributions
 */
export const getDistributions = async (
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
      rationCardId,
      month,
      year,
      fromDate,
      toDate,
      sortBy,
      sortOrder,
    } = req.query;

    const {
      distributions,
      totalRecords,
    } = await findAll({
      ownerId: req.owner._id,
      page,
      limit,
      rationCardId,
      month,
      year,
      fromDate,
      toDate,
      sortBy,
      sortOrder,
    });

    return successResponse(
      res,
      "Distributions fetched successfully",
      {
        distributions,
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

export const reverseDistribution = async (
  req,
  res,
  next
) => {
  const session = await mongoose.startSession();

  try {

    const ownerId = req.owner._id;

    const distributionId = req.params.id;

    /**
     * Find Distribution
     */
    const distribution = await findById(
      ownerId,
      distributionId
    );

    if (!distribution) {
      return errorResponse(
        res,
        "Distribution not found",
        404
      );
    }

        /**
     * Legacy distributions created before FIFO
     * cannot be reversed.
     */
    const hasAllocations = distribution.items.some(
    item => item.allocations.length > 0
    );

    if (!hasAllocations) {
    return errorResponse(
        res,
        "This distribution cannot be reversed because it has no allocation history.",
        409
    );
    }

    /**
     * Start Transaction
     */
    session.startTransaction();

    /**
     * Restore Every Allocation
     */
    for (const item of distribution.items) {

      await restoreAllocation(
        item.commodity,
        item.allocations,
        session
      );

    }

    /**
     * Soft Delete Distribution
     */
    await softDeleteDistribution(
      ownerId,
      distributionId,
      session
    );

    /**
     * Commit
     */
    await session.commitTransaction();

    return successResponse(
      res,
      "Distribution reversed successfully"
    );

  } catch (error) {

    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    next(error);

  } finally {

    await session.endSession();

  }

};

/**
 * Distribution History
 */
export const getDistributionHistory = async (
  req,
  res,
  next
) => {
  try {

    const {
        rationCardId,
        month,
        year,
        commodity,
        fromDate,
        toDate,
        keyword,
        page,
        limit,
        sortBy,
        sortOrder,
    } = req.validatedData;

    const {
      distributions,
      totalRecords,
    } = await getDistributionHistoryService({
        ownerId: req.owner._id,
        rationCardId,
        month,
        year,
        commodity,
        fromDate,
        toDate,
        keyword,
        page,
        limit,
        sortBy,
        sortOrder,
    });

    return successResponse(
      res,
      "Distribution history fetched successfully",
      {
        distributions,
        pagination: buildPagination(
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
 * Today Report
 */
export const getTodayReportController = async (
  req,
  res,
  next
) => {
  try {

    const report =
      await getTodayReport(
        req.owner._id
      );

    return successResponse(
      res,
      "Today report fetched successfully",
      report
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Monthly Report
 */
export const getMonthlyReportController = async (
  req,
  res,
  next
) => {
  try {

    const {
      month,
      year,
    } = req.validatedData;

    const report =
      await getMonthlyReport(
        req.owner._id,
        month,
        year
      );

    return successResponse(
      res,
      "Monthly report fetched successfully",
      report
    );

  } catch (error) {
    next(error);
  }
};

export const getYearlyReportController = async (req, res, next) => {
  try {
    const year = Number(req.query.year || new Date().getFullYear());

    const months = [];

    for (let month = 1; month <= 12; month++) {
      const distributions = await Distribution.find({
        ownerId: req.owner._id,
        year,
        month,
        isDeleted: false,
      });

      const totalDistributions = distributions.length;

      const cardSet = new Set();
      const commodities = {};

      for (const distribution of distributions) {
        cardSet.add(
          distribution.rationCardId.toString()
        );

        for (const item of distribution.items) {
          commodities[item.commodity] =
            (commodities[item.commodity] || 0) +
            item.quantity;
        }
      }

      months.push({
        month,
        totalCards: cardSet.size,
        totalDistributions,
        commodities,
      });
    }

    return successResponse(
      res,
      "Yearly report fetched successfully",
      { year, months }
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Commodity Report
 */
export const getCommodityReportController = async (
  req,
  res,
  next
) => {
  try {

    console.log(req.query);
console.log(req.validatedData);

    const {
      commodity,
    } = req.validatedData;

    const report =
      await getCommodityReport(
        req.owner._id,
        commodity
      );

    return successResponse(
      res,
      "Commodity report fetched successfully",
      report
    );

  } catch (error) {
    next(error);
  }
};


/**
 * Dashboard Summary
 */
export const getDashboardSummaryController = async (
  req,
  res,
  next
) => {
  try {

    const report =
      await getDashboardSummary(
        req.owner._id
      );

    return successResponse(
      res,
      "Dashboard summary fetched successfully",
      report
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Daily Distribution Register
 */
export const getDailyDistributionRegisterController =
async (
  req,
  res,
  next
) => {

  try {

    const {
      date,
    } = req.validatedData;

    const register =
      await getDailyDistributionRegister(
        req.owner._id,
        date
      );

    const rows = [];

    let srNo = 1;

    for (const distribution of register) {

      for (const item of distribution.items) {

        rows.push({

          srNo: srNo++,

          time:
            distribution.createdAt
              .toLocaleTimeString(
                "en-IN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              ),

          rcNumber:
            distribution.rationCardId
              ?.rcNumber,

          beneficiary:
            distribution.rationCardId
              ?.headOfFamily,

          commodity:
            item.commodity,

          quantity:
            item.quantity,

          unit:
            item.unit,

          operator:
            distribution.distributedBy
              ?.name ||
            distribution.distributedBy
              ?.fullName ||
            "-",

        });

      }

    }

    return successResponse(
      res,
      "Daily distribution register fetched successfully",
      {

        date:
          date || new Date(),

        totalCards:
          new Set(
            register.map(r =>
              r.rationCardId?._id.toString()
            )
          ).size,

        totalTransactions:
          rows.length,

        register:
          rows,

      }

    );

  } catch (error) {

    next(error);

  }

};