import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },

    password: {
      type: String,
      required: true,
    },

    location: {
      district: {
        type: String,
        required: true,
        trim: true,
      },

      taluka: {
        type: String,
        required: true,
        trim: true,
      },

      village: {
        type: String,
        required: true,
        trim: true,
      },

    pincode: {
        type: String,
        default: "",
        trim: true,
    },

      address: {
        type: String,
        default: "",
        trim: true,
      },
    },

    role: {
      type: String,
      enum: ["OWNER"],
      default: "OWNER",
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

ownerSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

ownerSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;