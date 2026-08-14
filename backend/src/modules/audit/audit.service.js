import { COMMODITIES } from "../../config/constants.js";
import { getStockLedger } from "../stock/stock.service.js";

  import StockBatch from "../stock/stock.model.js";

export const getStockMismatchReport = async ({
  ownerId,
  commodity,
  month,
  year,
  fromDate,
  toDate,
}) => {

  /**
   * Commodity List
   */
const commodities = commodity
  ? [commodity]
  : COMMODITIES;

  const report = [];

  let totalMismatch = 0;

  for (const item of commodities) {

    /**
     * Get Ledger
     */
    const ledger =
      await getStockLedger({
        ownerId,
        commodity: item,
        month,
        year,
        fromDate,
        toDate,
      });

    /**
     * Expected Closing
     */
    const expectedClosing =
      ledger.opening +
      ledger.received -
      ledger.distributed;

    /**
     * Difference
     */
    const difference =
      ledger.closing -
      expectedClosing;

    /**
     * Mismatch
     */
    const mismatch =
      difference !== 0;

    if (mismatch) {
      totalMismatch++;
    }

    report.push({

      commodity: item,

      opening: ledger.opening,

      received: ledger.received,

      distributed: ledger.distributed,

      expectedClosing,

      actualClosing: ledger.closing,

      difference,

      balanced: ledger.balanced,

      mismatch,

    });

  }

  return {

    summary: {

      totalCommodities:
        report.length,

      totalMismatch,

      auditPassed:
        totalMismatch === 0,

    },

    report,

  };

};

import RationCard from "../rationCard/rationCard.model.js";
import Distribution from "../distribution/distribution.model.js";

export const getMissingDistributionReport =
  async ({
    ownerId,
    month,
    year,
    cardType,
  }) => {

    /**
     * Eligible Cards
     */
    const cardMatch = {

      ownerId,

      isDeleted: false,

      cardStatus: "ACTIVE",

    };

    if (cardType) {
      cardMatch.cardType = cardType;
    }

    const cards =
      await RationCard.find(cardMatch)
        .select(
          "rcNumber cardType members"
        )
        .lean();

    /**
     * Distributed Cards
     */
    const distributed =
      await Distribution.find({

        ownerId,

        month,

        year,

        isDeleted: false,

      })
        .select("rationCardId")
        .lean();

    const distributedIds =
      new Set(

        distributed.map(item =>
          item.rationCardId.toString()
        )

      );

    /**
     * Missing Cards
     */
    const missing =
      cards
        .filter(
          card =>
            !distributedIds.has(
              card._id.toString()
            )
        )
        .map(card => ({

          rcNumber:
            card.rcNumber,

          headOfFamily:
            card.members.find(
              member =>
                member.isHead
            )?.name || "-",

          cardType:
            card.cardType,

          totalMembers:
            card.members.filter(
              member =>
                !member.isDeleted
            ).length,

        }));

    return {

      summary: {

        totalEligibleCards:
          cards.length,

        distributedCards:
          distributedIds.size,

        missingCards:
          missing.length,

      },

      missing,

    };

  };

export const getNegativeStockReport =
  async ({
    ownerId,
    commodity,
  }) => {

    const match = {

      ownerId,

      isDeleted: false,

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
              "items.commodity": commodity,
            },
          }]
        : []),

      {
        $match: {
          "items.remainingQty": {
            $lt: 0,
          },
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

          remainingQty:
            "$items.remainingQty",

          receivedQty:
            "$items.receivedQty",

          unit:
            "$items.unit",

        },

      },

      {
        $sort: {

          batchDate: 1,

        },

      },

    ];

    const negative =
      await StockBatch.aggregate(
        pipeline
      );

    return {

      summary: {

        totalNegative:
          negative.length,

        auditPassed:
          negative.length === 0,

      },

      negative,

    };

  };


export const getDuplicateDistributionReport =
  async ({
    ownerId,
    month,
    year,
  }) => {

    const duplicates =
      await Distribution.aggregate([

        {
          $match: {

            ownerId,

            month,

            year,

            isDeleted: false,

          },

        },

        {
          $group: {

            _id: "$rationCardId",

            totalDistributions: {
              $sum: 1,
            },

            dates: {
              $push: "$distributionDate",
            },

          },

        },

        {
          $match: {

            totalDistributions: {
              $gt: 1,
            },

          },

        },

        {
          $lookup: {

            from: "rationcards",

            localField: "_id",

            foreignField: "_id",

            as: "rationCard",

          },

        },

        {
          $unwind: "$rationCard",
        },

        {
          $project: {

            _id: 0,

            rationCardId: "$rationCard._id",

            rcNumber: "$rationCard.rcNumber",

            cardType: "$rationCard.cardType",

            totalDistributions: 1,

            dates: 1,

          },

        },

        {
          $sort: {

            rcNumber: 1,

          },

        },

      ]);

    return {

      summary: {

        totalDuplicates:
          duplicates.length,

        auditPassed:
          duplicates.length === 0,

      },

      duplicates,

    };

  };