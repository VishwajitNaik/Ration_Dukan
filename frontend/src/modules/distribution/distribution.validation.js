import { z } from "zod";

export const distributionItemSchema = z.object({
  commodity: z.enum([
    "RICE",
    "WHEAT",
    "SUGAR",
    "TUR_DAL",
    "CHANA_DAL",
    "PALM_OIL",
    "SALT",
  ]),

  quantity: z.coerce
    .number()
    .positive(),

  unit: z.enum([
    "KG",
    "LITER",
  ]),
});

export const createDistributionSchema =
  z.object({
    rationCardId: z
      .string()
      .min(1),

    collectedByMemberId: z
      .string()
      .min(1),

    distributionDate: z
      .string()
      .min(1),

    remarks: z.string().optional(),

    items: z
      .array(
        distributionItemSchema
      )
      .min(1),
  });

export const updateDistributionSchema =
  z.object({
    distributionDate:
      z.string().optional(),

    remarks:
      z.string().optional(),

    items: z
      .array(
        distributionItemSchema
      )
      .optional(),
  });