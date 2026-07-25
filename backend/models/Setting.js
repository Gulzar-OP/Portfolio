import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      required: true,
      trim: true,
    },

    siteDescription: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    primaryColor: {
      type: String,
      default: "#2563EB",
    },

    secondaryColor: {
      type: String,
      default: "#0F172A",
    },

    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    seoKeywords: {
      type: [String],
      default: [],
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    footerText: {
      type: String,
      default: "",
    },

    copyrightText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Setting", settingSchema);