import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaGithub,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaFlag,
  FaCode,
  FaRegCheckCircle,
  FaCheckCircle,
  FaLayerGroup,
  FaRegClock,
  FaRegCalendarAlt,
  FaUserAlt,
  FaAlignLeft,
  FaArrowLeft,
  FaSearchPlus,
  FaExternalLinkAlt,
  FaCube,
  FaRegBookmark,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiSupabase,
  SiRedux,
  SiAxios,
  SiSocketdotio,
  SiJsonwebtokens,
  SiStripe,
  SiCloudinary,
  SiMongoose,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiPostman,
  SiFramer,
  SiPython,
  SiCplusplus,
  SiC,
  SiNpm,
  SiYarn,
  SiVite,
} from "react-icons/si";
import { FaJava, FaRobot } from "react-icons/fa6";

export const TECH_ICON_MAP = {
  react: { icon: SiReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: "#FFFFFF" },
  vue: { icon: SiVuedotjs, color: "#42B883" },
  angular: { icon: SiAngular, color: "#DD0031" },
  html: { icon: SiHtml5, color: "#E34F26" },
  html5: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#1572B6" },
  css3: { icon: SiCss, color: "#1572B6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  "tailwind css": { icon: SiTailwindcss, color: "#38BDF8" },
  bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  sass: { icon: SiSass, color: "#CC6699" },
  node: { icon: SiNodedotjs, color: "#3C873A" },
  nodejs: { icon: SiNodedotjs, color: "#3C873A" },
  "node.js": { icon: SiNodedotjs, color: "#3C873A" },
  express: { icon: SiExpress, color: "#FFFFFF" },
  "express.js": { icon: SiExpress, color: "#FFFFFF" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  mongoose: { icon: SiMongoose, color: "#880000" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  supabase: { icon: SiSupabase, color: "#3ECF8E" },
  redux: { icon: SiRedux, color: "#764ABC" },
  "redux toolkit": { icon: SiRedux, color: "#764ABC" },
  axios: { icon: SiAxios, color: "#5A29E4" },
  socketio: { icon: SiSocketdotio, color: "#FFFFFF" },
  "socket.io": { icon: SiSocketdotio, color: "#FFFFFF" },
  jwt: { icon: SiJsonwebtokens, color: "#D63AFF" },
  "json web token": { icon: SiJsonwebtokens, color: "#D63AFF" },
  stripe: { icon: SiStripe, color: "#635BFF" },
  cloudinary: { icon: SiCloudinary, color: "#3448C5" },
  framer: { icon: SiFramer, color: "#0055FF" },
  "framer motion": { icon: SiFramer, color: "#0055FF" },
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: "#FFFFFF" },
  vercel: { icon: SiVercel, color: "#FFFFFF" },
  netlify: { icon: SiNetlify, color: "#00C7B7" },
  docker: { icon: SiDocker, color: "#2496ED" },
  postman: { icon: SiPostman, color: "#FF6C37" },
  python: { icon: SiPython, color: "#3776AB" },
  java: { icon: FaJava, color: "#F89820" },
  c: { icon: SiC, color: "#A8B9CC" },
  "c++": { icon: SiCplusplus, color: "#00599C" },
  openai: { icon: FaRobot, color: "#10A37F" },
  gemini: { icon: FaRobot, color: "#4285F4" },
  npm: { icon: SiNpm, color: "#CB3837" },
  yarn: { icon: SiYarn, color: "#2C8EBB" },
  vite: { icon: SiVite, color: "#646CFF" },
};

function getTechIcon(name = "") {
  return (
    TECH_ICON_MAP[name.trim().toLowerCase()] || {
      icon: FaLayerGroup,
      color: "#A78BFA",
    }
  );
}

const timeConvert = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  });
};

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const dotColor =
    s.includes("complete")
      ? "bg-emerald-400"
      : s.includes("progress")
      ? "bg-amber-400"
      : "bg-slate-400";

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-200 backdrop-blur-md">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span className="truncate">{status || "Unknown"}</span>
    </span>
  );
}

