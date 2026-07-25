import React from "react";

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

export default function BlogForm({ setOpenModal }) {
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  try {
    const res = await fetch("http://localhost:2000/api/v1/blogs", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    console.log(res.status);
    console.log(data);

    if (!res.ok) {
      return alert(data.message || "Failed to save blog");
    }

    alert("Blog Saved Successfully");
    setOpenModal(false);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit} encType="multipart/form-data">
      <Field label="Title" className="md:col-span-2">
        <Input name="title" placeholder="Blog title" />
      </Field>

      <Field label="Slug">
        <Input name="slug" placeholder="blog-title" />
      </Field>

      <Field label="Category">
        <Input name="category" placeholder="Tech / Life / Dev" />
      </Field>

      <Field label="Excerpt" className="md:col-span-2">
        <Textarea name="excerpt" rows="3" placeholder="Short summary" />
      </Field>

      <Field label="Content" className="md:col-span-2">
        <Textarea name="content" rows="6" placeholder="Write your blog content..." />
      </Field>

      <div className="md:col-span-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Save Blog
        </button>
      </div>
    </form>
  );
}