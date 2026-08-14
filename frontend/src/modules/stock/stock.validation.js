import { z } from "zod";

const stockItemSchema = z.object({
  commodity: z.string(),

  receivedQty: z.coerce
    .number()
    .min(0),

  unit: z.enum([
    "KG",
    "LITER",
  ]),
});

export const stockBatchSchema =
  z.object({
    batchDate: z.string().min(1),

    remarks: z.string().optional(),

    items: z.array(stockItemSchema),
  });