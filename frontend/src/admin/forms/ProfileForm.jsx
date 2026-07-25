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

export default function ProfileForm({ setOpenModal }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch("http://localhost:2000/api/v1/profile", {
      method: "PUT",
      body: formData,
    });
    setOpenModal(false);
  };

  return (
    <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit} encType="multipart/form-data">
      <Field label="Name" className="md:col-span-2">
        <Input name="name" placeholder="Your name" />
      </Field>

      <Field label="Tagline" className="md:col-span-2">
        <Input name="tagline" placeholder="Full Stack Developer" />
      </Field>

      <Field label="Bio" className="md:col-span-2">
        <Textarea name="bio" rows="5" placeholder="Short bio..." />
      </Field>

      <Field label="Avatar">
        <Input type="file" name="avatar" />
      </Field>

      <Field label="Resume">
        <Input type="file" name="resume" />
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
          Save Profile
        </button>
      </div>
    </form>
  );
}