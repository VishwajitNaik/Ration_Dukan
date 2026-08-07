import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },

    relation: {
      type: String,
      enum: [
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
      ],
      required: true,
    },

    aadhaarNumber: {
      type: String,
      // required: true,
      trim: true,
    },

    mobile: {
      type: String,
      default: "",
      trim: true,
    },

    isHead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DECEASED"],
      default: "ACTIVE",
    },
    isDeleted: {
    type: Boolean,
    default: false,
    },

    deletedAt: {
    type: Date,
    default: null,
    },
  },
  {
    _id: true,
    timestamps: false,
  }
);

export default familyMemberSchema;