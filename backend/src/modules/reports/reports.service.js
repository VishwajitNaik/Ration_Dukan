import RationCard from "../rationCard/rationCard.model.js";
import Distribution from "../distribution/distribution.model.js";
import StockBatch from "../stock/stock.model.js";

/**
 * Monthly Government Report
 */
export const getMonthlyGovernmentReport = async ({
  ownerId,
  month,
  year,
}) => {

  /**
   * Active Cards
   */
  const totalActiveCards =
    await RationCard.countDocuments({
      ownerId,
      isDeleted: false,
      cardStatus: "ACTIVE",
    });

  /**
   * Distributed Cards
   */
  const distributedCards =
    await Distribution.distinct(
      "rationCardId",
      {
        ownerId,
        isDeleted: false,
        month,
        year,
      }
    );

  /**
   * Commodity Summary
   */
  const commodities =
    await Distribution.aggregate([

      {
        $match: {
          ownerId,
          isDeleted: false,
          month,
          year,
        },
      },

      {
        $unwind: "$items",
      },

      {
        $group: {

          _id: "$items.commodity",

          issued: {
            $sum: "$items.quantity",
          },

        },

      },

      {
        $lookup: {

          from: "stockbatches",

          let: {
            commodity: "$_id",
          },

          pipeline: [

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

                $expr: {

                  $eq: [
                    "$items.commodity",
                    "$$commodity",
                  ],

                },

              },

            },

            {
              $group: {

                _id: null,

                remaining: {
                  $sum:
                    "$items.remainingQty",
                },

                received: {
                  $sum:
                    "$items.receivedQty",
                },

                unit: {
                  $first:
                    "$items.unit",
                },

              },

            },

          ],

          as: "stock",

        },

      },

      {
        $addFields: {

          stock: {
            $first: "$stock",
          },

        },

      },

      {
        $project: {

          _id: 0,

          commodity: "$_id",

          issued: 1,

          remaining:
            "$stock.remaining",

          received:
            "$stock.received",

          unit:
            "$stock.unit",

        },

      },

      {
        $sort: {
          commodity: 1,
        },
      },

    ]);

  /**
   * Stock Summary
   */
  const stockSummary = {

    received:
      commodities.reduce(
        (sum, c) =>
          sum + (c.received || 0),
        0
      ),

    distributed:
      commodities.reduce(
        (sum, c) =>
          sum + (c.issued || 0),
        0
      ),

    remaining:
      commodities.reduce(
        (sum, c) =>
          sum + (c.remaining || 0),
        0
      ),

  };

  return {

    month,

    year,

    cards: {

      totalActive:
        totalActiveCards,

      distributed:
        distributedCards.length,

      pending:
        totalActiveCards -
        distributedCards.length,

    },

    commodities,

    stockSummary,

    generatedAt:
      new Date(),

  };

};