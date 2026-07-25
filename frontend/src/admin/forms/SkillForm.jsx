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

export default function SkillForm({ setOpenModal }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch("http://localhost:2000/api/v1/skills", {
      method: "POST",
      body: formData,
    });
    setOpenModal(false);
  };

  return (
    <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
      <Field label="Skill Name" className="md:col-span-2">
        <Input name="name" placeholder="React, Node.js, MongoDB..." />
      </Field>

      <Field label="Level">
        <Input name="level" placeholder="Beginner / Intermediate / Advanced" />
      </Field>

      <Field label="Category">
        <Input name="category" placeholder="Frontend / Backend / Tools" />
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
          Save Skill
        </button>
      </div>
    </form>
  );
}