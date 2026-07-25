import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Programming",
        "DevOps",
        "Cloud",
        "AI/ML",
        "Tools",
        "Other",
      ],
    },

    level: {
      type: Number,
      min: 0,
      max: 100,
    },

    icon: String,

    color: String,

    featured: Boolean,

    order: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Skill", skillSchema);