import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/BlogController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createBlog);

router.get("/", getAllBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);

router.put("/:id",upload.single('thumbnail'), updateBlog);

router.delete("/:id", deleteBlog);

export default router;