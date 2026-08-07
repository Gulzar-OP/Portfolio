import Blog from "../models/Blog.js";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      published,
      featured,
      seoTitle,
      seoDescription,
      order,
    } = req.body;
    let tags = req.body.tags;

    if (typeof tags === "string") {
        tags = tags.split(",").map(tag => tag.trim());
    }

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists.",
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: Array.isArray(tags)
  ? tags.filter(Boolean)
  : [],
      published: published === "true" || published === true,
      featured: featured === "true" || featured === true,
      seoTitle,
      seoDescription,
      order: order ? Number(order) : 0,
      thumbnail: req.file ? req.file.path : "",
      publishedAt: published === "true" || published === true ? new Date() : null,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Blog By ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Blog By Slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    const published =
      req.body.published !== undefined
        ? req.body.published === "true" || req.body.published === true
        : blog.published;

    const updateData = {
      title: req.body.title ?? blog.title,
      slug: req.body.slug ?? blog.slug,
      excerpt: req.body.excerpt ?? blog.excerpt,
      content: req.body.content ?? blog.content,
      category: req.body.category ?? blog.category,
      featured:
        req.body.featured !== undefined
          ? req.body.featured === "true" || req.body.featured === true
          : blog.featured,
      published,
      order:
        req.body.order !== undefined ? Number(req.body.order) : blog.order,
      seoTitle: req.body.seoTitle ?? blog.seoTitle,
      seoDescription: req.body.seoDescription ?? blog.seoDescription,
    };

    if (req.body.tags !== undefined) {
      updateData.tags = Array.isArray(req.body.tags)
        ? req.body.tags
        : String(req.body.tags)
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    updateData.publishedAt =
      published && !blog.publishedAt ? new Date() : published ? blog.publishedAt : null;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      blog: updatedBlog,
    });
  } catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};
// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};