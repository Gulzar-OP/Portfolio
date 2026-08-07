import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "General",
      trim: true,
      index: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    author: {
      type: String,
      default: "Gulzar Hussain",
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    readTime: {
      type: Number,
      default: 1,
      min: 1,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    canonicalUrl: {
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

export default mongoose.model("Blog", blogSchema);