function Tag({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-200 backdrop-blur-md">
      {Icon ? <Icon size={12} /> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
        <Icon size={13} className="text-violet-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm text-gray-200">{value}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}
  const API = import.meta.env.VITE_API || "http://localhost:2000"
export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/projects/${slug}`);
        setProject(res.data?.project || res.data);
      } catch (error) {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  const gallery = useMemo(
    () => [project?.thumbnail, ...(project?.images || [])].filter(Boolean),
    [project]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05060a] text-white">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-40 rounded bg-white/5" />
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="h-[420px] rounded-[28px] bg-white/5" />
              <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="h-8 w-3/5 rounded bg-white/5" />
                <div className="h-6 w-full rounded bg-white/5" />
                <div className="h-24 rounded bg-white/5" />
                <div className="h-10 w-full rounded bg-white/5" />
                <div className="h-64 rounded bg-white/5" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05060a] text-white">
        <div className="px-4 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">Project not found</h1>
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
          >
            <FaArrowLeft size={12} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const infoRows = [
    { icon: FaLayerGroup, label: "Category", value: project.category },
    { icon: FaCheckCircle, label: "Status", value: project.status },
    { icon: FaRegClock, label: "Duration", value: project.duration },
    { icon: FaRegCalendarAlt, label: "Start", value: timeConvert(project.startDate) },
    { icon: FaRegCalendarAlt, label: "Completed", value: timeConvert(project.completionDate) },
    { icon: FaUserAlt, label: "Role", value: project.role },
  ];

  const tabs = [
    { key: "overview", label: "Overview", icon: FaAlignLeft },
    { key: "features", label: "Features", icon: FaStar },
    { key: "challenges", label: "Challenges", icon: FaFlag },
    { key: "learnings", label: "Learnings", icon: FaCode },
    { key: "tech", label: "Technologies", icon: FaCube },
  ];

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-violet-300 transition hover:text-violet-200"
        >
          <FaArrowLeft size={12} />
          Back to All Projects
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30">
              <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2.5 backdrop-blur-md">
                <FaSearchPlus className="text-white/80" />
              </div>

              <img
                src={gallery[activeImage] || project.thumbnail}
                alt={project.title}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((p) => Math.max(p - 1, 0))}
                    disabled={activeImage === 0}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 backdrop-blur-md transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={() => setActiveImage((p) => Math.min(p + 1, gallery.length - 1))}
                    disabled={activeImage === gallery.length - 1}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 backdrop-blur-md transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition sm:h-24 sm:w-32 ${
                      activeImage === idx
                        ? "border-violet-400 ring-2 ring-violet-500/40"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="min-w-0 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {project.featured && <Tag icon={FaStar}>Featured Project</Tag>}
              <Tag icon={FaRegBookmark}>{project.category || "Web Application"}</Tag>
              <div className="ml-auto">
                <StatusBadge status={project.status} />
              </div>
            </div>

            <div>
              <h1 className="break-words text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                {project.shortDescription || project.description}
              </p>
            </div>

            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  const { icon: Icon, color } = getTechIcon(tech);
                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 sm:px-4"
                    >
                      <Icon size={14} style={{ color }} />
                      <span className="max-w-[140px] truncate">{tech}</span>
                    </span>
                  );
                })}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold sm:text-lg">
                  <FaStar className="text-violet-400" size={14} />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.features?.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                      <FaCheckCircle className="mt-0.5 shrink-0 text-violet-400" size={14} />
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="grid gap-3">
                  {infoRows.map(({ icon: Icon, label, value }) => (
                    <InfoItem key={label} icon={Icon} label={label} value={value} />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500"
                    >
                      Live Demo <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                    >
                      GitHub <FaGithub size={14} />
                    </a>
                  )}
                  {project.videoDemo && (
                    <a
                      href={project.videoDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                    >
                      Video Demo <FaPlay size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5 md:p-6">
          <div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">
            {tabs.map(({ key, label, icon: Icon }) => (
              <TabButton
                key={key}
                active={activeTab === key}
                onClick={() => setActiveTab(key)}
                icon={Icon}
                label={label}
              />
            ))}
          </div>

          <div className="pt-5">
            {activeTab === "overview" && (
              <p className="max-w-4xl text-sm leading-7 text-gray-300 sm:text-base">
                {project.description}
              </p>
            )}

            {activeTab === "features" && (
              <ul className="grid gap-3 md:grid-cols-2">
                {project.features?.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                    <FaCheckCircle className="mt-0.5 text-emerald-400" size={14} />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "challenges" && (
              <ul className="grid gap-3 md:grid-cols-2">
                {project.challenges?.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                    <FaFlag className="mt-0.5 text-violet-400" size={14} />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "learnings" && (
              <ul className="grid gap-3 md:grid-cols-2">
                {project.learnings?.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                    <FaRegCheckCircle className="mt-0.5 text-violet-400" size={14} />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "tech" && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {project.technologies?.map((tech) => {
                  const { icon: Icon, color } = getTechIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white">{tech}</p>
                        <p className="text-xs text-gray-400">Used in project</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}