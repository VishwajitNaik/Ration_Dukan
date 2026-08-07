
import { successResponse } from "../../utils/response.js";

import {
  getStockMismatchReport,
  getMissingDistributionReport,
  getNegativeStockReport,
} from "./audit.service.js";

export const getStockMismatch = async (
  req,
  res,
  next
) => {

  try {

    const report =
      await getStockMismatchReport({

        ownerId: req.owner._id,

        commodity:
          req.validatedData.commodity,

        month:
          req.validatedData.month,

        year:
          req.validatedData.year,

        fromDate:
          req.validatedData.fromDate,

        toDate:
          req.validatedData.toDate,

      });

    return successResponse(

      res,

      "Stock mismatch report fetched successfully",

      report

    );

  } catch (error) {

    next(error);

  }

};



export const getMissingDistribution =
  async (
    req,
    res,
    next
  ) => {

    try {

      const report =
        await getMissingDistributionReport({

          ownerId:
            req.owner._id,

          month:
            req.validatedData.month,

          year:
            req.validatedData.year,

          cardType:
            req.validatedData.cardType,

        });

      return successResponse(

        res,

        "Missing distribution report fetched successfully",

        report

      );

    } catch (error) {

      next(error);

    }

  };


export const getNegativeStock =
  async (
    req,
    res,
    next
  ) => {

    try {

      const report =
        await getNegativeStockReport({

          ownerId:
            req.owner._id,

          commodity:
            req.validatedData
              .commodity,

        });

      return successResponse(

        res,

        "Negative stock report fetched successfully",

        report

      );

    } catch (error) {

      next(error);

    }

  };