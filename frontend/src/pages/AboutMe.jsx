import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaServer,
} from "react-icons/fa";
import * as Si from "react-icons/si";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

/* ---- your personal info: edit here ---- */
const ABOUT = {
  name: "Gulzar",
  location: "Begusarai, Bihar",
  focus: ["MERN Stack Development", "Artificial Intelligence", "Machine Learning"],
  paragraphs: [
    "I work with React, Node.js, Express and MongoDB to build full-stack applications. I enjoy turning ideas into polished digital products, especially portfolio websites, dashboards and business applications.",
    "I care about structure, performance and modern design. I like building reusable components, clean APIs and layouts that look good on every screen size.",
  ],
  building:
    "Portfolio websites, admin dashboards, e-commerce systems, school management apps, and any project where UI matters as much as logic.",
};

/* Skill name -> brand icon. Add a line here when you add a new skill.
   Keys are lowercase with everything except letters/digits removed. */
const SKILL_ICONS = {
  html: "SiHtml5",
  html5: "SiHtml5",
  css: "SiCss3",
  css3: "SiCss3",
  css6: "SiCss3",
  javascript: "SiJavascript",
  typescript: "SiTypescript",
  react: "SiReact",
  reactjs: "SiReact",
  tailwindcss: "SiTailwindcss",
  framermotion: "SiFramer",
  redux: "SiRedux",
  reduxtoolkit: "SiRedux",
  nodejs: "SiNodedotjs",
  expressjs: "SiExpress",
  express: "SiExpress",
  jwt: "SiJsonwebtokens",
  mongodb: "SiMongodb",
  mongoose: "SiMongoose",
  mysql: "SiMysql",
  c: "SiC",
  cpp: "SiCplusplus",
  java: "SiOpenjdk",
  python: "SiPython",
  git: "SiGit",
  github: "SiGithub",
  postman: "SiPostman",
};

const CATEGORY_FALLBACK = {
  frontend: FaLaptopCode,
  backend: FaServer,
  database: FaDatabase,
};

const CATEGORY_ORDER = ["frontend", "backend", "database", "programming"];

const normalizeKey = (s = "") =>
  s.toLowerCase().replace(/\+\+/g, "pp").replace(/[^a-z0-9]/g, "");

const resolveIcon = (skill) => {
  const key = normalizeKey(skill.name);
  const candidates = [SKILL_ICONS[key], skill.icon];
  for (const c of candidates) {
    if (c && Si[c]) return Si[c];
  }
  return CATEGORY_FALLBACK[(skill.category || "").toLowerCase()] || FaCode;
};

/* dark brand colours (Express, JWT, etc.) disappear on a dark page */
const readableColor = (hex) => {
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex || "")) return "#a78bfa";
  let h = hex.slice(1);
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.35 ? "#cbd5e1" : hex;
};

const formatYear = (v) => {
  if (!v) return null;
  if (/^\d{4}$/.test(String(v))) return String(v);
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : String(d.getFullYear());
};

const eduPeriod = (edu) => {
  const start = formatYear(edu.startYear || edu.startDate);
  const end = edu.currentlyStudying ? "Present" : formatYear(edu.endYear || edu.endDate);
  if (start && end) return `${start} – ${end}`;
  return edu.currentlyStudying ? "Currently studying" : end || start || "Completed";
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.ab-root { font-family: 'Inter', system-ui, sans-serif; }
.ab-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillItem({ skill }) {
  const Icon = resolveIcon(skill);
  const level = Math.min(100, Math.max(0, Number(skill.level) || 0));

  return (
    <li className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/40 hover:bg-white/[0.06]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xl"
          style={{ color: readableColor(skill.color) }}
        >
          <Icon />
        </span>
        <span className="min-w-0 flex-1 truncate font-medium">{skill.name}</span>
        {level > 0 && <span className="text-sm tabular-nums text-slate-500">{level}%</span>}
      </div>
      {level > 0 && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
          />
        </div>
      )}
    </li>
  );
}

