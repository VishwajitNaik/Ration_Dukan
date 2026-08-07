import { z } from "zod";

export const exportReportSchema = z.object({

  /**
   * Report Name
   */
  report: z.enum([
    "DAILY_DISTRIBUTION_REGISTER",
    "STOCK_REGISTER",
    "BENEFICIARY_REGISTER",
    "BATCH_CONSUMPTION",
    "COMMODITY_SUMMARY",
    "MONTHLY_GOVERNMENT",
    "CURRENT_STOCK",
    "LOW_STOCK",
    "STOCK_LEDGER",
    "STOCK_MOVEMENT",
    "DASHBOARD",
  ]),

  /**
   * Export Format
   */
  format: z.enum([
    "PDF",
    "EXCEL",
    "PRINT",
  ]),

  /**
   * Common Filters
   */
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

  commodity: z.enum([
    "RICE",
    "WHEAT",
    "SUGAR",
    "TUR_DAL",
    "CHANA_DAL",
    "PALM_OIL",
    "SALT",
  ]).optional(),

  rationCardId: z
    .string()
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
   * Date Validation
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