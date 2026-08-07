import mongoose from "mongoose";

/**
 * Batch Allocation Schema
 * Tracks which stock batch supplied this commodity.
 */
const allocationSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StockBatch",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

/**
 * Distribution Item Schema
 */
const distributionItemSchema = new mongoose.Schema(
  {
    commodity: {
      type: String,
      enum: [
        "RICE",
        "WHEAT",
        "SUGAR",
        "TUR_DAL",
        "CHANA_DAL",
        "PALM_OIL",
        "SALT",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      enum: [
        "KG",
        "LITER",
      ],
      required: true,
    },

    allocations: {
      type: [allocationSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

/**
 * Distribution Schema
 */
const distributionSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
      index: true,
    },

    rationCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RationCard",
      required: true,
      index: true,
    },
    distributedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",   // or Owner
    required: true
    },
    collectedBy: {
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RationCardMember",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  relation: {
    type: String,
    required: true,
    trim: true,
  },
},

    distributionDate: {
      type: Date,
      required: true,
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    items: {
      type: [distributionItemSchema],
      required: true,
      default: [],
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate monthly distribution
 */
// distributionSchema.index(
//   {
//     ownerId: 1,
//     rationCardId: 1,
//     month: 1,
//     year: 1,
//     isDeleted: 1,
//   },
//   {
//     unique: true,
//   }
// );

distributionSchema.index(
  {
    ownerId: 1,
    rationCardId: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

const Distribution = mongoose.model(
  "Distribution",
  distributionSchema
);

export default Distribution;