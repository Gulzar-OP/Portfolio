// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = path.join(process.cwd(), "uploads");

// // agar folder exist nahi karta toh bana do
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // filename mein commas, colons, spaces sanitize karna zaroori hai
//     const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
//     cb(null, unique + "-" + safeName);
//   },
// });

// const upload = multer({ storage });

// export default upload;


// middleware/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_projects", // Cloudinary pe folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, crop: "limit" }], // optional optimization
  },
});

const upload = multer({ storage });

export default upload;