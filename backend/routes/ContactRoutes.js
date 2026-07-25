import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  markAsRead,
  markAsReplied,
  deleteContact,
} from "../controllers/ContactController.js";

const router = express.Router();

// Create Contact Message
router.post("/", createContact);

// Get All Contact Messages
router.get("/", getAllContacts);

// Get Single Contact Message
router.get("/:id", getContactById);

// Mark Message as Read
router.patch("/:id/read", markAsRead);

// Mark Message as Replied
router.patch("/:id/replied", markAsReplied);

// Delete Contact Message
router.delete("/:id", deleteContact);

export default router;