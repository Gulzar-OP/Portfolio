import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaGithub, FaStar } from "react-icons/fa6";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.pj-root { font-family: 'Inter', system-ui, sans-serif; }
.pj-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatusDot({ status }) {
  const s = (status || "").toLowerCase();
  const color = s.includes("complete")
    ? "bg-emerald-400"
    : s.includes("progress")
    ? "bg-amber-400"
    : "bg-slate-400";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {status || "Unknown"}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const link = project.slug ? `/projects/${project.slug}` : `/projects/${project._id}`;
  const tech = Array.isArray(project.technologies) ? project.technologies.slice(0, 4) : [];
  const github = project.githubFrontend || project.githubBackend || project.github;
  const live = project.liveDemo || project.live;

  return (
    <Reveal delay={(index % 6) * 0.06} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.05]">
        <Link to={link} className="block">
          <div className="relative h-52 overflow-hidden bg-white/[0.04]">
            <img
              src={project.thumbnail || "/bg.png"}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/10 to-transparent" />

            {project.featured && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs text-amber-300 backdrop-blur-md">
                <FaStar size={10} /> Featured
              </span>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">{project.category || "Web Application"}</span>
            <StatusDot status={project.status} />
          </div>

          <Link to={link}>
            <h2 className="pj-display mt-3 text-2xl font-bold transition group-hover:text-violet-300">
              {project.title}
            </h2>
          </Link>

          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-400">
            {project.shortDescription || project.description}
          </p>

          {tech.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t._id || t.name || t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-300"
                >
                  {t.name || t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <Link
              to={link}
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition group-hover:gap-3"
            >
              View project
              <FaArrowUpRightFromSquare size={11} />
            </Link>

            <div className="flex items-center gap-4 text-slate-500">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Source code"
                  onClick={(e) => e.stopPropagation()}
                  className="transition hover:text-white"
                >
                  <FaGithub size={16} />
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live demo"
                  onClick={(e) => e.stopPropagation()}
                  className="transition hover:text-white"
                >
                  <FaArrowUpRightFromSquare size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="h-52 bg-white/[0.04]" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 rounded bg-white/[0.06]" />
        <div className="h-6 w-3/4 rounded bg-white/[0.08]" />
        <div className="h-3 w-full rounded bg-white/[0.05]" />
        <div className="h-3 w-5/6 rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function Project() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let alive = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API}/api/v1/projects`);
        if (alive) setProjectsData(response.data?.projects || []);
      } catch (err) {
        if (alive) {
          setProjectsData([]);
          setError(err.response?.data?.message || "Unable to load projects right now.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      alive = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(projectsData.map((p) => p.category).filter(Boolean));
    return ["All", ...set];
  }, [projectsData]);

  const visible = useMemo(
    () => (category === "All" ? projectsData : projectsData.filter((p) => p.category === category)),
    [projectsData, category]
  );

  return (
    <div className="pj-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-violet-400">My work</p>
          <h1 className="pj-display mt-3 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Projects
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            Websites and systems I&apos;ve built with React, Node.js, Express, MongoDB and modern UI tools.
          </p>
        </Reveal>

        {categories.length > 2 && (
          <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === c
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "border border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

          {!loading &&
            visible.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
        </div>

        {!loading && error && (
          <Reveal className="mx-auto mt-16 max-w-md text-center">
            <p className="text-slate-400">{error}</p>
          </Reveal>
        )}

        {!loading && !error && visible.length === 0 && (
          <Reveal className="mx-auto mt-16 max-w-md text-center">
            <p className="text-slate-400">
              {category === "All" ? "No projects added yet." : `No projects in "${category}" yet.`}
            </p>
          </Reveal>
        )}
      </main>
    </div>
  );
}