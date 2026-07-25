import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaProjectDiagram,
  FaBlog,
  FaTools,
  FaEnvelope,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import ProjectForm from "./forms/ProjectForm";
import BlogForm from "./forms/BlogForm";
import SkillForm from "./forms/SkillForm";
import ProfileForm from "./forms/ProfileForm";

const URI = "http://localhost:2000";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [activeForm, setActiveForm] = useState("project");

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [projectsRes, blogsRes, skillsRes, messagesRes] = await Promise.allSettled([
          axios.get(`${URI}/api/v1/projects`),
          axios.get(`${URI}/api/v1/blogs`),
          axios.get(`${URI}/api/v1/skills`),
          axios.get(`${URI}/api/v1/education`),
        ]);

        if (!isMounted) return;

        if (projectsRes.status === "fulfilled") {
          setProjects(projectsRes.value.data.projects || []);
        }
        if (blogsRes.status === "fulfilled") {
          setBlogs(blogsRes.value.data.blogs || []);
        }
        if (skillsRes.status === "fulfilled") {
          setSkills(skillsRes.value?.data.data || []);
        }
        if (messagesRes.status === "fulfilled") {
          setMessages(messagesRes.value.data.messages || []);
        }

        const allFailed = [projectsRes, blogsRes, skillsRes, messagesRes].every(
          (r) => r.status === "rejected"
        );
        setError(allFailed ? "Couldn't load dashboard data. Check your API server." : "");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { title: "Projects", value: projects.length, icon: <FaProjectDiagram />, to: "/dashboard/projects" },
    { title: "Blogs", value: blogs.length, icon: <FaBlog />, to: "/dashboard/blogs" },
    { title: "Skills", value: skills.length, icon: <FaTools />, to: "/dashboard/skills" },
    { title: "Messages", value: messages.length, icon: <FaEnvelope />, to: "/dashboard/messages" },
  ];

  const quickActions = [
    { label: "Add Project", type: "project" },
    { label: "Add Blog", type: "blog" },
    { label: "Add Skill", type: "skill" },
    { label: "Update Profile", type: "profile" },
  ];

  const openActionModal = (type) => {
    setActiveForm(type);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] p-6 text-white md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
        <p className="mt-2 text-gray-400">Manage your portfolio from here.</p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.08]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl text-violet-400">
                {item.icon}
              </div>
              <h2 className="mt-5 text-3xl font-bold">
                {loading ? (
                  <span className="inline-block h-8 w-10 animate-pulse rounded bg-white/10" />
                ) : (
                  item.value
                )}
              </h2>
              <p className="text-gray-400">{item.title}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => openActionModal(action.type)}
                className="flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
              >
                <FaPlus size={13} />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Projects</h2>
            <Link to="/dashboard/projects" className="text-sm text-violet-400 transition hover:text-violet-300">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-sm text-gray-500">No projects added yet.</p>
          ) : (
            <ul className="overflow-hidden rounded-2xl border border-white/10 divide-y divide-white/10">
              {projects.slice(0, 5).map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between bg-white/[0.02] px-5 py-3.5 transition hover:bg-white/[0.05]"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <Link
                    to={`/dashboard/projects/${item._id}/edit`}
                    className="text-xs text-violet-400 transition hover:text-violet-300"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Blogs</h2>
            <Link to="/dashboard/blogs" className="text-sm text-violet-400 transition hover:text-violet-300">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-sm text-gray-500">No blogs added yet.</p>
          ) : (
            <ul className="overflow-hidden rounded-2xl border border-white/10 divide-y divide-white/10">
              {blogs.slice(0, 5).map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between bg-white/[0.02] px-5 py-3.5 transition hover:bg-white/[0.05]"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <Link
                    to={`/dashboard/blogs/${item._id}/edit`}
                    className="text-xs text-violet-400 transition hover:text-violet-300"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-4 mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <Link to="/dashboard/skills" className="text-sm text-violet-400 transition hover:text-violet-300">
              Manage
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-20 animate-pulse rounded-full border border-white/10 bg-white/5" />
              ))}
            </div>
          ) : skills.length === 0 ? (
            <p className="text-sm text-gray-500">No skills added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((item) => (
                <span
                  key={item._id}
                  className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300"
                >
                  {item.name || item.title}
                </span>
              ))}
            </div>
          )}
        </section>

        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              onClick={() => setOpenModal(false)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.94, y: 24, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f12] shadow-2xl shadow-black/40"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-fuchsia-500/10 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-violet-300">
                        Dashboard Form
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-white">
                        {activeForm === "project" && "Add Project"}
                        {activeForm === "blog" && "Add Blog"}
                        {activeForm === "skill" && "Add Skill"}
                        {activeForm === "profile" && "Update Profile"}
                      </h2>
                      <p className="mt-1 text-sm text-gray-400">
                        Fill the details and save changes.
                      </p>
                    </div>

                    <button
                      onClick={() => setOpenModal(false)}
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
                  <aside className="border-b border-white/10 bg-white/[0.03] p-4 lg:border-b-0 lg:border-r">
                    <div className="space-y-2">
                      {[
                        { key: "project", label: "Project" },
                        { key: "blog", label: "Blog" },
                        { key: "skill", label: "Skill" },
                        { key: "profile", label: "Profile" },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setActiveForm(tab.key)}
                          className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                            activeForm === tab.key
                              ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                              : "bg-white/0 text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </aside>

                  <div className="p-6">
                    {activeForm === "project" && <ProjectForm setOpenModal={setOpenModal} />}
                    {activeForm === "blog" && <BlogForm setOpenModal={setOpenModal} />}
                    {activeForm === "skill" && <SkillForm setOpenModal={setOpenModal} />}
                    {activeForm === "profile" && <ProfileForm setOpenModal={setOpenModal} />}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}