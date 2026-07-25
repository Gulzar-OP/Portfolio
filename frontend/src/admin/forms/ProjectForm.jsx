// File: components/ProjectForm.jsx
import React, { useState } from "react";

const Field = ({ label, className = "", children }) => (
  <div className={className}>
    <label className="mb-2 block text-sm font-medium text-gray-300">{label}</label>
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

const FileInput = ({ multiple = false, ...props }) => (
  <input
    {...props}
    type="file"
    multiple={multiple}
    accept="image/*"
    className="w-full rounded-2xl border border-dashed border-white/20 bg-black/20 px-4 py-3 text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-white hover:border-violet-500"
  />
);

export default function ProjectForm({ setOpenModal }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const technologies = form.elements.technologies?.value || "";
      formData.delete("technologies");
      technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => formData.append("technologies", item));

      const thumbnailInput = form.elements.thumbnail;
      if (thumbnailInput?.files?.[0]) {
        formData.set("thumbnail", thumbnailInput.files[0]);
      }

      const imagesInput = form.elements.images;
      if (imagesInput?.files?.length) {
        formData.delete("images");
        Array.from(imagesInput.files).forEach((file) => formData.append("images", file));
      }

      // const res = await fetch("http://localhost:2000/api/v1/projects", {
      //   method: "POST",
      //   credentials: "include",
      //   body: formData,
      // });
      const res = await fetch("http://localhost:2000/api/v1/projects", {
  method: "POST",
  credentials: "include",
  body: formData,
});

const text = await res.text();
console.log("Status:", res.status);
console.log("Response:", text);

if (!res.ok) {
  throw new Error(text);
}

      const data = await res.json();
      // const text = await res.text();
console.log(text);
      if (!res.ok) throw new Error(data.message || "Failed to save project");

      setOpenModal(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex max-h-[85vh] min-h-0 flex-col overflow-hidden rounded-3xl bg-slate-950 p-4 sm:p-5"
    >
      <div className="flex-1 overflow-y-auto pr-1 sm:pr-2">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <Field label="Title" className="md:col-span-2">
            <Input name="title" placeholder="Project title" required />
          </Field>

          <Field label="Short Description" className="md:col-span-2">
            <Input name="shortDescription" placeholder="One-line summary" required />
          </Field>

          <Field label="Description" className="md:col-span-2">
            <Textarea name="description" rows="4" placeholder="Full project description" required />
          </Field>

          <Field label="Category">
            <Select name="category" options={["Web", "Mobile", "AI", "ML", "Desktop", "Other"]} />
          </Field>

          <Field label="Status">
            <Select name="status" options={["Completed", "In Progress"]} />
          </Field>

          <Field label="Thumbnail">
            <FileInput name="thumbnail" />
          </Field>

          <Field label="Images">
            <FileInput name="images" multiple />
          </Field>

          <Field label="Technologies" className="md:col-span-2">
            <Input name="technologies" placeholder="React, Node.js, MongoDB" />
          </Field>

          <Field label="GitHub URL" className="md:col-span-2">
            <Input name="github" placeholder="https://github.com/..." />
          </Field>

          <Field label="Live Demo URL" className="md:col-span-2">
            <Input name="liveDemo" placeholder="https://..." />
          </Field>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 mt-4 flex items-center justify-end gap-3 border-t border-white/10 bg-slate-950 pt-4">
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}