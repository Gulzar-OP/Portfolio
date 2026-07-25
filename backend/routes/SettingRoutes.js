import express from "express";
import {
  createSetting,
  getSetting,
  updateSetting,
  deleteSetting,
} from "../controllers/SettingController.js";

import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Public
router.get("/", getSetting);

// Admin
router.post("/", verifyToken, createSetting);
router.put("/", verifyToken, updateSetting);
router.delete("/", verifyToken, deleteSetting);

export default router;