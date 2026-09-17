import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


// ==============================
// PROJECT IMAGE STORAGE
// ==============================

const projectStorage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "portfolio_projects",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    transformation: [
      {
        width: 1200,
        crop: "limit",
      },
    ],
  },
});

export const projectUpload = multer({
  storage: projectStorage,
});


// ==============================
// CERTIFICATION STORAGE
// ==============================

const certificationStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "portfolio_certifications",

      // PDF + images dono
      allowed_formats: [
        "pdf",
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      // PDF ke liye useful
      resource_type: "auto",
    };
  },
});

export const certificationUpload = multer({
  storage: certificationStorage,
});