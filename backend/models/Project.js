// File: models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    images: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["Web", "Mobile", "AI", "ML", "Desktop", "Other"],
      default: "Web",
    },
    technologies: { type: [String], default: [] },
    github: { type: String, default: "" },
    liveDemo: { type: String, default: "" },
    figma: { type: String, default: "" },
    videoDemo: { type: String, default: "" },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    learnings: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["Completed", "In Progress"], default: "Completed" },
    startDate: { type: Date, default: null },
    completionDate: { type: Date, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);