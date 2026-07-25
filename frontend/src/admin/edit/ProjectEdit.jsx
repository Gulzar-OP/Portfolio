
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

  const API = import.meta.env.VITE_API || "http://localhost:2000"

const Field = ({ label, className = "", children }) => (
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

const Select = ({ options = [], ...props }) => (
  <select
    {...props}
    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-violet-500"
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export default function ProjectEdit() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // previews
  const [imagesFiles, setImagesFiles] = useState([]); // File[]
  const [thumbnailFile, setThumbnailFile] = useState(null); // File
  const [imagesPreview, setImagesPreview] = useState([]); // URL[]
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // URL

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    // generate previews for selected files
    if (imagesFiles && imagesFiles.length) {
      const urls = imagesFiles.map((f) => URL.createObjectURL(f));
      setImagesPreview(urls);
      return () => urls.forEach((u) => URL.revokeObjectURL(u));
    }
    // if no local files, keep existing previews from project.images (server URLs)
    if (project && project.images && Array.isArray(project.images)) {
      setImagesPreview(project.images);
    } else {
      setImagesPreview([]);
    }
  }, [imagesFiles, project]);

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (project && project.thumbnail) {
      setThumbnailPreview(project.thumbnail);
    } else {
      setThumbnailPreview("");
    }
  }, [thumbnailFile, project]);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/projects/${projectId}`);

      setProject({
        ...data.project,
        technologies: Array.isArray(data.project.technologies)
          ? data.project.technologies.join(", ")
          : "",
      });

      // if server returns images as array or single string, set previews
      if (data.project.images) {
        setImagesPreview(Array.isArray(data.project.images) ? data.project.images : [data.project.images]);
      }
      if (data.project.thumbnail) {
        setThumbnailPreview(data.project.thumbnail);
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load project");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImagesFiles(files);
    // also store filenames or placeholder in project state if desired
    setProject((prev) => ({
      ...prev,
      images: files, // keep files to detect change on submit
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setThumbnailFile(file);
    setProject((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // prepare technologies array
      const techs = String(project.technologies)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      // If there are File objects to upload, use FormData
      const hasFiles = (imagesFiles && imagesFiles.length) || thumbnailFile;

      if (hasFiles) {
        const form = new FormData();

        // append regular fields
        const skipKeys = ["images", "thumbnail"]; // because handled separately
        Object.keys(project).forEach((key) => {
          if (skipKeys.includes(key)) return;
          let val = project[key];
          if (key === "technologies") val = JSON.stringify(techs);
          if (typeof val === "boolean" || typeof val === "number" || typeof val === "string") {
            form.append(key, val);
          } else if (val == null) {
            // skip null/undefined
          } else {
            form.append(key, JSON.stringify(val));
          }
        });

        // append images files
        if (imagesFiles && imagesFiles.length) {
          imagesFiles.forEach((file) => form.append("images", file));
        }

        // append thumbnail
        if (thumbnailFile) {
          form.append("thumbnail", thumbnailFile);
        }

        await axios.put(`${URI}/${projectId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // no files — send JSON
        const payload = {
          ...project,
          technologies: techs,
        };

        await axios.put(`${URI}/${projectId}`, payload);
      }

      alert("Project updated successfully.");
      navigate("/dashboard/projects");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Project</h1>
            <p className="text-gray-400">Update your project details.</p>
          </div>

          <button
            onClick={() => navigate("/dashboard/projects")}
            className="rounded-xl border border-white/10 px-4 py-2 text-white hover:bg-white/10"
          >
            Back
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-500/10 p-3 text-red-400">{error}</div>
        )}

        <form onSubmit={handleEdit} className="grid gap-5 md:grid-cols-2">
          <Field label="Images" className="md:col-span-2">
            <input
              name="images"
              onChange={handleFilesChange}
              type="file"
              multiple
            />
            <div className="mt-3 flex flex-wrap gap-3">
              {imagesPreview && imagesPreview.length ? (
                imagesPreview.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="h-24 w-32 rounded-md object-cover border border-white/10"
                  />
                ))
              ) : (
                <div className="text-gray-400">No images</div>
              )}
            </div>
          </Field>

          <Field label="Thumbnail" className="md:col-span-2">
            <input name="thumbnail" onChange={handleThumbnailChange} type="file" />
            <div className="mt-3">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="thumbnail-preview"
                  className="h-28 w-48 rounded-md object-cover border border-white/10"
                />
              ) : (
                <div className="text-gray-400">No thumbnail</div>
              )}
            </div>
          </Field>

          {/* rest of form unchanged: Title, Slug, Category, etc. */}
          <Field label="Title" className="md:col-span-2">
            <Input name="title" value={project.title} onChange={handleChange} />
          </Field>

          <Field label="Slug">
            <Input name="slug" value={project.slug} onChange={handleChange} />
          </Field>

          <Field label="Category">
            <Select
              name="category"
              value={project.category}
              onChange={handleChange}
              options={["Web", "Mobile", "AI", "ML", "Desktop", "Other"]}
            />
          </Field>

          <Field label="Status">
            <Select
              name="status"
              value={project.status}
              onChange={handleChange}
              options={["Completed", "In Progress"]}
            />
          </Field>

          <Field label="Order">
            <Input type="number" name="order" value={project.order} onChange={handleChange} />
          </Field>

          <Field label="Short Description" className="md:col-span-2">
            <Input name="shortDescription" value={project.shortDescription} onChange={handleChange} />
          </Field>

          <Field label="Description" className="md:col-span-2">
            <Textarea rows={5} name="description" value={project.description} onChange={handleChange} />
          </Field>

          <Field label="Technologies" className="md:col-span-2">
            <Input name="technologies" value={project.technologies} onChange={handleChange} />
          </Field>

          <Field label="GitHub URL" className="md:col-span-2">
            <Input name="github" value={project.github} onChange={handleChange} />
          </Field>

          <Field label="Live Demo URL" className="md:col-span-2">
            <Input name="liveDemo" value={project.liveDemo} onChange={handleChange} />
          </Field>

          <Field label="Figma URL" className="md:col-span-2">
            <Input name="figma" value={project.figma} onChange={handleChange} />
          </Field>

          <Field label="Video Demo URL" className="md:col-span-2">
            <Input name="videoDemo" value={project.videoDemo} onChange={handleChange} />
          </Field>

          <div className="md:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="featured" name="featured" checked={project.featured} onChange={handleChange} />
            <label htmlFor="featured" className="text-white">Featured Project</label>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-5">
            <button type="button" onClick={() => navigate("/dashboard/projects")} className="rounded-xl border border-white/10 px-6 py-3 text-white hover:bg-white/10">
              Cancel
            </button>

            <button disabled={loading} type="submit" className="rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-500">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}