import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: String,

    icon: String,

    description: String,

    features: [String],

    order: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);