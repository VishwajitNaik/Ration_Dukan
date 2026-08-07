import Distribution from "../distribution/distribution.model.js";
import StockBatch from "../stock/stock.model.js";
import RationCard from "../rationCard/rationCard.model.js";

/**
 * FPS Dashboard
 */
export const getDashboard = async ({
  ownerId,
  threshold,
  recentLimit,
}) => {

  /**
   * Today
   */
  const today = new Date();

  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setHours(23, 59, 59, 999);

  /**
   * Current Month
   */
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const [

    todayResult,

    currentStock,

    lowStock,

    recentTransactions,

    totalActiveCards,

    distributedCards,

  ] = await Promise.all([

    /**
     * Today's Distribution
     */
    Distribution.aggregate([

      {
        $match: {
          ownerId,
          isDeleted: false,
          distributionDate: {
            $gte: start,
            $lte: end,
          },
        },
      },

      {
        $group: {

          _id: null,

          cards: {
            $addToSet: "$rationCardId",
          },

          transactions: {
            $sum: 1,
          },

        },

      },

    ]),

    /**
     * Current Stock
     */
    StockBatch.aggregate([

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

          available: {
            $sum: "$items.remainingQty",
          },

          unit: {
            $first: "$items.unit",
          },

        },

      },

      {
        $project: {

          _id: 0,

          commodity: "$_id",

          available: 1,

          unit: 1,

        },

      },

      {
        $sort: {
          commodity: 1,
        },
      },

    ]),

    /**
     * Low Stock
     */
    StockBatch.aggregate([

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

          available: {
            $sum: "$items.remainingQty",
          },

          unit: {
            $first: "$items.unit",
          },

        },

      },

      {
        $match: {
          available: {
            $lt: threshold,
          },
        },
      },

      {
        $project: {

          _id: 0,

          commodity: "$_id",

          available: 1,

          unit: 1,

          status: {
            $literal: "LOW",
          },

        },

      },

    ]),

    /**
     * Recent Transactions
     */
/**
 * Recent Transactions
 */
Distribution.aggregate([

  {
    $match: {
      ownerId,
      isDeleted: false,
    },
  },

  {
    $sort: {
      createdAt: -1,
    },
  },

  {
    $limit: recentLimit,
  },

  {
    $lookup: {
      from: "rationcards",
      localField: "rationCardId",
      foreignField: "_id",
      as: "card",
    },
  },

  {
    $unwind: "$card",
  },

  {
    $lookup: {
      from: "owners",
      localField: "distributedBy",
      foreignField: "_id",
      as: "operator",
    },
  },

  {
    $unwind: {
      path: "$operator",
      preserveNullAndEmptyArrays: true,
    },
  },

  {
    $project: {

      _id: 0,

      distributionId: "$_id",

      time: {
        $dateToString: {
          format: "%H:%M",
          date: "$createdAt",
        },
      },

      date: "$distributionDate",

      rcNumber: "$card.rcNumber",

      totalItems: {
        $size: "$items",
      },

      totalQuantity: {
        $sum: "$items.quantity",
      },

      commodities: {
        $map: {
          input: "$items",
          as: "item",
          in: "$$item.commodity",
        },
      },

      operator: "$operator.name",

      collectedBy: "$collectedBy.name",

    },

  },

]),
    /**
     * Active Cards
     */
    RationCard.countDocuments({

      ownerId,

      isDeleted: false,

      cardStatus: "ACTIVE",

    }),

    /**
     * Distributed Cards
     */
    Distribution.distinct(
      "rationCardId",
      {

        ownerId,

        isDeleted: false,

        month,

        year,

      }
    ),

  ]);

  return {

    today: {

      cards:
        todayResult[0]
          ?.cards.length || 0,

      transactions:
        todayResult[0]
          ?.transactions || 0,

    },

    stock: currentStock,

    lowStock,

    recentTransactions,

    monthly: {

      distributedCards:
        distributedCards.length,

      pendingCards:
        totalActiveCards -
        distributedCards.length,

    },

  };

};