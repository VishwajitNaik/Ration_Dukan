import { z } from "zod";

export const registerOwnerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  shopName: z
    .string()
    .trim()
    .min(3, "Shop name must be at least 3 characters")
    .max(150, "Shop name cannot exceed 150 characters"),

  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

email: z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().email("Invalid email address").optional()
),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters"),

  location: z.object({
    state: z
      .string()
      .trim()
      .min(2, "State is required"),

    district: z
      .string()
      .trim()
      .min(2, "District is required"),

    taluka: z
      .string()
      .trim()
      .min(2, "Taluka is required"),

    village: z
      .string()
      .trim()
      .min(2, "Village is required"),

    pincode: z
      .string()
      .regex(/^\d{6}$/, "Invalid pincode"),

    address: z
      .string()
      .trim()
      .min(5, "Address is required"),
  }),
});