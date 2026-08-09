import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // Complete Project Documentation (Markdown)
    content: {
      type: String,
      required: true,
    },

    // Images
    thumbnail: {
      type: String,
      default: "",
    },

    gallery: {
      type: [String],
      default: [],
    },

    // Project Category
    category: {
      type: String,
      enum: [
        "Web",
        "Mobile",
        "Frontend",
        "Backend",
        "Full Stack",
        "AI",
        "ML",
        "Desktop",
        "Other",
      ],
      default: "Web",
    },

    // Technologies Used
    technologies: {
      type: [String],
      default: [],
    },

    // Tags
    tags: {
      type: [String],
      default: [],
    },

    // Links
    githubFrontend: {
      type: String,
      default: "",
    },

    githubBackend: {
      type: String,
      default: "",
    },

    liveDemo: {
      type: String,
      default: "",
    },

    figma: {
      type: String,
      default: "",
    },

    videoDemo: {
      type: String,
      default: "",
    },

    // Project Info
    featured: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
      default: [],
    },

    learnings: {
      type: [String],
      default: [],
    },
    challenges: [
      {
        problem: {
          type: String,
          required: true,
          trim: true,
        },
        solution: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Completed", "In Progress", "Archived"],
      default: "Completed",
    },

    // SEO
    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    // Statistics
    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    // Display Order
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);