import { z } from "zod";
import {
  COMMODITIES,
  UNITS,
} from "../../config/constants.js";


const stockItemSchema = z.object({
  commodity: z.enum(COMMODITIES, {
    errorMap: () => ({
      message: "Invalid commodity type",
    }),
  }),

  receivedQty: z
    .number()
    .min(0, "Quantity cannot be negative"),

  unit: z.enum(UNITS, {
    errorMap: () => ({
      message: "Invalid unit type",
    }),
  }),
});

const stockBatchBaseSchema = z.object({
  batchDate: z.coerce.date({
    error: "Invalid batch date",
  }),

  remarks: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default(""),

  items: z
    .array(stockItemSchema)
    .min(1, "At least one stock item is required"),
});

/**
 * Create Batch
 */
export const createStockBatchSchema =
  stockBatchBaseSchema.superRefine(
    (data, ctx) => {

      const commoditySet = new Set();

      for (const item of data.items) {

        if (
          commoditySet.has(item.commodity)
        ) {
          ctx.addIssue({
            code: "custom",
            path: ["items"],
            message:
              "Duplicate commodities are not allowed.",
          });

          break;
        }

        commoditySet.add(
          item.commodity
        );

      }

    }
  );

  /**
 * Low Stock Report
 */
export const lowStockReportSchema = z.object({

  threshold: z.coerce
    .number()
    .min(0)
    .default(100),

});

/**
 * Batch Wise Report
 */
export const batchWiseReportSchema = z.object({

  commodity: z.enum([
    "RICE",
    "WHEAT",
    "SUGAR",
    "TUR_DAL",
    "CHANA_DAL",
    "PALM_OIL",
    "SALT",
  ]).optional(),

});

/**
 * Stock Ledger Report
 */
export const stockLedgerSchema = z.object({

  commodity: z.enum([
    "RICE",
    "WHEAT",
    "SUGAR",
    "TUR_DAL",
    "CHANA_DAL",
    "PALM_OIL",
    "SALT",
  ]),

  month: z.coerce
    .number()
    .int()
    .min(1)
    .max(12)
    .optional(),

  year: z.coerce
    .number()
    .int()
    .min(2020)
    .max(2100)
    .optional(),

  fromDate: z.coerce
    .date()
    .optional(),

  toDate: z.coerce
    .date()
    .optional(),

}).superRefine((data, ctx) => {

  /**
   * Date Range Validation
   */
  if (
    data.fromDate &&
    data.toDate &&
    data.fromDate > data.toDate
  ) {

    ctx.addIssue({
      code: "custom",
      path: ["toDate"],
      message:
        "toDate must be greater than or equal to fromDate.",
    });

  }

  /**
   * Month requires Year
   */
  if (
    data.month &&
    !data.year
  ) {

    ctx.addIssue({
      code: "custom",
      path: ["year"],
      message:
        "Year is required when month is provided.",
    });

  }

});

/**
 * Stock Movement Report
 */
export const stockMovementSchema = z.object({

  commodity: z.enum([
    "RICE",
    "WHEAT",
    "SUGAR",
    "TUR_DAL",
    "CHANA_DAL",
    "PALM_OIL",
    "SALT",
  ]).optional(),

  month: z.coerce
    .number()
    .int()
    .min(1)
    .max(12)
    .optional(),

  year: z.coerce
    .number()
    .int()
    .min(2020)
    .max(2100)
    .optional(),

  fromDate: z.coerce
    .date()
    .optional(),

  toDate: z.coerce
    .date()
    .optional(),

}).superRefine((data, ctx) => {

  /**
   * Month requires Year
   */
  if (
    data.month &&
    !data.year
  ) {

    ctx.addIssue({
      code: "custom",
      path: ["year"],
      message:
        "Year is required when month is provided.",
    });

  }

  /**
   * Date Range
   */
  if (
    data.fromDate &&
    data.toDate &&
    data.fromDate > data.toDate
  ) {

    ctx.addIssue({
      code: "custom",
      path: ["toDate"],
      message:
        "toDate must be greater than or equal to fromDate.",
    });

  }

});

export const stockRegisterSchema = z.object({

  month: z.coerce
    .number()
    .int()
    .min(1)
    .max(12)
    .optional(),

  year: z.coerce
    .number()
    .int()
    .min(2020)
    .max(2100)
    .optional(),

  fromDate: z.coerce
    .date()
    .optional(),

  toDate: z.coerce
    .date()
    .optional(),

}).superRefine((data, ctx) => {

  if (
    data.month &&
    !data.year
  ) {

    ctx.addIssue({

      code: "custom",

      path: ["year"],

      message:
        "Year is required when month is provided.",

    });

  }

  if (
    data.fromDate &&
    data.toDate &&
    data.fromDate > data.toDate
  ) {

    ctx.addIssue({

      code: "custom",

      path: ["toDate"],

      message:
        "toDate must be after fromDate.",

    });

  }

});

export const batchConsumptionReportSchema =
  z.object({

    commodity: z
      .enum([
        "RICE",
        "WHEAT",
        "SUGAR",
        "TUR_DAL",
        "CHANA_DAL",
        "PALM_OIL",
        "SALT",
      ])
      .optional(),

    batchNo: z
      .string()
      .trim()
      .optional(),

    status: z
      .enum([
        "ACTIVE",
        "CLOSED",
      ])
      .optional(),

    month: z.coerce
      .number()
      .int()
      .min(1)
      .max(12)
      .optional(),

    year: z.coerce
      .number()
      .int()
      .min(2020)
      .max(2100)
      .optional(),

    page: z.coerce
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(10),

    sortBy: z
      .enum([
        "batchDate",
        "batchNo",
        "receivedQty",
        "remainingQty",
        "consumedQty",
        "consumptionPercentage",
      ])
      .default("batchDate"),

    sortOrder: z
      .enum([
        "asc",
        "desc",
      ])
      .default("asc"),

  })
  .superRefine((data, ctx) => {

    /**
     * Month requires Year
     */
    if (
      data.month &&
      !data.year
    ) {

      ctx.addIssue({
        code: "custom",
        path: ["year"],
        message:
          "Year is required when month is provided.",
      });

    }

  });

  export const commoditySummaryReportSchema =
  z.object({

    commodity: z.enum([
      "RICE",
      "WHEAT",
      "SUGAR",
      "TUR_DAL",
      "CHANA_DAL",
      "PALM_OIL",
      "SALT",
    ]).optional(),

    month: z.coerce
      .number()
      .int()
      .min(1)
      .max(12)
      .optional(),

    year: z.coerce
      .number()
      .int()
      .min(2020)
      .max(2100)
      .optional(),

    fromDate: z.coerce
      .date()
      .optional(),

    toDate: z.coerce
      .date()
      .optional(),

  }).superRefine((data, ctx) => {

    /**
     * Month requires Year
     */
    if (
      data.month &&
      !data.year
    ) {

      ctx.addIssue({
        code: "custom",
        path: ["year"],
        message:
          "Year is required when month is provided.",
      });

    }

    /**
     * Date Range Validation
     */
    if (
      data.fromDate &&
      data.toDate &&
      data.fromDate > data.toDate
    ) {

      ctx.addIssue({
        code: "custom",
        path: ["toDate"],
        message:
          "toDate must be greater than or equal to fromDate.",
      });

    }

  });

/**
 * Update Batch
 */
export const updateStockBatchSchema =
  stockBatchBaseSchema.partial();