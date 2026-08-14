import { z } from "zod";

const commodityEnum = [
  "RICE",
  "WHEAT",
  "SUGAR",
  "TUR_DAL",
  "CHANA_DAL",
  "PALM_OIL",
  "SALT",
];

const cardTypeEnum = [
  "PHH",
  "AAY",
  "NPHH",
];

export const createEntitlementSchemeSchema =
  z.object({
    cardType: z.enum(cardTypeEnum),

    commodity: z.enum(commodityEnum),

    quantityPerUnit: z
      .number()
      .positive(
        "Quantity must be greater than zero"
      ),

    unit: z.enum(["KG", "LITER"]),

    effectiveFrom: z.coerce.date(),

    effectiveTo: z
      .coerce
      .date()
      .nullable()
      .optional(),

    isActive: z.boolean().optional(),
  });

export const updateEntitlementSchemeSchema =
  createEntitlementSchemeSchema.partial();