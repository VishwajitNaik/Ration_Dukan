import { z } from "zod";

export const monthlyGovernmentReportSchema =
  z.object({

    month: z.coerce
      .number()
      .int()
      .min(1, "Month must be between 1 and 12.")
      .max(12, "Month must be between 1 and 12."),

    year: z.coerce
      .number()
      .int()
      .min(2020, "Invalid year.")
      .max(2100, "Invalid year."),

    format: z
      .enum([
        "JSON",
        "PDF",
        "EXCEL",
      ])
      .default("JSON"),

  });