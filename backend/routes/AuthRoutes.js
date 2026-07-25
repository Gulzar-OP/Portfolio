import express from "express";
import {
  register,
  login,
  logout,
  me,
} from "../controllers/AuthController.js";

import { isAuthenticated } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated,me)

export default router;