import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaAward,
  FaChevronDown,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLaptopCode,
  FaLinkedin,
  FaMobileAlt,
  FaPalette,
  FaServer,
} from "react-icons/fa";
import ChatBot from "../components/ChatBot";

/* TODO: put your real profile links here (or return them from your profile API) */
const SOCIALS = {
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  instagram: "https://instagram.com/",
};

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const SERVICES = [
  { icon: FaLaptopCode, title: "Frontend Development", desc: "Responsive, modern interfaces with React and Tailwind." },
  { icon: FaServer, title: "Backend Development", desc: "Secure APIs, auth, CRUD and database design." },
  { icon: FaMobileAlt, title: "Responsive Design", desc: "Mobile-first layouts that hold up on every screen." },
  { icon: FaPalette, title: "UI / UX Design", desc: "Clean interfaces with a clear visual hierarchy." },
];

const TIMELINE = [
  {
    year: "2024",
    title: "The Beginning",
    desc: "Started B.Tech in Computer Science & Engineering (AIML) and built a strong base in programming and problem solving.",
  },
  {
    year: "2025",
    title: "From Learning to Building",
    desc: "Moved into MERN stack, DSA and machine learning by building complete end-to-end applications.",
  },
  {
    year: "2026",
    title: "Building for the Real World",
    desc: "Production-ready projects, real-time systems, microservices, deployment and AI-powered apps, while preparing for software engineering roles.",
  },
];

const STEPS = [
  "Understand the requirement",
  "Design the UI structure",
  "Build frontend + backend",
  "Test, refine and deploy",
];

const FALLBACK_PROJECTS = [
  { _id: "p1", title: "E-commerce Platform", description: "Modern shopping app with cart, auth and admin panel." },
  { _id: "p2", title: "School Management System", description: "Dashboard for students, teachers and admin workflows." },
  { _id: "p3", title: "Portfolio Website", description: "Responsive portfolio with blog and admin CMS." },
];

const FALLBACK_BLOGS = [
  { _id: "b1", title: "Getting Started with MERN Stack", excerpt: "Build your first MERN application from scratch." },
  { _id: "b2", title: "React UI Best Practices", excerpt: "Make interfaces cleaner, faster and easier to maintain." },
  { _id: "b3", title: "Node.js API Design", excerpt: "Scalable and secure backend APIs with Express." },
];

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.hm-root { font-family: 'Inter', system-ui, sans-serif; }
.hm-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

