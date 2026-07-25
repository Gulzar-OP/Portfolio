import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/ProjectController.js";

import { verifyToken } from "../middleware/AuthMiddleware.js";
import upload from "../middleware/multer.js";
console.log(typeof upload, typeof upload.fields); 
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});
// Public Routes
router.get("/", getAllProjects);
router.get("/slug/:slug", getProjectBySlug);
// router.get("/:id", getProjectById);

router.post("/", verifyToken, (req, res, next) => {
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ])(req, res, (err) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
    next();
  });
}, createProject);
router.get("/:id", getProjectById);
router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProject
);
router.delete("/:id", verifyToken, deleteProject);

export default router;