import Certification from "../models/Certification.js";

// ===================================
// Create Certification
// ===================================
export const createCertification = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const certification = await Certification.create({
      title: req.body.title,
      issuer: req.body.issuer,
      issueDate: req.body.issueDate,

      doesNotExpire:
        req.body.doesNotExpire === "true",

      credentialID:
        req.body.credentialID || "",

      credentialURL:
        req.body.credentialURL || "",

      description:
        req.body.description || "",

      order:
        Number(req.body.order) || 0,

      featured:
        req.body.featured === "true",

      // Cloudinary URL
      image: req.file?.path || "",
    });

    res.status(201).json({
      success: true,
      message:
        "Certification added successfully.",
      certification,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===================================
// Get All Certifications
// ===================================
export const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: certifications.length,
      certifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get Single Certification
// ===================================
export const getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found.",
      });
    }

    res.status(200).json({
      success: true,
      certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Update Certification
// ===================================
export const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certification updated successfully.",
      certification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Delete Certification
// ===================================
export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found.",
      });
    }

    await certification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};