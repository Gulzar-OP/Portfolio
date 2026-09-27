import express from "express";
import { deleteMsg, getAllMSG, sendMsg } from "../controllers/msgController.js";

const router = express.Router();

router.post("/", sendMsg);
router.get("/",getAllMSG);
router.delete("/:id",deleteMsg);

export default router;