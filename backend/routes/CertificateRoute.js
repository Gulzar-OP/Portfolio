import express from "express";
import {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
} from "../controllers/CertificateController.js";

import {
  certificationUpload,
} from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  certificationUpload.single("image"),
  createCertification
);
router.get("/", getAllCertifications);
router.get("/:id", getCertificationById);
router.put("/:id", updateCertification);
router.delete("/:id", deleteCertification);

export default router;
