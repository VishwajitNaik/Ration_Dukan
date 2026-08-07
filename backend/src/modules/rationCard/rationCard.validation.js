import { z } from "zod";

const familyMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  dob: z
    .coerce.date({
      error: "Invalid date of birth",
    })
    .optional(),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    error: "Invalid gender",
  }),

  relation: z.enum([
    "SELF",
    "HUSBAND",
    "WIFE",
    "SON",
    "DAUGHTER",
    "FATHER",
    "MOTHER",
    "BROTHER",
    "SISTER",
    "GRANDFATHER",
    "GRANDMOTHER",
    "OTHER",
  ]),

  aadhaarNumber: z
    .string()
    .trim()
    .regex(/^\d{12}$/, "Aadhaar number must contain exactly 12 digits")
    .optional()
    .or(z.literal("")),

  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number")
    .optional()
    .or(z.literal("")),

  isHead: z.boolean(),

  status: z.enum([
    "ACTIVE",
    "INACTIVE",
    "DECEASED",
  ]),
});

// const familyMemberSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(3, "Name must be at least 3 characters")
//     .max(100, "Name cannot exceed 100 characters"),

//   dob: z.coerce.date({
//     error: "Invalid date of birth",
//   }),

//   gender: z.enum(
//     ["MALE", "FEMALE", "OTHER"],
//     {
//       error: "Invalid gender",
//     }
//   ),

//   relation: z.enum([
//     "SELF",
//     "HUSBAND",
//     "WIFE",
//     "SON",
//     "DAUGHTER",
//     "FATHER",
//     "MOTHER",
//     "BROTHER",
//     "SISTER",
//     "GRANDFATHER",
//     "GRANDMOTHER",
//     "OTHER",
//   ]),

//   aadhaarNumber: z
//     .string()
//     .trim()
//     .regex(/^\d{12}$/, "Aadhaar number must contain exactly 12 digits"),

//   mobile: z
//     .string()
//     .trim()
//     .regex(/^[6-9]\d{9}$/, "Invalid mobile number")
//     .optional()
//     .or(z.literal("")),

//   isHead: z.boolean(),

//   status: z.enum([
//     "ACTIVE",
//     "INACTIVE",
//     "DECEASED",
//   ]),
// });

const rationCardBaseSchema = z.object({
  rcNumber: z.string().trim().min(3).max(30),

  cardType: z.enum([
    "APL",
    "PHH",
    "AAY",
    "NPHH",
  ]),

  category: z.string().trim().optional().default(""),


  cardStatus: z.enum([
    "ACTIVE",
    "INACTIVE",
    "BLOCKED",
    "SUSPENDED",
  ]).default("ACTIVE"),

  remarks: z.string().trim().optional().default(""),

  members: z.array(familyMemberSchema)
    .min(1),
}); 

export const createRationCardSchema =
  rationCardBaseSchema.superRefine((data, ctx) => {

    const headCount = data.members.filter(
      (member) => member.isHead
    ).length;

    if (headCount !== 1) {
      ctx.addIssue({
        code: "custom",
        path: ["members"],
        message:
          "Exactly one family member must be the Head of Family.",
      });
    }

    const head = data.members.find(
      (member) => member.isHead
    );

    if (head && head.relation !== "SELF") {
      ctx.addIssue({
        code: "custom",
        path: ["members"],
        message:
          "Head of Family must have relation SELF.",
      });
    }

    const aadhaarSet = new Set();

    for (const { aadhaarNumber } of data.members) {
  if (!aadhaarNumber) continue;

  if (aadhaarSet.has(aadhaarNumber)) {
    ctx.addIssue({
      code: "custom",
      path: ["members"],
      message:
        "Duplicate Aadhaar numbers are not allowed in the same ration card.",
    });
    break;
  }

  aadhaarSet.add(aadhaarNumber);
}

    // for (const member of data.members) {

    //   if (aadhaarSet.has(member.aadhaarNumber)) {
    //     ctx.addIssue({
    //       code: "custom",
    //       path: ["members"],
    //       message:
    //         "Duplicate Aadhaar numbers are not allowed in the same ration card.",
    //     });

    //     break;
    //   }

    //   aadhaarSet.add(member.aadhaarNumber);
    // }

});

export const updateRationCardSchema = z.object({
  rcNumber: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .optional(),

  cardType: z
    .enum([
      "APL",
      "PHH",
      "AAY",
      "NPHH",
    ])
    .optional(),

  category: z
    .string()
    .trim()
    .optional(),

  cardStatus: z
    .enum([
      "ACTIVE",
      "INACTIVE",
      "BLOCKED",
      "SUSPENDED",
    ])
    .optional(),

  remarks: z
    .string()
    .trim()
    .optional(),
});

export const beneficiaryRegisterSchema = z.object({

  cardStatus: z.enum([
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
    "CANCELLED",
  ]).optional(),

  cardType: z.enum([
    "APL",
    "BPL",
    "AAY",
    "PHH",
    "NPHH",
  ]).optional(),

  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),

  search: z.string().trim().optional(),

  sortBy: z.enum([
    "rcNumber",
    "headOfFamily",
    "createdAt",
  ]).default("rcNumber"),

  sortOrder: z.enum([
    "asc",
    "desc",
  ]).default("asc"),

});

/**
 * Add Family Member Validation
 */
export const addFamilyMemberSchema =
  familyMemberSchema;

export const updateFamilyMemberSchema =
  familyMemberSchema.partial();