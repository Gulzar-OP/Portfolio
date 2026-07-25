import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    platform: String,

    url: String,

    username: String,

    icon: String,

    order: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SocialLink", socialLinkSchema);