import express from "express";
import {
  getResume,
  getAllResumes,
  createResume,
  updateResume,
  deleteResume,
  setActiveResume,
} from "../controllers/ResumeController.js";

const router = express.Router();

router.get("/", getResume);              // Public
router.get("/all", getAllResumes);       // Admin
router.post("/", createResume);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);
router.patch("/active/:id", setActiveResume);

export default router;