export default function AboutMe() {
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [skillRes, eduRes] = await Promise.allSettled([
        axios.get(`${API}/api/v1/skills`),
        axios.get(`${API}/api/v1/education`),
      ]);
      if (!alive) return;
      if (skillRes.status === "fulfilled") {
        const d = skillRes.value.data?.data;
        setSkills(Array.isArray(d) ? d : []);
      }
      if (eduRes.status === "fulfilled") {
        const e = eduRes.value.data?.education;
        setEducation(Array.isArray(e) ? e : []);
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* group skills by category, in a sensible order */
  const groups = useMemo(() => {
    const map = new Map();
    skills.forEach((s) => {
      const cat = s.category || "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(s);
    });
    return [...map.entries()].sort(([a], [b]) => {
      const ia = CATEGORY_ORDER.indexOf(a.toLowerCase());
      const ib = CATEGORY_ORDER.indexOf(b.toLowerCase());
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }, [skills]);

  return (
    <div className="ab-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        {/* ---------- Header ---------- */}
        <Reveal className="max-w-3xl">
          <p className="text-sm font-medium text-violet-400">About me</p>
          <h1 className="ab-display mt-3 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Who I am
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            I&apos;m a MERN stack developer who loves building clean, responsive and useful web
            applications, with a strong focus on UI and user experience.
          </p>
        </Reveal>

        {/* ---------- About + Skills ---------- */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* left: sticky, so it never leaves a big empty gap beside the long skills list */}
          <Reveal className="lg:sticky lg:top-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8">
              <h2 className="ab-display text-2xl font-bold">About {ABOUT.name}</h2>
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="mt-4 leading-8 text-slate-400">
                  {p}
                </p>
              ))}

              <dl className="mt-7 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-slate-500">Location</dt>
                  <dd className="text-right text-sm font-medium">{ABOUT.location}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3">
                  <dt className="pt-0.5 text-sm text-slate-500">Focus</dt>
                  <dd className="flex flex-wrap justify-end gap-1.5">
                    {(Array.isArray(ABOUT.focus) ? ABOUT.focus : [ABOUT.focus]).map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200"
                      >
                        {f}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                <h3 className="text-sm font-medium text-violet-300">What I like building</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{ABOUT.building}</p>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0 space-y-10">
            <Reveal>
              <h2 className="ab-display text-3xl font-extrabold sm:text-4xl">Skills</h2>
            </Reveal>

            {loading && <p className="text-sm text-slate-500">Loading skills…</p>}
            {!loading && groups.length === 0 && (
              <p className="text-sm text-slate-500">No skills added yet.</p>
            )}

            {groups.map(([category, items]) => (
              <Reveal key={category}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {category}
                  </h3>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-slate-600">{items.length}</span>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((s) => (
                    <SkillItem key={s._id || s.name} skill={s} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- Education ---------- */}
        {education.length > 0 && (
          <section className="mt-24">
            <Reveal className="mb-10 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <FaGraduationCap size={20} />
              </span>
              <h2 className="ab-display text-3xl font-extrabold sm:text-4xl">Education</h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {education.map((edu, i) => (
                <Reveal key={edu._id || edu.degree} delay={i * 0.07} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-400/40">
                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs ${
                        edu.currentlyStudying
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      <FaCalendarAlt size={10} />
                      {eduPeriod(edu)}
                    </span>

                    <h3 className="ab-display mt-4 text-xl font-bold">{edu.degree}</h3>
                    <p className="mt-1 text-slate-300">
                      {[edu.field, edu.institution].filter(Boolean).join(" • ")}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-400">
                      {edu.location && (
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-slate-500" /> {edu.location}
                        </p>
                      )}
                      {edu.grade && (
                        <p>
                          <span className="text-slate-500">Grade:</span> {edu.grade}
                        </p>
                      )}
                    </div>

                    {edu.description && (
                      <p className="mt-4 text-sm leading-6 text-slate-400">{edu.description}</p>
                    )}

                    {edu.website && (
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-violet-400 transition hover:text-violet-300"
                      >
                        Visit website <FaExternalLinkAlt size={11} />
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}