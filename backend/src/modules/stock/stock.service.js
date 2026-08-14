import StockBatch from "./stock.model.js";
import Distribution from "../distribution/distribution.model.js";

/**
 * Create Stock Batch
 */
export const createBatch = async (
  batchData
) => {
  return await StockBatch.create(batchData);
};

/**
 * Update Stock Batch
 */
export const updateBatch = async (
  ownerId,
  batchId,
  updateData
) => {
  return await StockBatch.findOneAndUpdate(
    {
      _id: batchId,
      ownerId,
      isDeleted: false,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Soft Delete Batch
 */
export const deleteBatch = async (
  ownerId,
  batchId
) => {
  return await StockBatch.findOneAndUpdate(
    {
      _id: batchId,
      ownerId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: ownerId,
    },
    {
      new: true,
    }
  );
};

/**
 * Find Batch By ID
 */
export const findById = async (
  ownerId,
  batchId
) => {
  return await StockBatch.findOne({
    _id: batchId,
    ownerId,
    isDeleted: false,
  });
};

/**
 * Find Batch By Number
 */
export const findByBatchNo = async (
  ownerId,
  batchNo
) => {
  return await StockBatch.findOne({
    ownerId,
    batchNo,
    isDeleted: false,
  });
};

/**
 * Batch Exists
 */
export const batchExists = async (
  ownerId,
  batchNo
) => {
  return await StockBatch.exists({
    ownerId,
    batchNo,
    isDeleted: false,
  });
};

/**
 * List Batches
 */
export const findAll = async ({
  ownerId,
  page = 1,
  limit = 10,
  fromDate,
  toDate,
  sortBy = "batchDate",
  sortOrder = "desc",
}) => {

  const query = {
    ownerId,
    isDeleted: false,
  };

  if (fromDate || toDate) {
    query.batchDate = {};

    if (fromDate) {
      query.batchDate.$gte = new Date(
        fromDate
      );
    }

    if (toDate) {
      query.batchDate.$lte = new Date(
        toDate
      );
    }
  }

  const skip =
    (page - 1) * limit;

  const batches =
    await StockBatch.find(query)
      .sort({
        [sortBy]:
          sortOrder === "asc"
            ? 1
            : -1,
      })
      .skip(skip)
      .limit(limit);

  const totalRecords =
    await StockBatch.countDocuments(
      query
    );

  return {
    batches,
    totalRecords,
  };
};

/**
 * Count Batches
 */
export const countBatches = async (
  ownerId
) => {
  return await StockBatch.countDocuments({
    ownerId,
    isDeleted: false,
  });
};

/**
 * Current Stock Summary
 */
export const getCurrentStockSummary = async (
  ownerId
) => {

  const summary = await StockBatch.aggregate([

    {
      $match: {
        ownerId,
        isDeleted: false,
      },
    },

    {
      $unwind: "$items",
    },

    {
      $group: {
        _id: "$items.commodity",

        receivedQty: {
          $sum: "$items.receivedQty",
        },

        remainingQty: {
          $sum: "$items.remainingQty",
        },

        unit: {
          $first: "$items.unit",
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },

  ]);

  return summary;

};

/**
 * Get Available Stock By Commodity
 */
export const getAvailableStock = async (
  ownerId,
  commodity
) => {

  const result = await StockBatch.aggregate([

    {
      $match: {
        ownerId,
        isDeleted: false,
      },
    },

    {
      $unwind: "$items",
    },

    {
      $match: {
        "items.commodity": commodity,
      },
    },

    {
      $group: {
        _id: "$items.commodity",

        remainingQty: {
          $sum: "$items.remainingQty",
        },
      },
    },

  ]);

  return result.length
    ? result[0].remainingQty
    : 0;

};

/**
 * Current Stock Report
 */
export const getCurrentStockReport = async (
  ownerId
) => {

  const stock =
    await StockBatch.aggregate([

      {
        $match: {
          ownerId,
          isDeleted: false,
        },
      },

      {
        $unwind: "$items",
      },

      {
        $group: {

          _id: {
            commodity:
              "$items.commodity",

            unit:
              "$items.unit",
          },

          available: {
            $sum:
              "$items.remainingQty",
          },

        },

      },

      {
        $sort: {
          "_id.commodity": 1,
        },
      },

    ]);

  return stock.map(item => ({

    commodity:
      item._id.commodity,

    available:
      item.available,

    unit:
      item._id.unit,

  }));

};

/**
 * Low Stock Report
 */
export const getLowStockReport = async (
  ownerId,
  threshold = 100
) => {

  const stock =
    await StockBatch.aggregate([

      {
        $match: {
          ownerId,
          isDeleted: false,
        },
      },

      {
        $unwind: "$items",
      },

      {
        $group: {

          _id: {
            commodity:
              "$items.commodity",

            unit:
              "$items.unit",
          },

          available: {
            $sum:
              "$items.remainingQty",
          },

        },

      },

      {
        $match: {
          available: {
            $lte: threshold,
          },
        },
      },

      {
        $sort: {
          available: 1,
        },
      },

    ]);

  return stock.map(item => ({

    commodity:
      item._id.commodity,

    available:
      item.available,

    unit:
      item._id.unit,

    threshold,

    status:
      item.available === 0
        ? "OUT_OF_STOCK"
        : "LOW",

  }));

};

/**
 * Batch Wise Report
 */
export const getBatchWiseReport = async (
  ownerId,
  commodity
) => {

  const pipeline = [

    {
      $match: {
        ownerId,
        isDeleted: false,
      },
    },

    {
      $unwind: "$items",
    },

  ];

  if (commodity) {

    pipeline.push({
      $match: {
        "items.commodity": commodity,
      },
    });

  }

  pipeline.push(

    {
      $sort: {
        batchDate: 1,
        createdAt: 1,
      },
    },

    {
      $project: {

        _id: 0,

        batchId: "$_id",

        batchNo: 1,

        batchDate: 1,

        commodity:
          "$items.commodity",

        receivedQty:
          "$items.receivedQty",

        remainingQty:
          "$items.remainingQty",

        unit:
          "$items.unit",

        utilization: {
          $subtract: [
            "$items.receivedQty",
            "$items.remainingQty",
          ],
        },

      },

    }

  );

  return await StockBatch.aggregate(
    pipeline
  );

};

/**
 * Stock Ledger Report
 */
export const getStockLedger = async ({
  ownerId,
  commodity,
  month,
  year,
  fromDate,
  toDate,
}) => {

  /**
   * Date Filters
   */
  let startDate = null;
  let endDate = null;

  if (month && year) {

    startDate = new Date(year, month - 1, 1);

    endDate = new Date(year, month, 1);

  } else if (year) {

    startDate = new Date(year, 0, 1);

    endDate = new Date(year + 1, 0, 1);

  } else if (fromDate || toDate) {

    startDate = fromDate
      ? new Date(fromDate)
      : new Date("1970-01-01");

    endDate = toDate
      ? new Date(toDate)
      : new Date();

    endDate.setDate(
      endDate.getDate() + 1
    );

  }

  /**
   * Opening Stock
   */
  let opening = 0;

  if (startDate) {

    const openingReceived =
      await StockBatch.aggregate([

        {
          $match: {
            ownerId,
            isDeleted: false,
            batchDate: {
              $lt: startDate,
            },
          },
        },

        {
          $unwind: "$items",
        },

        {
          $match: {
            "items.commodity": commodity,
          },
        },

        {
          $group: {

            _id: null,

            qty: {
              $sum: "$items.receivedQty",
            },

          },

        },

      ]);

    const openingDistributed =
      await Distribution.aggregate([

        {
          $match: {
            ownerId,
            isDeleted: false,
            distributionDate: {
              $lt: startDate,
            },
          },
        },

        {
          $unwind: "$items",
        },

        {
          $match: {
            "items.commodity": commodity,
          },
        },

        {
          $group: {

            _id: null,

            qty: {
              $sum: "$items.quantity",
            },

          },

        },

      ]);

    opening =
      (openingReceived[0]?.qty || 0)
      -
      (openingDistributed[0]?.qty || 0);

  }

  /**
   * Received Stock
   */
  const receivedMatch = {
    ownerId,
    isDeleted: false,
  };

  if (startDate) {

    receivedMatch.batchDate = {
      $gte: startDate,
      $lt: endDate,
    };

  }

  const receivedResult =
    await StockBatch.aggregate([

      {
        $match: receivedMatch,
      },

      {
        $unwind: "$items",
      },

      {
        $match: {
          "items.commodity": commodity,
        },
      },

      {
        $group: {

          _id: null,

          received: {
            $sum: "$items.receivedQty",
          },

        },

      },

    ]);

  const received =
    receivedResult[0]?.received || 0;

  /**
   * Distributed Stock
   */
  const distributionMatch = {
    ownerId,
    isDeleted: false,
  };

  if (month && year) {

    distributionMatch.month = month;
    distributionMatch.year = year;

  } else if (year) {

    distributionMatch.year = year;

  } else if (startDate) {

    distributionMatch.distributionDate = {
      $gte: startDate,
      $lt: endDate,
    };

  }

  const distributedResult =
    await Distribution.aggregate([

      {
        $match: distributionMatch,
      },

      {
        $unwind: "$items",
      },

      {
        $match: {
          "items.commodity": commodity,
        },
      },

      {
        $group: {

          _id: null,

          distributed: {
            $sum: "$items.quantity",
          },

        },

      },

    ]);

  const distributed =
    distributedResult[0]?.distributed || 0;

  /**
   * Closing Stock
   */
  const closingResult =
    await StockBatch.aggregate([

      {
        $match: {
          ownerId,
          isDeleted: false,
        },
      },

      {
        $unwind: "$items",
      },

      {
        $match: {
          "items.commodity": commodity,
        },
      },

      {
        $group: {

          _id: null,

          closing: {
            $sum: "$items.remainingQty",
          },

        },

      },

    ]);

  const closing =
    closingResult[0]?.closing || 0;

  return {

    commodity,

    month: month || null,

    year: year || null,

    opening,

    received,

    distributed,

    closing,

    balanced:
      opening +
      received -
      distributed ===
      closing,

  };

};

/**
 * Stock Movement Report
 */
export const getStockMovementReport = async ({
  ownerId,
  commodity,
  month,
  year,
  fromDate,
  toDate,
}) => {

  let startDate = null;
  let endDate = null;

  if (month && year) {

    startDate = new Date(year, month - 1, 1);

    endDate = new Date(year, month, 1);

  } else if (year) {

    startDate = new Date(year, 0, 1);

    endDate = new Date(year + 1, 0, 1);

  } else if (fromDate || toDate) {

    startDate = fromDate
      ? new Date(fromDate)
      : new Date("1970-01-01");

    endDate = toDate
      ? new Date(toDate)
      : new Date();

    endDate.setDate(
      endDate.getDate() + 1
    );

  }

  /**
   * Stock Received
   */

  const batchMatch = {
    ownerId,
    isDeleted: false,
  };

  if (startDate) {

    batchMatch.batchDate = {
      $gte: startDate,
      $lt: endDate,
    };

  }

  const receivedPipeline = [

    {
      $match: batchMatch,
    },

    {
      $unwind: "$items",
    },

  ];

  if (commodity) {

    receivedPipeline.push({

      $match: {
        "items.commodity": commodity,
      },

    });

  }

  receivedPipeline.push({

    $project: {

      _id: 0,

      date: "$batchDate",

      type: {
        $literal: "RECEIVED",
      },

      batchId: "$_id",

      batchNo: 1,

      commodity: "$items.commodity",

      quantity: "$items.receivedQty",

      unit: "$items.unit",

    },

  });

  const received =
    await StockBatch.aggregate(
      receivedPipeline
    );

  /**
   * Distributed
   */

  const distributionMatch = {
    ownerId,
    isDeleted: false,
  };

  if (month && year) {

    distributionMatch.month = month;
    distributionMatch.year = year;

  } else if (year) {

    distributionMatch.year = year;

  } else if (startDate) {

    distributionMatch.distributionDate = {
      $gte: startDate,
      $lt: endDate,
    };

  }

  const distributedPipeline = [

    {
      $match: distributionMatch,
    },

    {
      $lookup: {
        from: "rationcards",
        localField: "rationCardId",
        foreignField: "_id",
        as: "rationCard",
      },
    },

    {
      $unwind: "$rationCard",
    },

    {
      $unwind: "$items",
    },

  ];

  if (commodity) {

    distributedPipeline.push({

      $match: {
        "items.commodity": commodity,
      },

    });

  }

  distributedPipeline.push({

    $project: {

      _id: 0,

      date: "$distributionDate",

      type: {
        $literal: "DISTRIBUTED",
      },

      rationCardId: "$rationCardId",

      rcNumber: "$rationCard.rcNumber",

      commodity: "$items.commodity",

      quantity: "$items.quantity",

      unit: "$items.unit",

    },

  });

  const distributed =
    await Distribution.aggregate(
      distributedPipeline
    );

  /**
   * Reversed Distribution
   */

  const reversedMatch = {
    ownerId,
    isDeleted: true,
  };

  if (month && year) {

    reversedMatch.month = month;
    reversedMatch.year = year;

  } else if (year) {

    reversedMatch.year = year;

  } else if (startDate) {

    reversedMatch.deletedAt = {
      $gte: startDate,
      $lt: endDate,
    };

  }

  const reversedPipeline = [

    {
      $match: reversedMatch,
    },

    {
      $lookup: {
        from: "rationcards",
        localField: "rationCardId",
        foreignField: "_id",
        as: "rationCard",
      },
    },

    {
      $unwind: "$rationCard",
    },

    {
      $unwind: "$items",
    },

  ];

  if (commodity) {

    reversedPipeline.push({

      $match: {
        "items.commodity": commodity,
      },

    });

  }

  reversedPipeline.push({

    $project: {

      _id: 0,

      date: "$deletedAt",

      type: {
        $literal: "REVERSED",
      },

      rationCardId: "$rationCardId",

      rcNumber: "$rationCard.rcNumber",

      commodity: "$items.commodity",

      quantity: "$items.quantity",

      unit: "$items.unit",

    },

  });

  const reversed =
    await Distribution.aggregate(
      reversedPipeline
    );

  /**
   * Merge & Sort
   */

  const movements = [
    ...received,
    ...distributed,
    ...reversed,
  ].sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  return {

    totalMovements:
      movements.length,

    movements,

  };

};

const COMMODITIES = [
  {
    commodity: "RICE",
    unit: "KG",
  },
  {
    commodity: "WHEAT",
    unit: "KG",
  },
  {
    commodity: "SUGAR",
    unit: "KG",
  },
  {
    commodity: "TUR_DAL",
    unit: "KG",
  },
  {
    commodity: "CHANA_DAL",
    unit: "KG",
  },
  {
    commodity: "PALM_OIL",
    unit: "LITER",
  },
  {
    commodity: "SALT",
    unit: "KG",
  },
];

/**
 * Stock Register
 */
export const getStockRegister = async ({
  ownerId,
  month,
  year,
  fromDate,
  toDate,
}) => {

  const register = [];

  for (const item of COMMODITIES) {

    const ledger =
      await getStockLedger({
        ownerId,
        commodity: item.commodity,
        month,
        year,
        fromDate,
        toDate,
      });

    register.push({

      commodity: item.commodity,

      opening: ledger.opening,

      received: ledger.received,

      distributed: ledger.distributed,

      closing: ledger.closing,

      balanced: ledger.balanced,

      unit: item.unit,

    });

  }

    /**
   * Latest Batch Information
   */
  const latestBatch = await StockBatch.findOne({
    ownerId,
    isDeleted: false,
  })
    .sort({ batchDate: -1, createdAt: -1 })
    .select("batchDate createdAt");

  // return {

  //   period: {

  //     month: month || null,

  //     year: year || null,

  //     fromDate:
  //       fromDate || null,

  //     toDate:
  //       toDate || null,

  //   },

  //   totalCommodities:
  //     register.length,

  //   register,

  // };

    return {
    period: {
      month: month || null,
      year: year || null,
      fromDate: fromDate || null,
      toDate: toDate || null,
    },

    batchDate: latestBatch?.batchDate || null,

    createdAt: latestBatch?.createdAt || null,

    totalCommodities: register.length,

    register,
  };
};

/**
 * Batch Consumption Report
 */
export const getBatchConsumptionReport = async ({
  ownerId,
  commodity,
  batchNo,
  status,
  month,
  year,
  page,
  limit,
  sortBy,
  sortOrder,
}) => {

  const match = {
    ownerId,
    isDeleted: false,
  };

  if (batchNo) {
    match.batchNo = {
      $regex: batchNo,
      $options: "i",
    };
  }

  if (month && year) {

    match.batchDate = {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    };

  }

  const sortFieldMap = {
    batchDate: "batchDate",
    batchNo: "batchNo",
    receivedQty: "receivedQty",
    remainingQty: "remainingQty",
    consumedQty: "consumedQty",
    consumptionPercentage:
      "consumptionPercentage",
  };

  const pipeline = [

    {
      $match: match,
    },

    {
      $unwind: "$items",
    },

    ...(commodity
      ? [{
          $match: {
            "items.commodity":
              commodity,
          },
        }]
      : []),

    /**
     * Calculated Fields
     */
    {
      $addFields: {

        receivedQty:
          "$items.receivedQty",

        remainingQty:
          "$items.remainingQty",

        consumedQty: {
          $subtract: [
            "$items.receivedQty",
            "$items.remainingQty",
          ],
        },

        consumptionPercentage: {

          $cond: [

            {
              $eq: [
                "$items.receivedQty",
                0,
              ],
            },

            0,

            {
              $round: [

                {
                  $multiply: [

                    {
                      $divide: [

                        {
                          $subtract: [
                            "$items.receivedQty",
                            "$items.remainingQty",
                          ],
                        },

                        "$items.receivedQty",

                      ],
                    },

                    100,

                  ],
                },

                2,

              ],
            },

          ],

        },

        status: {

          $cond: [

            {
              $eq: [
                "$items.remainingQty",
                0,
              ],
            },

            "CLOSED",

            "ACTIVE",

          ],

        },

      },

    },

    ...(status
      ? [{
          $match: {
            status,
          },
        }]
      : []),

    {
      $facet: {

        batches: [

          {
            $sort: {
              [sortFieldMap[
                sortBy
              ]]:
                sortOrder ===
                "asc"
                  ? 1
                  : -1,
            },
          },

          {
            $skip:
              (page - 1) *
              limit,
          },

          {
            $limit: limit,
          },

          {
            $project: {

              _id: 0,

              batchId: "$_id",

              batchNo: 1,

              batchDate: 1,

              commodity:
                "$items.commodity",

              receivedQty: 1,

              consumedQty: 1,

              remainingQty: 1,

              consumptionPercentage: 1,

              status: 1,

              unit:
                "$items.unit",

            },

          },

        ],

        totalRecords: [
          {
            $count: "count",
          },
        ],

  summary: [

  {
    $group: {

      _id: null,

      totalBatches: {
        $sum: 1,
      },

      activeBatches: {
        $sum: {
          $cond: [
            { $eq: ["$status", "ACTIVE"] },
            1,
            0,
          ],
        },
      },

      closedBatches: {
        $sum: {
          $cond: [
            { $eq: ["$status", "CLOSED"] },
            1,
            0,
          ],
        },
      },

    },

  },

  {
    $project: {
      _id: 0,
      totalBatches: 1,
      activeBatches: 1,
      closedBatches: 1,
    },
  },

],

      },

    },

  ];

  const result =
    await StockBatch.aggregate(
      pipeline
    );

  const batches =
    result[0].batches;

  const totalRecords =
    result[0].totalRecords[0]
      ?.count || 0;

  const summary =
    result[0].summary[0] || {
      totalBatches: 0,
      activeBatches: 0,
      closedBatches: 0,
    };

  return {

    summary,

    batches,

    pagination: {

      page,

      limit,

      totalRecords,

      totalPages:
        Math.ceil(
          totalRecords /
          limit
        ),

      hasPrevious:
        page > 1,

      hasNext:
        page <
        Math.ceil(
          totalRecords /
          limit
        ),

    },

  };

};

/**
 * Commodity Summary Report
 */
export const getCommoditySummaryReport = async ({
  ownerId,
  commodity,
  month,
  year,
  fromDate,
  toDate,
}) => {

  const stockMatch = {
    ownerId,
    isDeleted: false,
  };

  const distributionMatch = {
    ownerId,
    isDeleted: false,
  };

  /**
   * Month Filter
   */
  if (month && year) {

    stockMatch.batchDate = {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    };

    distributionMatch.month = month;
    distributionMatch.year = year;

  }

  /**
   * Date Range Filter
   */
  else if (fromDate || toDate) {

    stockMatch.batchDate = {};

    distributionMatch.distributionDate = {};

    if (fromDate) {

      stockMatch.batchDate.$gte =
        new Date(fromDate);

      distributionMatch.distributionDate.$gte =
        new Date(fromDate);

    }

    if (toDate) {

      const end = new Date(toDate);
      end.setDate(end.getDate() + 1);

      stockMatch.batchDate.$lt = end;

      distributionMatch.distributionDate.$lt = end;

    }

  }

  /**
   * Stock Aggregation
   */
  const stockData =
    await StockBatch.aggregate([

      {
        $match: stockMatch,
      },

      {
        $unwind: "$items",
      },

      ...(commodity
        ? [{
            $match: {
              "items.commodity":
                commodity,
            },
          }]
        : []),

      {
        $group: {

          _id:
            "$items.commodity",

          received: {
            $sum:
              "$items.receivedQty",
          },

          remaining: {
            $sum:
              "$items.remainingQty",
          },

          unit: {
            $first:
              "$items.unit",
          },

        },

      },

    ]);

  /**
   * Distribution Aggregation
   */
  const distributionData =
    await Distribution.aggregate([

      {
        $match:
          distributionMatch,
      },

      {
        $unwind: "$items",
      },

      ...(commodity
        ? [{
            $match: {
              "items.commodity":
                commodity,
            },
          }]
        : []),

      {
        $group: {

          _id:
            "$items.commodity",

          distributed: {
            $sum:
              "$items.quantity",
          },

          totalCards: {
            $addToSet:
              "$rationCardId",
          },

        },

      },

    ]);

  /**
   * Merge Results
   */
  const commodities =
    stockData.map(stock => {

      const distribution =
        distributionData.find(
          d =>
            d._id === stock._id
        );

      return {

        commodity:
          stock._id,

        received:
          stock.received,

        distributed:
          distribution
            ?.distributed || 0,

        remaining:
          stock.remaining,

        totalCards:
          distribution
            ? distribution.totalCards.length
            : 0,

        unit:
          stock.unit,

      };

    });

  /**
   * Summary
   */
  const summary = {

    totalCommodities:
      commodities.length,

    totalReceived:
      commodities.reduce(
        (sum, c) =>
          sum +
          c.received,
        0
      ),

    totalDistributed:
      commodities.reduce(
        (sum, c) =>
          sum +
          c.distributed,
        0
      ),

    totalRemaining:
      commodities.reduce(
        (sum, c) =>
          sum +
          c.remaining,
        0
      ),

  };

  return {

    summary,

    commodities,

  };

};