import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortBio: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    availableForWork: {
      type: Boolean,
      default: true,
    },

    yearsExperience: {
      type: Number,
      default: 0,
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    leetcode: {
      type: String,
      default: "",
    },

    codeforces: {
      type: String,
      default: "",
    },

    gfg: {
      type: String,
      default: "",
    },

    nationality: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);