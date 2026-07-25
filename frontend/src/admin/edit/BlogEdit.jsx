import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

  const API = import.meta.env.VITE_API || "http://localhost:2000"

const Field = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      {label}
    </label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
  />
);

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

const [blog, setBlog] = React.useState({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  thumbnail: "",
  featured: false,
  published: false,
});

  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [thumbnailFile, setThumbnailFile] = React.useState(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState("");

  React.useEffect(() => {
    const fetchBlog = async () => {
      try {
        setPageLoading(true);
        const { data } = await axios.get(`${API}/api/v1/blogs/${id}`);
        console.log(data);
        const b = data?.blog || {};

        const nextBlog = {
          title: b.title || "",
          slug: b.slug || "",
          excerpt: b.excerpt || "",
          content: b.content || "",
          category: b.category || "",
          tags: Array.isArray(b.tags) ? b.tags.join(", ") : "",
          thumbnail: b.thumbnail || "",
          featured: !!b.featured,
          published: !!b.published,
        };

        setBlog(nextBlog);
        setThumbnailPreview(nextBlog.thumbnail);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load blog");
      } finally {
        setPageLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  React.useEffect(() => {
    if (!thumbnailFile) return;
    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const form = new FormData();
      form.append("title", blog.title);
      form.append("slug", blog.slug);
      form.append("excerpt", blog.excerpt);
      form.append("content", blog.content);
      form.append("category", blog.category);
      form.append("featured", blog.featured ? "true" : "false");
      form.append(
        "tags",
        String(blog.tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .join(",")
      );

      if (thumbnailFile) form.append("thumbnail", thumbnailFile);

      await axios.put(`${API}/api/v1/blogs/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard/blogs");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Blog</h1>
            <p className="text-gray-400">Update blog details and thumbnail.</p>
          </div>
          <button
            onClick={() => navigate("/dashboard/blogs")}
            className="rounded-xl border border-white/10 px-4 py-2 text-white hover:bg-white/10"
          >
            Back
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 p-3 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <Field label="Thumbnail">
            <input type="file" accept="image/*" onChange={handleThumbnailChange} />
            <div className="mt-3">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="thumbnail-preview"
                  className="h-40 w-full rounded-md border border-white/10 object-cover"
                />
              ) : (
                <div className="text-gray-400">No thumbnail</div>
              )}
            </div>
          </Field>

          <Field label="Title">
            <Input name="title" value={blog.title} onChange={handleChange} />
          </Field>

          <Field label="Slug">
            <Input name="slug" value={blog.slug} onChange={handleChange} />
          </Field>

          <Field label="Excerpt">
            <Input name="excerpt" value={blog.excerpt} onChange={handleChange} />
          </Field>

          <Field label="Category">
            <Input name="category" value={blog.category} onChange={handleChange} />
          </Field>

          <Field label="Tags">
            <Input name="tags" value={blog.tags} onChange={handleChange} />
          </Field>

          <Field label="Content">
            <Textarea name="content" rows={8} value={blog.content} onChange={handleChange} />
          </Field>

          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              name="featured"
              checked={blog.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured" className="text-white">
              Featured
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard/blogs")}
              className="rounded-xl border border-white/10 px-5 py-2 text-white hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2 text-white hover:bg-violet-500"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}