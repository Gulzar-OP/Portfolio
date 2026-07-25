import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: String,

    designation: String,

    company: String,

    image: String,

    review: String,

    rating: Number,

    featured: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Testimonial", testimonialSchema);