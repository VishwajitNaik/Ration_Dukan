import mongoose from "mongoose";

const entitlementSchemeSchema =
  new mongoose.Schema(
    {
      cardType: {
        type: String,
        enum: ["PHH", "AAY", "NPHH"],
        required: true,
      },

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

      quantityPerUnit: {
        type: Number,
        required: true,
        min: 0,
      },

      unit: {
        type: String,
        enum: ["KG", "LITER"],
        required: true,
      },

      effectiveFrom: {
        type: Date,
        required: true,
      },

      effectiveTo: {
        type: Date,
        default: null,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

entitlementSchemeSchema.index({
  cardType: 1,
  commodity: 1,
  effectiveFrom: 1,
});

const EntitlementScheme =
  mongoose.model(
    "EntitlementScheme",
    entitlementSchemeSchema
  );

export default EntitlementScheme;