/* ---------- helpers (defined outside so they never remount) ---------- */

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, to, cta = "View all" }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-violet-400">{eyebrow}</p>
        <h2 className="hm-display mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          {cta}
          <FaArrowRight size={11} className="transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      const [profileRes, blogRes, projectRes, certRes, skillRes] = await Promise.allSettled([
        axios.get(`${API}/api/v1/profile`, { withCredentials: true }),
        axios.get(`${API}/api/v1/blogs`),
        axios.get(`${API}/api/v1/projects`),
        axios.get(`${API}/api/v1/certificate`),
        axios.get(`${API}/api/v1/skills`),
      ]);
      if (!alive) return;

      if (profileRes.status === "fulfilled") setProfile(profileRes.value.data?.profile || null);
      if (blogRes.status === "fulfilled") setBlogs(blogRes.value.data?.blogs || []);
      if (projectRes.status === "fulfilled") setProjects(projectRes.value.data?.projects || []);
      if (certRes.status === "fulfilled") setCertificates(certRes.value.data?.certifications || []);
      if (skillRes.status === "fulfilled") setSkills(skillRes.value.data?.data || []);
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  /* close photo modal with Esc + lock page scroll while open */
  useEffect(() => {
    if (!showImage) return;
    const onKey = (e) => e.key === "Escape" && setShowImage(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showImage]);

  /* real numbers from your own data instead of hard-coded "20+ happy clients" */
  const stats = useMemo(
    () =>
      [
        { label: "Projects", value: projects.length },
        { label: "Skills", value: skills.length },
        { label: "Certificates", value: certificates.length },
        { label: "Blog posts", value: blogs.length },
      ].filter((s) => s.value > 0),
    [projects, skills, certificates, blogs]
  );

  const shownProjects = projects.length ? projects.slice(0, 3) : FALLBACK_PROJECTS;
  const shownBlogs = blogs.length ? blogs.slice(0, 3) : FALLBACK_BLOGS;
  const name = profile?.name || "Gulzar Hussain";
  const [first, ...rest] = name.split(" ");

  return (
    <div className="hm-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[150px]"
      />

      <main className="relative">
        {/* ================= HERO ================= */}
        <section className={`${wrap} grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-28`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="order-2 text-center lg:order-1 lg:text-left mt-10"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              B.Tech CSE (AIML) · MERN Developer
            </p>

            <h1 className="hm-display mt-6 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              Hi, I&apos;m {first}
              {rest.length > 0 && <span className="text-violet-400"> {rest.join(" ")}</span>}
            </h1>

            <h2 className="mt-5 text-xl font-medium text-slate-200 sm:text-2xl">
              {loading ? "Loading…" : profile?.title || "MERN Stack Developer"}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0">
              {profile?.about ||
                "I build modern web applications with React, Node.js, Express, MongoDB and Tailwind CSS, with a focus on performance, clean design and great user experience."}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
              >
                View projects <FaArrowRight size={12} />
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/[0.06]"
              >
                Contact me
              </Link>
            </div>

            <div className="mt-9 flex items-center justify-center gap-5 text-xl text-slate-500 lg:justify-start">
              {[
                { href: SOCIALS.github, icon: FaGithub, label: "GitHub" },
                { href: SOCIALS.linkedin, icon: FaLinkedin, label: "LinkedIn" },
                { href: SOCIALS.instagram, icon: FaInstagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition hover:text-violet-400">
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="order-1 mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:order-2 lg:max-w-none "
          >
            <div className="relative pb-24 sm:pb-28">
              {/* cover / workspace image */}
              <div className="relative h-[220px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-violet-900/30 sm:h-[280px] lg:h-[340px]">
                <img src="/bg.png" alt="Workspace" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-transparent" />
              </div>

              {/* profile photo overlapping the cover */}
              <button
                type="button"
                onClick={() => setShowImage(true)}
                aria-label="View profile photo"
                className="group absolute bottom-0 left-5 w-32 overflow-hidden rounded-2xl border-4 border-[#07070d] bg-[#0d0d16] shadow-xl sm:left-8 sm:w-40 lg:w-48"
              >
                <div className="aspect-[3/4]">
                  <img
                    src="/hero.jpeg"
                    alt={name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </div>
              </button>
            </div>
          </motion.div>
        </section>

        {/* scroll cue */}
        <div className="flex justify-center pb-6 text-violet-400/60">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <FaChevronDown />
          </motion.div>
        </div>

        {/* ================= STATS ================= */}
        {stats.length > 0 && (
          <Reveal className={`${wrap} pb-20`}>
            <dl className="mb-10 mt-10 grid grid-cols-2 divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl sm:grid-cols-4 sm:divide-x">
              {stats.map((s) => (
                <div key={s.label} className="p-6 text-center sm:p-8">
                  <dd className="hm-display text-4xl font-extrabold text-white">{s.value}</dd>
                  <dt className="mt-1 text-sm text-slate-500">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {/* ================= ABOUT + SERVICES ================= */}
        <section className={`${wrap} grid gap-12 pb-24 lg:grid-cols-2 lg:gap-16`}>
          <Reveal>
            <p className="text-sm font-medium text-violet-400">About me</p>
            <h2 className="hm-display mt-2 text-3xl font-extrabold sm:text-4xl">
              Passionate about building useful web products
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              I design and develop full-stack web applications with a focus on clean architecture,
              modern UI and smooth user experience. I enjoy turning ideas into scalable products.
            </p>

            {skills.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s._id || s.name}
                    className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-200"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {SERVICES.map(({ icon: Icon, title, desc }, i) => (
                <li key={title} className="group flex items-start gap-5 py-6">
                  <span className="mt-1 text-xs tabular-nums text-slate-600">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold transition group-hover:text-violet-300">{title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-400">{desc}</p>
                  </div>
                  <Icon className="mt-1 text-xl text-violet-400/70" />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ================= PROJECTS ================= */}
        <section className={`${wrap} pb-24`}>
          <Reveal>
            <SectionHead eyebrow="Featured projects" title="Some recent work" to="/projects" />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {shownProjects.map((p, i) => (
              <Reveal key={p._id} delay={i * 0.08}>
                <Link
                  to={p.slug ? `/projects/${p.slug}` : "/projects"}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.05]"
                >
                  <span className="text-xs tabular-nums text-slate-600">0{i + 1}</span>
                  <h3 className="hm-display mt-4 text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 leading-7 text-slate-400">
                    {p.shortDescription || p.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-violet-400">
                    View project
                    <FaExternalLinkAlt size={11} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= BLOGS ================= */}
        <section className={`${wrap} pb-24`}>
          <Reveal>
            <SectionHead eyebrow="Latest blogs" title="Ideas and tutorials" to="/blogs" />
          </Reveal>

          <Reveal>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {shownBlogs.map((b) => (
                <li key={b._id}>
                  <Link
                    to={b.slug ? `/blogs/${b.slug}` : "/blogs"}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold transition group-hover:text-violet-300">{b.title}</h3>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-400">{b.excerpt || b.description}</p>
                    </div>
                    <FaArrowRight className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-violet-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ================= TIMELINE + CERTIFICATES ================= */}
        <section className={`${wrap} grid gap-14 pb-24 lg:grid-cols-2 lg:gap-16`}>
          <Reveal>
            <p className="text-sm font-medium text-violet-400">Journey</p>
            <h2 className="hm-display mt-2 text-3xl font-extrabold sm:text-4xl">Experience timeline</h2>

            <ol className="relative mt-10 space-y-9 border-l border-white/10 pl-8">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-violet-400 ring-4 ring-[#07070d]" />
                  <p className="text-sm font-medium text-violet-300">{t.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 leading-7 text-slate-400">{t.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm font-medium text-violet-400">Credentials</p>
            <h2 className="hm-display mt-2 text-3xl font-extrabold sm:text-4xl">Certificates & achievements</h2>

            <div className="mt-10 space-y-3">
              {certificates.length ? (
                certificates.map((c) => (
                  <Link
                    key={c._id || c.title}
                    to={`/certificates/${c._id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/40 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <FaAward />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">{c.title}</h3>
                      <p className="text-sm text-slate-500">
                        {[c.issuer, c.year].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                    <FaArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-violet-400" />
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-500">No certificates added yet.</p>
              )}
            </div>
          </Reveal>
        </section>

        {/* ================= PROCESS ================= */}
        <section className={`${wrap} pb-24`}>
          <Reveal>
            <SectionHead eyebrow="How I work" title="My process" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <div className="border-t border-violet-400/40 pt-5">
                  <p className="hm-display text-4xl font-extrabold text-white/15">0{i + 1}</p>
                  <h3 className="mt-3 font-semibold">{step}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= CTA + RESUME ================= */}
        <Reveal className={`${wrap} pb-24`}>
          <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-600/20 via-violet-600/5 to-transparent p-8 sm:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-violet-300">Let&apos;s work together</p>
              <h2 className="hm-display mt-3 text-3xl font-extrabold sm:text-5xl">
                Need a modern website or dashboard?
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                I build responsive portfolio sites, admin panels, MERN apps and custom web solutions
                with clean UI and scalable structure.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
              >
                <FaEnvelope /> Contact me
              </Link>
              <a
                href="/Gulzar_Hussain.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/[0.06]"
              >
                View resume
              </a>
              <a
                href="/Gulzar_Hussain.pdf"
                download
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/[0.06]"
              >
                Download PDF
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      {/* photo lightbox */}
      {showImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowImage(false)}
        >
          <div className="relative max-h-[90vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowImage(false)}
              aria-label="Close"
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-bold text-black shadow-lg transition hover:bg-red-500 hover:text-white"
            >
              ×
            </button>
            <img src="/hero.jpeg" alt={name} className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl" />
          </div>
        </div>
      )}

      <ChatBot />
    </div>
  );
}