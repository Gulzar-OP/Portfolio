import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      required: true,
      trim: true,
    },

    grade: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentlyStudying: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
    },

    achievements: {
      type: [String],
      default: [],
    },

    logo: {
      type: String,
      default: "",
    },

    institutionWebsite: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Education", educationSchema);