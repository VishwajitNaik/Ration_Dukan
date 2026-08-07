import mongoose from "mongoose";
import { COMMODITIES, UNITS } from "../../config/constants.js";
/**
 * Stock Item Schema
 */
const stockItemSchema = new mongoose.Schema(
  {
    commodity: {
      type: String,
      required: true,
      enum: COMMODITIES,
    },

    receivedQty: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    remainingQty: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    unit: {
      type: String,
      enum: UNITS,
      required: true,
    },
  },
  {
    _id: false,
  }
);

/**
 * Stock Batch Schema
 */
const stockBatchSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
      index: true,
    },

    batchNo: {
      type: String,
      required: true,
      trim: true,
    },

    batchDate: {
      type: Date,
      required: true,
    },

    items: {
      type: [stockItemSchema],
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
 * Unique Batch Number Per Owner
 */
stockBatchSchema.index(
  {
    ownerId: 1,
    batchNo: 1,
  },
  {
    unique: true,
  }
);

/**
 * Batch Date Index
 */
stockBatchSchema.index({
  ownerId: 1,
  batchDate: -1,
});

const StockBatch = mongoose.model(
  "StockBatch",
  stockBatchSchema
);

export default StockBatch;

