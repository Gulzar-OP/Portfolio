import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: String,

    position: String,

    employmentType: String,

    location: String,

    startDate: Date,

    endDate: Date,

    currentlyWorking: Boolean,

    description: String,

    responsibilities: [String],

    technologies: [String],

    companyLogo: String,

    companyWebsite: String,

    order: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Experience", experienceSchema);