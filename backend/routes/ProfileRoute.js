import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/ProfileController.js";

import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Public Route
router.get("/", getProfile);

// Admin Routes
router.post("/", verifyToken, createProfile);
router.put("/", verifyToken, updateProfile);
router.delete("/", verifyToken, deleteProfile);

export default router;