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

const router = express.Router();

// Public Routes

router.get("/", getAllProjects);

router.get("/slug/:slug", getProjectBySlug);

router.get("/:id", getProjectById);

// Protected Routes

router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createProject
);

router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProject
);

router.delete("/:id", verifyToken, deleteProject);

export default router;