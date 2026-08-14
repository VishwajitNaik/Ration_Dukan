import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  relation: z.string().min(1, "Relation is required"),
  aadhaarNumber: z.string().optional(),
  mobile: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DECEASED"]),
  isHead: z.boolean(),
});

export const rationCardSchema = z.object({
  rcNumber: z.string().min(1, "RC number is required"),

  cardType: z.string().min(1, "Card type is required"),

  category: z.string().min(1, "Category is required"),

  totalUnits: z.coerce.number().min(1),

  remarks: z.string().optional(),

  members: z
    .array(memberSchema)
    .min(1, "At least one member is required"),
});