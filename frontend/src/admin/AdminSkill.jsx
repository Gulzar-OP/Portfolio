import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";

  const API = import.meta.env.VITE_API || "http://localhost:2000"

const emptyForm = { name: "", category: "", level: "" };

export default function AdminSkill() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/v1/skills`);
      setSkills(res.data.data || []);
      console.log(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Couldn't load skills. Check your API server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSubmitting(true);
    try {
      if (editingId) {
        const res = await axios.put(`${API}/api/v1/skills/${editingId}`, form, {
          withCredentials: true,
        });
        console.log(res.data);
        const updated = res.data.data || { ...form, _id: editingId };
        setSkills((prev) => prev.map((s) => (s._id === editingId ? updated : s)));
      } else {
        const res = await axios.post(`${API}/api/v1/skills`, form, {
          withCredentials: true,
        });
        console.log(res.data);
        const created = res.data.data || { ...form, _id: Date.now().toString() };
        setSkills((prev) => [...prev, created]);
      }
      resetForm();
      setError("");
    } catch (err) {
      console.error(err);
      setError(editingId ? "Couldn't update skill." : "Couldn't add skill.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setForm({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API}/api/v1/skills/${id}`, { withCredentials: true });
      setSkills((prev) => prev.filter((s) => s._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error(err);
      setError("Couldn't delete skill.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white p-8">
      <h1 className="text-4xl font-bold">Skills</h1>
      <p className="text-gray-400 mt-2">Add, edit, or remove skills shown on your portfolio.</p>

      {error && (
        <div className="mt-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Add / Edit form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 grid sm:grid-cols-3 gap-4 items-end"
      >
        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-400 mb-1.5">Skill name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. React"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500 text-sm"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-400 mb-1.5">Category (optional)</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Frontend"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500 text-sm"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs text-gray-400 mb-1.5">Level (optional)</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500 text-sm"
          >
            <option value="">Select level</option>
            <option value="00">Started</option>
            <option value="30">Beginner</option>
            <option value="60">Intermediate</option>
            <option value="90">Advanced</option>
            <option value="100">Expert</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex gap-3">
          <button
            type="submit"
            disabled={submitting || !form.name.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
          >
            {editingId ? <FaCheck size={12} /> : <FaPlus size={12} />}
            {submitting ? "Saving..." : editingId ? "Update Skill" : "Add Skill"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition font-medium text-sm"
            >
              <FaTimes size={12} />
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Skills list */}
      <div className="mt-10">
        {loading ? (
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-28 bg-white/5 border border-white/10 rounded-full animate-pulse" />
            ))}
          </div>
        ) : skills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet. Add your first one above.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="group flex items-center gap-3 pl-4 pr-2 py-2 rounded-full bg-violet-500/10 border border-violet-400/20"
              >
                <div>
                  <span className="text-sm text-violet-200 font-medium">{skill.name}</span>
                  {(skill.category || skill.level) && (
                    <span className="text-[11px] text-violet-400/70 ml-2">
                      {[skill.category, skill.level].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition"
                    title="Edit"
                  >
                    <FaEdit size={11} className="text-violet-300" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    disabled={deletingId === skill._id}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-500/20 transition disabled:opacity-50"
                    title="Delete"
                  >
                    <FaTrash size={11} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}