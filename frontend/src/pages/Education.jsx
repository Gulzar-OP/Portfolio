import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Loader2,
  MapPin,
} from "lucide-react";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.ed-root { font-family: 'Inter', system-ui, sans-serif; }
.ed-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

/* newest first, respecting an explicit "order" field when the API sets one */
const sortEntries = (list) =>
  [...list].sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.currentlyStudying !== b.currentlyStudying) return a.currentlyStudying ? -1 : 1;
    return new Date(b.endDate || b.startDate || 0) - new Date(a.endDate || a.startDate || 0);
  });

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

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200">
      {children}
    </span>
  );
}

function EducationCard({ edu, index }) {
  const {
    institution,
    degree,
    field,
    grade,
    startDate,
    endDate,
    currentlyStudying,
    description,
    achievements = [],
    logo,
    institutionWebsite,
    location,
  } = edu;

  const endDateText = currentlyStudying ? "Present" : formatDate(endDate);

  return (
    <Reveal delay={index * 0.08} className="relative">
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-violet-400/30">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-8">
          {/* logo */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
            {logo ? (
              <img src={logo} alt={institution} className="h-full w-full object-contain p-2" />
            ) : (
              <GraduationCap size={28} className="text-violet-400" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="ed-display text-xl font-bold sm:text-2xl">{institution}</h2>
                <p className="mt-1 text-slate-400">
                  {[degree, field].filter(Boolean).join(" • ")}
                </p>
              </div>

              {currentlyStudying && (
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Currently studying
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} className="text-slate-500" />
                {formatDate(startDate)} – {endDateText}
              </span>
              {location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-slate-500" />
                  {location}
                </span>
              )}
              {institutionWebsite && (
                <a
                  href={institutionWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-violet-400 transition hover:text-violet-300"
                >
                  {institutionWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {grade && (
              <div className="mt-4">
                <Badge>Grade • {grade}</Badge>
              </div>
            )}

            {description && (
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">{description}</p>
            )}

            {achievements.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <Award size={13} className="text-amber-400" />
                  Key achievements
                </p>
                <ul className="space-y-2">
                  {achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                      <span className="mt-0.5 text-xs font-semibold text-violet-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    const fetchEducation = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API}/api/v1/education`);

        let data = res.data;
        if (Array.isArray(data)) data = data;
        else if (Array.isArray(data?.education)) data = data.education;
        else if (Array.isArray(data?.data)) data = data.data;
        else if (data?.education) data = [data.education];
        else if (data?.data) data = [data.data];
        else data = [];

        if (alive) setEducation(data);
      } catch (err) {
        if (alive) {
          setEducation([]);
          setError(err.response?.data?.message || "Failed to load education details.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchEducation();
    return () => {
      alive = false;
    };
  }, []);

  const entries = useMemo(() => sortEntries(education), [education]);

  return (
    <div className="ed-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-4xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-violet-400">Academic background</p>
          <h1 className="ed-display mt-3 text-5xl font-extrabold leading-[1.02] sm:text-6xl">
            Education
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
            A timeline of my academic journey, from school to my current degree.
          </p>
        </Reveal>

        <div className="mt-12">
          {loading && (
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
              Loading education…
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-900/10 px-6 py-4 text-red-300">
              {error}
            </div>
          )}

          {!loading && !error && entries.length === 0 && (
            <p className="text-slate-500">No education details found.</p>
          )}

          {!loading && !error && entries.length > 0 && (
            <div className="space-y-6">
              {entries.map((edu, i) => (
                <EducationCard key={edu._id || edu.institution} edu={edu} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}