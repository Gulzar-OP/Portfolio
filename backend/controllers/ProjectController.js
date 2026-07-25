import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// =====================================
// Helpers
// =====================================

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// Cloudinary public_id nikaalta hai poore URL se, taaki delete kar sakein
const getPublicIdFromUrl = (url = "") => {
  try {
    // example: https://res.cloudinary.com/<cloud>/image/upload/v12345/portfolio_projects/abcxyz.png
    const parts = url.split("/upload/")[1]; // "v12345/portfolio_projects/abcxyz.png"
    if (!parts) return null;
    const withoutVersion = parts.split("/").slice(1).join("/"); // "portfolio_projects/abcxyz.png"
    return withoutVersion.replace(/\.[^/.]+$/, ""); // extension hatao
  } catch {
    return null;
  }
};

// =====================================
// Create Project
// =====================================
export const createProject = async (req, res) => {
    console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  try {
    const {
      title,
      slug,
      shortDescription,
      description,
      category,
      github,
      liveDemo,
      figma,
      videoDemo,
      featured,
      status,
      startDate,
      completionDate,
      order,
    } = req.body;

    const projectData = {
      title,
      slug: slug?.trim() || createSlug(title),
      shortDescription,
      description,
      category,
      technologies: toArray(req.body.technologies),
      github: github || "",
      liveDemo: liveDemo || "",
      figma: figma || "",
      videoDemo: videoDemo || "",
      features: toArray(req.body.features),
      challenges: toArray(req.body.challenges),
      learnings: toArray(req.body.learnings),
      featured: featured === "true",
      status: status || "Completed",
      startDate: startDate || null,
      completionDate: completionDate || null,
      order: order ? Number(order) : 0,
      thumbnail: "",
      images: [],
    };

    // Cloudinary storage: file.path mein full hosted URL milta hai
    if (req.files?.thumbnail?.[0]) {
      projectData.thumbnail = req.files.thumbnail[0].path;
    }

    if (req.files?.images?.length) {
      projectData.images = req.files.images.map((file) => file.path);
    }

    const project = await Project.create(projectData);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =====================================
// Get All Projects
// =====================================
export const getAllProjects = async (req, res) => {
  try {
    const filter = {};

    if (req.query.featured === "true") {
      filter.featured = true;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Project By ID
// =====================================
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.json({ success: true, project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =====================================
// Get Project By Slug
// =====================================
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Project
// =====================================
export const updateProject = async (req, res) => {
  try {
    const projectData = { ...req.body };

    // technologies FormData se string ban ke aata hai, JSON parse karo
    if (projectData.technologies && typeof projectData.technologies === "string") {
      try {
        projectData.technologies = JSON.parse(projectData.technologies);
      } catch {
        projectData.technologies = toArray(projectData.technologies);
      }
    }

    // features/challenges/learnings agar bheje ja rahe hain toh unhe bhi normalize karo
    if (projectData.features) projectData.features = toArray(projectData.features);
    if (projectData.challenges) projectData.challenges = toArray(projectData.challenges);
    if (projectData.learnings) projectData.learnings = toArray(projectData.learnings);

    // agar "true"/"false" string aayi hai featured ke liye
    if (typeof projectData.featured === "string") {
      projectData.featured = projectData.featured === "true";
    }

    if (projectData.order) projectData.order = Number(projectData.order);

    // Naya thumbnail aaya hai — Cloudinary full URL file.path mein hai
    if (req.files?.thumbnail?.[0]) {
      projectData.thumbnail = req.files.thumbnail[0].path;
    }

    // Nayi images aayi hain
    if (req.files?.images?.length) {
      projectData.images = req.files.images.map((file) => file.path);
    }

    // Frontend files ko project.images / project.thumbnail mein bhi bhej sakta hai
    // (jab koi naya file select nahi hua) — un fields ko galti se overwrite hone se bachao
    if (!req.files?.thumbnail?.[0] && projectData.thumbnail && typeof projectData.thumbnail !== "string") {
      delete projectData.thumbnail;
    }
    if (!req.files?.images?.length && projectData.images && typeof projectData.images !== "string" && !Array.isArray(projectData.images)) {
      delete projectData.images;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Project
// =====================================
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // Cloudinary se bhi images/thumbnail delete kar do (cleanup)
    try {
      if (project.thumbnail) {
        const publicId = getPublicIdFromUrl(project.thumbnail);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      if (project.images?.length) {
        await Promise.all(
          project.images.map((imgUrl) => {
            const publicId = getPublicIdFromUrl(imgUrl);
            return publicId ? cloudinary.uploader.destroy(publicId) : null;
          })
        );
      }
    } catch (cleanupErr) {
      console.error("Cloudinary cleanup failed:", cleanupErr.message);
      // delete continue karega even if cloudinary cleanup fail ho
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};