import Distribution from "./distribution.model.js";
import StockBatch from "../stock/stock.model.js";

// /**
//  * Create Distribution
//  */
// export const createDistribution = async (
//   distributionData
// ) => {
//   return await Distribution.create(
//     distributionData
//   );
// };

/**
 * Create Distribution
 */
export const createDistribution = async (
  distributionData,
  options = {}
) => {

  const distribution =
    await Distribution.create(
      [distributionData],
      options
    );

  return distribution;

};

/**
 * Update Distribution
 */
export const updateDistribution = async (
  ownerId,
  distributionId,
  updateData
) => {
  return await Distribution.findOneAndUpdate(
    {
      _id: distributionId,
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
 * Soft Delete Distribution
 */
export const deleteDistribution = async (
  ownerId,
  distributionId
) => {
  return await Distribution.findOneAndUpdate(
    {
      _id: distributionId,
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
 * Find Distribution By ID
 */
export const findById = async (
  ownerId,
  distributionId
) => {
  return await Distribution.findOne({
    _id: distributionId,
    ownerId,
    isDeleted: false,
  })
    .populate(
      "rationCardId",
      "rcNumber members.name members.isHead"
    );
};

/**
 * List Distributions
 */
export const findAll = async ({
  ownerId,
  page = 1,
  limit = 10,
  rationCardId,
  month,
  year,
  fromDate,
  toDate,
  sortBy = "distributionDate",
  sortOrder = "desc",
}) => {

  const query = {
    ownerId,
    isDeleted: false,
  };

  if (rationCardId) {
    query.rationCardId =
      rationCardId;
  }

  if (month) {
    query.month =
      Number(month);
  }

  if (year) {
    query.year =
      Number(year);
  }

  if (fromDate || toDate) {

    query.distributionDate = {};

    if (fromDate) {
      query.distributionDate.$gte =
        new Date(fromDate);
    }

    if (toDate) {
      query.distributionDate.$lte =
        new Date(toDate);
    }

  }

  const skip =
    (page - 1) * limit;


  const distributions =
    await Distribution.find(query)
      .populate(
        "rationCardId",
        "rcNumber"
      )
      .sort({
        [sortBy]:
          sortOrder === "asc"
            ? 1
            : -1,
      })
      .skip(skip)
      .limit(limit);

  const totalRecords =
    await Distribution.countDocuments(
      query
    );

  return {
    distributions,
    totalRecords,
  };
};

/**
 * Today's Distributions
 */
export const findToday = async (
  ownerId
) => {

  const start =
    new Date();

  start.setHours(
    0,
    0,
    0,
    0
  );

  const end =
    new Date();

  end.setHours(
    23,
    59,
    59,
    999
  );

  return await Distribution.find({
    ownerId,
    isDeleted: false,
    distributionDate: {
      $gte: start,
      $lte: end,
    },
  })
    .populate(
      "rationCardId",
      "rcNumber"
    )
    .sort({
      distributionDate: -1,
    });

};

/**
 * Monthly Distribution Exists
 */
export const distributionExists =
  async (
    ownerId,
    rationCardId,
    month,
    year
  ) => {

    return await Distribution.exists({
      ownerId,
      rationCardId,
      month,
      year,
      isDeleted: false,
    });

  };

/**
 * Find Distribution With Allocations
 */
export const findByIdWithAllocations =
  async (
    ownerId,
    distributionId
  ) => {

    return await Distribution.findOne({
      _id: distributionId,
      ownerId,
      isDeleted: false,
    });

  };

/**
 * Soft Delete Distribution
 */
export const softDeleteDistribution = async (
  ownerId,
  distributionId,
  session
) => {

  return await Distribution.findOneAndUpdate(
    {
      _id: distributionId,
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
      session,
    }
  );

};

/**
 * Private History Query Builder
 */
const buildHistoryQuery = ({
  ownerId,
  rationCardId,
  month,
  year,
  commodity,
  fromDate,
  toDate,
}) => {

  const query = {
    ownerId,
    isDeleted: false,
  };

  if (rationCardId) {
    query.rationCardId = rationCardId;
  }

  if (month) {
    query.month = month;
  }

  if (year) {
    query.year = year;
  }

  if (commodity) {
    query["items.commodity"] = commodity;
  }

  if (fromDate || toDate) {

    query.distributionDate = {};

    if (fromDate) {
      query.distributionDate.$gte =
        new Date(fromDate);
    }

    if (toDate) {
      query.distributionDate.$lte =
        new Date(toDate);
    }

  }

  return query;

};

/**
 * Distribution History
 */
export const getDistributionHistoryService =
async ({
  ownerId,
  rationCardId,
  month,
  year,
  commodity,
  fromDate,
  toDate,
  page = 1,
  limit = 10,
  sortBy = "distributionDate",
  sortOrder = "desc",
}) => {

  const skip =
    (page - 1) * limit;

  const query =
    buildHistoryQuery({
      ownerId,
      rationCardId,
      month,
      year,
      commodity,
      fromDate,
      toDate,
    });

  const sort = {
    [sortBy]:
      sortOrder === "asc"
        ? 1
        : -1,
  };


  const distributions =
    await Distribution.find(query)
      .populate(
        "rationCardId",
        "rcNumber"
      )
      .sort(sort)
      .skip(skip)
      .limit(limit);

  const totalRecords =
    await Distribution.countDocuments(
      query
    );

  return {
    distributions,
    totalRecords,
  };

};

/**
 * Search Distribution History
 */
export const searchDistributionHistory = async ({
  ownerId,
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
}) => {

    if (keyword) {
  return await searchDistributionHistory({
    ownerId,
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
}

  const skip = (page - 1) * limit;

    const escapedKeyword = keyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const match = {
    ownerId,
    isDeleted: false,
  };

  if (rationCardId) {
    match.rationCardId = rationCardId;
  }

  if (month) {
    match.month = month;
  }

  if (year) {
    match.year = year;
  }

  if (commodity) {
    match["items.commodity"] = commodity;
  }

  if (fromDate || toDate) {

    match.distributionDate = {};

    if (fromDate) {
      match.distributionDate.$gte =
        new Date(fromDate);
    }

    if (toDate) {
      match.distributionDate.$lte =
        new Date(toDate);
    }

  }

  const pipeline = [

    {
      $match: match,
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
  $match: {
    $or: [
      {
        "rationCard.rcNumber": {
          $regex: escapedKeyword,
          $options: "i",
        },
      },
      {
        "rationCard.members.name": {
          $regex: escapedKeyword,
          $options: "i",
        },
      },
      {
        "rationCard.members.aadhaarNumber": {
          $regex: escapedKeyword,
          $options: "i",
        },
      },
      {
        "rationCard.members.mobile": {
          $regex: escapedKeyword,
          $options: "i",
        },
      },
    ],
  },
},

    {
      $sort: {
        [sortBy]:
          sortOrder === "asc"
            ? 1
            : -1,
      },
    },

    {
      $facet: {

        data: [

          {
            $skip: skip,
          },

          {
            $limit: limit,
          },

        ],

        totalRecords: [

          {
            $count: "count",
          },

        ],

      },

    },

  ];

  const result =
    await Distribution.aggregate(
      pipeline
    );

  return {

    distributions:
      result[0].data,

    totalRecords:
      result[0].totalRecords[0]
        ?.count || 0,

  };

};


/**
 * Today Distribution Report
 */
export const getTodayReport = async (
  ownerId
) => {

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  /**
   * Total Distributions
   */
  const totalDistributions =
    await Distribution.countDocuments({
      ownerId,
      isDeleted: false,
      distributionDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

  /**
   * Commodity Summary
   */
  const report =
    await Distribution.aggregate([

      {
        $match: {
          ownerId,
          isDeleted: false,
          distributionDate: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },

      {
        $unwind: "$items",
      },

      {
        $group: {
          _id: "$items.commodity",

          totalQuantity: {
            $sum: "$items.quantity",
          },

          totalCards: {
            $addToSet:
              "$rationCardId",
          },

        },
      },

    ]);

  const commodities = {};

  const totalCards = new Set();

  for (const row of report) {

    commodities[row._id] =
      row.totalQuantity;

    row.totalCards.forEach(card =>
      totalCards.add(card.toString())
    );

  }

  return {

    date: today,

    totalCards:
      totalCards.size,

    totalDistributions,

    commodities,

  };

};

/**
 * Monthly Report
 */
/**
 * Monthly Report
 */
export const getMonthlyReport = async (
  ownerId,
  month,
  year
) => {

  const report = await Distribution.aggregate([

    {
      $match: {
        ownerId,
        isDeleted: false,
        month,
        year,
      },
    },

    {
      $facet: {

        /**
         * Commodity Summary
         */
        commodities: [

          {
            $unwind: "$items",
          },

          {
            $group: {
              _id: "$items.commodity",

              totalQuantity: {
                $sum: "$items.quantity",
              },
            },
          },

        ],

        /**
         * Summary
         */
        summary: [

          {
            $group: {

              _id: null,

              totalCards: {
                $addToSet: "$rationCardId",
              },

              totalDistributions: {
                $sum: 1,
              },

            },
          },

        ],

      },

    },

  ]);

  const commodities = {};

  for (const item of report[0].commodities) {

    commodities[item._id] =
      item.totalQuantity;

  }

  return {

    month,

    year,

    totalCards:
      report[0].summary[0]
        ?.totalCards.length || 0,

    totalDistributions:
      report[0].summary[0]
        ?.totalDistributions || 0,

    commodities,

  };

};

/**
 * Yearly Report
 */
/**
 * Yearly Report
 */
export const getYearlyReport = async (
  ownerId,
  year
) => {

  const report = await Distribution.aggregate([

    {
      $match: {
        ownerId,
        isDeleted: false,
        year,
      },
    },

    {
      $unwind: "$items",
    },

    {
      $group: {

        _id: {
          month: "$month",
          commodity: "$items.commodity",
        },

        totalQuantity: {
          $sum: "$items.quantity",
        },

        totalCards: {
          $addToSet: "$rationCardId",
        },

        totalDistributions: {
          $addToSet: "$_id",
        },

      },

    },

    {
      $sort: {
        "_id.month": 1,
      },
    },

  ]);

  /**
   * Initialize all 12 months
   */
  const months = Array.from(
    { length: 12 },
    (_, index) => ({
      month: index + 1,
      totalCards: 0,
      totalDistributions: 0,
      commodities: {},
    })
  );

  /**
   * Populate report
   */
  for (const row of report) {

    const monthData =
      months[row._id.month - 1];

    monthData.commodities[
      row._id.commodity
    ] = row.totalQuantity;

    monthData.totalCards = Math.max(
      monthData.totalCards,
      row.totalCards.length
    );

    monthData.totalDistributions = Math.max(
      monthData.totalDistributions,
      row.totalDistributions.length
    );

  }

  return {
    year,
    months,
  };

};

/**
 * Commodity Report
 */
/**
 * Commodity Report
 */
export const getCommodityReport = async (
  ownerId,
  commodity,
  month,
  year
) => {

  const stock = await StockBatch.aggregate([

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

        received: {
          $sum: "$items.receivedQty",
        },

        remaining: {
          $sum: "$items.remainingQty",
        },

      },
    },

  ]);

  const distributionMatch = {
    ownerId,
    isDeleted: false,
  };

  if (month) {
    distributionMatch.month = month;
  }

  if (year) {
    distributionMatch.year = year;
  }

  const distribution =
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

          totalCards: {
            $addToSet: "$rationCardId",
          },

          totalDistributions: {
            $sum: 1,
          },

        },

      },

    ]);

  const batches =
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
        $project: {

          _id: 0,

          batchId: "$_id",

          batchNo: 1,

          batchDate: 1,

          receivedQty:
            "$items.receivedQty",

          remainingQty:
            "$items.remainingQty",

          unit:
            "$items.unit",

        },

      },

      {
        $sort: {
          batchDate: 1,
        },
      },

    ]);

  const received =
    stock[0]?.received || 0;

  const remaining =
    stock[0]?.remaining || 0;

  const distributed =
    distribution[0]?.distributed || 0;

  return {

    commodity,

    month: month || null,

    year: year || null,

    received,

    distributed,

    remaining,

    available: remaining,

    totalCards:
      distribution[0]?.totalCards
        ?.length || 0,

    totalDistributions:
      distribution[0]
        ?.totalDistributions || 0,

    stockBalanced:
      received ===
      distributed + remaining,

    batches,

  };

};

/**
 * Dashboard Summary
 */
export const getDashboardSummary =
async (
  ownerId
) => {

  const today =
    await getTodayReport(
      ownerId
    );

  return {

    today,

  };

};

/**
 * Daily Distribution Register
 */
export const getDailyDistributionRegister = async (
  ownerId,
  date
) => {

  let startDate;
  let endDate;

  if (date) {

    startDate = new Date(date);

  } else {

    startDate = new Date();

  }

  startDate.setHours(0, 0, 0, 0);

  endDate = new Date(startDate);

  endDate.setDate(
    endDate.getDate() + 1
  );

  const register =
    await Distribution.find({

      ownerId,

      isDeleted: false,

      distributionDate: {
        $gte: startDate,
        $lt: endDate,
      },

    })

      .populate(
        "rationCardId",
        "rcNumber headOfFamily"
      )

      .populate(
        "distributedBy",
        "name fullName"
      )

      .sort({
        createdAt: 1,
      });

  return register;

};