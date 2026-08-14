import mongoose from "mongoose";
import dotenv from "dotenv";

import EntitlementScheme from "./entitlement.model.js";

dotenv.config();

const seed = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await EntitlementScheme.deleteMany({});

    await EntitlementScheme.insertMany([
      {
        cardType: "NPHH",
        commodity: "RICE",
        quantityPerUnit: 3,
        unit: "KG",
        effectiveFrom: new Date("2026-01-01"),
      },
      {
        cardType: "NPHH",
        commodity: "WHEAT",
        quantityPerUnit: 2,
        unit: "KG",
        effectiveFrom: new Date("2026-01-01"),
      },
      {
        cardType: "PHH",
        commodity: "RICE",
        quantityPerUnit: 5,
        unit: "KG",
        effectiveFrom: new Date("2026-01-01"),
      },
      {
        cardType: "AAY",
        commodity: "RICE",
        quantityPerUnit: 35,
        unit: "KG",
        effectiveFrom: new Date("2026-01-01"),
      },
    ]);

    console.log("Entitlement schemes seeded successfully");

  } catch (error) {

    console.error(error);

  } finally {

    await mongoose.disconnect();

    console.log("MongoDB disconnected");

  }
};

seed();