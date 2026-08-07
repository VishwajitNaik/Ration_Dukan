import { z } from "zod";

/**
 * Allocation Schema
 */
const allocationSchema = z.object({
  batchId: z.string().trim(),

  quantity: z
    .number()
    .positive("Allocation quantity must be greater than zero"),
});

/**
 * Distribution Item Schema
 */
const distributionItemSchema = z.object({
  commodity: z.enum([
    "RICE",
    "WHEAT",
    "SUGAR",
    "TUR_DAL",
    "CHANA_DAL",
    "PALM_OIL",
    "SALT",
  ]),

  quantity: z
    .number()
    .positive("Quantity must be greater than zero"),

  unit: z.enum([
    "KG",
    "LITER",
  ]),

  /**
   * Filled by backend during FIFO allocation.
   * Client should not send this.
   */
  allocations: z
    .array(allocationSchema)
    .optional()
    .default([]),
});

/**
 * Base Schema
 */
const distributionBaseSchema = z.object({
  rationCardId: z
    .string()
    .trim()
    .min(1, "Ration Card is required"),

  collectedByMemberId: z
    .string()
    .min(1, "Collected By member is required."),

  distributionDate: z
    .coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      {
        message:
          "Distribution date cannot be in the future.",
      }
    ),

  remarks: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default(""),

  items: z
    .array(distributionItemSchema)
    .min(
      1,
      "At least one commodity is required."
    ),
});

/**
 * Create Distribution
 */
// export const createDistributionSchema =
//   distributionBaseSchema.superRefine(
//     (data, ctx) => {

//       const commoditySet = new Set();

//       for (const item of data.items) {

//         if (
//           commoditySet.has(item.commodity)
//         ) {
//           ctx.addIssue({
//             code: "custom",
//             path: ["items"],
//             message:
//               "Duplicate commodities are not allowed.",
//           });

//           break;
//         }

//         commoditySet.add(
//           item.commodity
//         );

//       }

//     }
//   );

export const createDistributionSchema =
  distributionBaseSchema.superRefine(
    (data, ctx) => {

      /**
       * Duplicate Commodity Check
       */
      const commoditySet = new Set();

      for (const item of data.items) {

        if (commoditySet.has(item.commodity)) {

          ctx.addIssue({
            code: "custom",
            path: ["items"],
            message:
              "Duplicate commodities are not allowed.",
          });

          break;

        }

        commoditySet.add(item.commodity);

      }

    }
  );

/**
 * Update Distribution
 */
export const updateDistributionSchema =
  z.object({

    distributionDate: z
      .coerce
      .date()
      .optional(),

    remarks: z
      .string()
      .trim()
      .max(500)
      .optional(),

    items: z
      .array(distributionItemSchema)
      .optional(),

  }).superRefine((data, ctx) => {

    if (!data.items) {
      return;
    }

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

  });   

/**
 *  
 *  
 * 
 */

export const distributionHistorySchema = z.object({

  rationCardId: z
    .string()
    .trim()
    .optional(),

  month: z
    .coerce
    .number()
    .int()
    .min(1)
    .max(12)
    .optional(),

  year: z
    .coerce
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

  fromDate: z
    .coerce
    .date()
    .optional(),

  toDate: z
    .coerce
    .date()
    .optional(),

  keyword: z
    .string()
    .trim()
    .optional()
    .default(""),

  sortBy: z.enum([
    "distributionDate",
    "createdAt",
  ])
    .optional()
    .default("distributionDate"),

  sortOrder: z.enum([
    "asc",
    "desc",
  ])
    .optional()
    .default("desc"),

  page: z
    .coerce
    .number()
    .int()
    .min(1)
    .optional()
    .default(1),

  limit: z
    .coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .default(10),

}).superRefine((data, ctx) => {

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
 * Distribution Report Validation
 */
export const distributionReportSchema = z.object({

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

  fromDate: z.coerce
    .date()
    .optional(),

  toDate: z.coerce
    .date()
    .optional(),

}).superRefine((data, ctx) => {

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
 * Daily Distribution Register
 */
export const dailyDistributionRegisterSchema = z.object({

  date: z.coerce
    .date()
    .optional(),

});