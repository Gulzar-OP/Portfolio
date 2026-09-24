import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaFlag,
  FaRegCheckCircle,
  FaStar,
} from "react-icons/fa";

import ProjectDetailsSkeleton from "./ProjectDetailsSkeleton";
import ProjectGallery from "./ProjectGallery";
import TechnologyList from "./TechnologyList";
import TechnologyDetails from "./TechnologyDetails";
import ItemGrid from "./ItemGrid";
import ProjectLinks from "./ProjectLinks";

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

/* ---------- Small components (kept OUTSIDE the page component so they
   don't remount on every render) ---------- */

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const dot = s.includes("complete")
    ? "bg-emerald-400"
    : s.includes("progress")
    ? "bg-amber-400"
    : "bg-slate-400";

  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status || "Unknown"}
    </span>
  );
}

function Fact({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] py-3 last:border-b-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-medium text-slate-100">{value}</dd>
    </div>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div
      role="tablist"
      className="flex gap-1 overflow-x-auto border-b border-white/10"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`relative shrink-0 px-4 py-3.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
              isActive ? "text-white" : "text-slate-500 hover:text-slate-200"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && tab.count > 0 && (
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${
                  isActive
                    ? "bg-violet-500/25 text-violet-200"
                    : "bg-white/5 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            )}
            <span
              className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}


/* Renders the project description as real Markdown (# headings, ## sections, lists, bold, code, links) */
const mdComponents = {
  h1: (p) => <h2 className="pd-display mb-4 mt-2 text-3xl font-extrabold text-white sm:text-4xl" {...p} />,
  h2: (p) => <h3 className="pd-display mb-3 mt-10 border-l-2 border-violet-400 pl-3 text-xl font-bold text-white sm:text-2xl" {...p} />,
  h3: (p) => <h4 className="mb-2 mt-6 text-lg font-semibold text-slate-100" {...p} />,
  p: (p) => <p className="mb-4 leading-8 text-slate-300" {...p} />,
  ul: (p) => <ul className="mb-5 list-disc space-y-2 pl-6 text-slate-300 marker:text-violet-400" {...p} />,
  ol: (p) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-slate-300 marker:text-violet-400" {...p} />,
  li: (p) => <li className="leading-7" {...p} />,
  strong: (p) => <strong className="font-semibold text-white" {...p} />,
  a: (p) => <a className="text-violet-300 underline underline-offset-4 hover:text-violet-200" target="_blank" rel="noreferrer" {...p} />,
  blockquote: (p) => <blockquote className="my-5 border-l-2 border-white/20 pl-4 italic text-slate-400" {...p} />,
  hr: () => <hr className="my-8 border-white/10" />,
  code: ({ inline, ...p }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.9em] text-violet-200" {...p} />
  ),
  pre: (p) => <pre className="my-5 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-sm" {...p} />,
};

function MarkdownView({ children }) {
  return (
    <div className="max-w-3xl text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.pd-root { font-family: 'Inter', system-ui, sans-serif; }
.pd-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
@keyframes pd-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.pd-reveal { animation: pd-in .6s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) { .pd-reveal { animation: none; } }
`;

export default function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API_URL}/api/v1/projects/${slug}`);
        if (isMounted) setProject(response.data?.project || response.data);
      } catch (err) {
        if (isMounted) {
          setProject(null);
          setError(
            err.response?.data?.message || "Unable to load project details."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (slug) fetchProject();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    setActiveImage(0);
    setActiveTab("overview");
  }, [slug]);

  const technologies = useMemo(() => normalizeArray(project?.technologies), [project]);
  const features = useMemo(() => normalizeArray(project?.features), [project]);
  const challenges = useMemo(() => normalizeArray(project?.challenges), [project]);
  const learnings = useMemo(() => normalizeArray(project?.learnings), [project]);

  const gallery = useMemo(() => {
    const images = [project?.thumbnail, ...normalizeArray(project?.gallery)].filter(Boolean);
    return images.length ? images : ["/bg.png"];
  }, [project]);

  const description =
    project?.description || project?.content || project?.shortDescription || "";

  const githubLinks = [
    { label: "Frontend", url: project?.githubFrontend },
    { label: "Backend", url: project?.githubBackend },
  ].filter((item) => item.url);

  const facts = [
    { label: "Category", value: project?.category },
    { label: "Role", value: project?.role },
    { label: "Duration", value: project?.duration },
    { label: "Started", value: formatDate(project?.createdAt) },
    { label: "Finished", value: formatDate(project?.completedAt) },
  ];

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "features", label: "Features", count: features.length },
    { key: "challenges", label: "Challenges", count: challenges.length },
    { key: "learnings", label: "Learnings", count: learnings.length },
    { key: "tech", label: "Technologies", count: technologies.length },
  ];

  if (loading) return <ProjectDetailsSkeleton />;

  if (error || !project) {
    return (
      <div className="pd-root flex min-h-screen items-center justify-center bg-[#07070d] px-4 text-white">
        <style>{FONT_CSS}</style>
        <div className="max-w-md text-center">
          <h1 className="pd-display text-4xl font-extrabold">Project not found</h1>
          <p className="mt-3 text-sm text-slate-400">
            {error || "This project is unavailable."}
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium transition hover:bg-violet-500"
          >
            <FaArrowLeft size={12} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-root relative min-h-screen overflow-hidden bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>

      {/* single ambient glow – the only decoration on the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <FaArrowLeft size={11} />
          All projects
        </Link>

        {/* ---------- Header ---------- */}
        <header className="pd-reveal mt-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 text-amber-300">
                <FaStar size={12} />
                Featured
              </span>
            )}
            <span className="text-slate-400">
              {project.category || "Web application"}
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h1 className="pd-display mt-5 break-words text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            {project.shortDescription || description}
          </p>
        </header>

        {/* ---------- Gallery + sidebar ---------- */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            <ProjectGallery
              gallery={gallery}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              title={project.title}
            />
          </div>

          <aside className="min-w-0 space-y-8 lg:sticky lg:top-8">
            <ProjectLinks
              liveDemo={project.liveDemo}
              videoDemo={project.videoDemo}
              githubLinks={githubLinks}
            />

            <dl className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 backdrop-blur-xl">
              {facts.map((item) => (
                <Fact key={item.label} {...item} />
              ))}
            </dl>

            {technologies.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-medium text-slate-400">
                  Built with
                </h2>
                <TechnologyList technologies={technologies} />
              </div>
            )}
          </aside>
        </div>

        {/* ---------- Deep dive ---------- */}
        <section className="mt-16">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          <div key={activeTab} className="pd-reveal pt-8">
            {activeTab === "overview" && (
              <MarkdownView>
                {description || "No project description available."}
              </MarkdownView>
            )}

            {activeTab === "features" && (
              <ItemGrid items={features} icon={FaCheckCircle} />
            )}

            {activeTab === "challenges" && (
              <ItemGrid items={challenges} icon={FaFlag} />
            )}

            {activeTab === "learnings" && (
              <ItemGrid items={learnings} icon={FaRegCheckCircle} />
            )}

            {activeTab === "tech" && (
              <TechnologyDetails technologies={technologies} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}