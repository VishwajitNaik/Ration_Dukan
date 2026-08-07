import { z } from "zod";

export const dashboardSchema = z.object({

  /**
   * Low Stock Threshold
   */
  threshold: z.coerce
    .number()
    .int()
    .min(1)
    .default(100),

  /**
   * Recent Transactions
   */
  recentLimit: z.coerce
    .number()
    .int()
    .min(1)
    .max(20)
    .default(5),

});