// routes/chatRoutes.js

import express from "express";
import { askGulzar } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", askGulzar);

export default router;