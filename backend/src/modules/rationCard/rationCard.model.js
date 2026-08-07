import mongoose from "mongoose";
import familyMemberSchema from "./familyMember.schema.js";

const rationCardSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
      index: true,
    },

    rcNumber: {
      type: String,
      required: true,
      trim: true,
    },

    cardType: {
      type: String,
      enum: ["APL", "PHH", "AAY", "NPHH"],
      required: true,
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    totalUnits: {
      type: Number,
      required: true,
      min: 1,
    },

    cardStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLOCKED", "SUSPENDED"],
      default: "ACTIVE",
    },

    members: {
        type: [familyMemberSchema],
        default: [],
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Compound Index
 * One owner cannot have duplicate RC Numbers.
 */
rationCardSchema.index(
  {
    ownerId: 1,
    rcNumber: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);
/**
 * Remove Internal Fields
 */
rationCardSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

rationCardSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const RationCard = mongoose.model(
  "RationCard",
  rationCardSchema
);

export default RationCard;