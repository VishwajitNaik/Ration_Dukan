import { z } from "zod";

export const stockMismatchSchema = z.object({

  commodity: z
    .string()
    .trim()
    .optional(),

  month: z
    .coerce
    .number()
    .min(1)
    .max(12)
    .optional(),

  year: z
    .coerce
    .number()
    .min(2020)
    .optional(),

  fromDate: z
    .string()
    .optional(),

  toDate: z
    .string()
    .optional(),

});

export const missingDistributionSchema =
  z.object({

    month: z
      .coerce
      .number()
      .min(1)
      .max(12),

    year: z
      .coerce
      .number()
      .min(2020),

    cardType: z
      .string()
      .trim()
      .optional(),

  });

export const negativeStockSchema = z.object({

  commodity: z
    .string()
    .trim()
    .optional(),

});

export const duplicateDistributionSchema =
  z.object({

    month: z
      .coerce
      .number()
      .min(1)
      .max(12),

    year: z
      .coerce
      .number()
      .min(2020),

  });