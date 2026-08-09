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

  try {
    const {
      title,
      slug,
      shortDescription,
      content,

      category,

      githubFrontend,
      githubBackend,

      liveDemo,
      figma,
      videoDemo,

      featured,
      status,

      seoTitle,
      seoDescription,

      features,
      learnings,
      challenges,

      order,
    } = req.body;

    // Check duplicate slug
    const existingProject = await Project.findOne({
      slug: slug?.trim() || createSlug(title),
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists.",
      });
    }

    const projectData = {
      title,
      slug: slug?.trim() || createSlug(title),

      shortDescription,
      content,

      category,

      technologies: toArray(req.body.technologies),
      tags: toArray(req.body.tags),

      githubFrontend: githubFrontend || "",
      githubBackend: githubBackend || "",

      liveDemo: liveDemo || "",
      figma: figma || "",
      videoDemo: videoDemo || "",

      featured: featured === "true" || featured === true,

      status: status || "Completed",

      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",

      order: Number(order) || 0,

      thumbnail: "",
      gallery: [],
      features,
      learnings,
      challenges
    };

    // Thumbnail Upload
    if (req.files?.thumbnail?.[0]) {
      projectData.thumbnail = req.files.thumbnail[0].path;
    }

    // Gallery Upload
    if (req.files?.gallery?.length) {
      projectData.gallery = req.files.gallery.map((file) => file.path);
    }

    const project = await Project.create(projectData);

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Projects
// =====================================
export const getAllProjects = async (req, res) => {
  try {
    const filter = {};

    // Featured Filter
    if (req.query.featured === "true") {
      filter.featured = true;
    }

    // Published Filter
    if (req.query.published) {
      filter.published = req.query.published === "true";
    }

    // Category Filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Status Filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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

    // Technologies
    if (
      projectData.technologies &&
      typeof projectData.technologies === "string"
    ) {
      try {
        projectData.technologies = JSON.parse(projectData.technologies);
      } catch {
        projectData.technologies = toArray(projectData.technologies);
      }
    }

    // Tags
    if (projectData.tags) {
      projectData.tags = toArray(projectData.tags);
    }

    // Featured
    if (typeof projectData.featured === "string") {
      projectData.featured = projectData.featured === "true";
    }

    // Order
    if (projectData.order !== undefined) {
      projectData.order = Number(projectData.order);
    }

    // Thumbnail
    if (req.files?.thumbnail?.[0]) {
      projectData.thumbnail = req.files.thumbnail[0].path;
    }

    // Gallery
    if (req.files?.gallery?.length) {
      projectData.gallery = req.files.gallery.map((file) => file.path);
    }

    // Prevent accidental overwrite
    if (
      !req.files?.thumbnail?.[0] &&
      projectData.thumbnail &&
      typeof projectData.thumbnail !== "string"
    ) {
      delete projectData.thumbnail;
    }

    if (
      !req.files?.gallery?.length &&
      projectData.gallery &&
      !Array.isArray(projectData.gallery) &&
      typeof projectData.gallery !== "string"
    ) {
      delete projectData.gallery;
    }

    // Slug
    if (!projectData.slug && projectData.title) {
      projectData.slug = createSlug(projectData.title);
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectData },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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

    // =========================
    // Delete Thumbnail
    // =========================
    try {
      if (project.thumbnail) {
        const publicId = getPublicIdFromUrl(project.thumbnail);

        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // =========================
      // Delete Gallery Images
      // =========================
      if (project.gallery?.length) {
        await Promise.all(
          project.gallery.map(async (imageUrl) => {
            const publicId = getPublicIdFromUrl(imageUrl);

            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          })
        );
      }
    } catch (cleanupError) {
      console.error(
        "Cloudinary cleanup failed:",
        cleanupError.message
      );

      // Database delete phir bhi continue karega
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};