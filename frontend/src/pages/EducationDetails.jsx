import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Hash,
  Loader2,
  MapPin,
} from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

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

function InfoRow({ icon: Icon, label, value, last = false }) {
  if (!value) return null;
  return (
    <div className={`flex items-start gap-3 py-3.5 ${!last ? "border-b border-white/[0.07]" : ""}`}>
      <Icon size={16} className="mt-0.5 shrink-0 text-violet-400" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <div className="mt-0.5 text-sm font-medium text-slate-100">{value}</div>
      </div>
    </div>
  );
}

export default function EducationDetails() {
  const { id } = useParams();

  const [edu, setEdu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    const fetchEducation = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API}/api/v1/education/${id}`);
        const data = res.data?.education || res.data?.data || res.data;
        if (alive) setEdu(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        if (alive) {
          setEdu(null);
          setError(err.response?.data?.message || "Education entry not found.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    if (id) fetchEducation();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="ed-root flex min-h-screen items-center justify-center bg-[#07070d] text-white">
        <style>{FONT_CSS}</style>
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
          Loading…
        </div>
      </div>
    );
  }

  if (error || !edu) {
    return (
      <div className="ed-root flex min-h-screen flex-col items-center justify-center bg-[#07070d] px-4 text-center text-white">
        <style>{FONT_CSS}</style>
        <h1 className="ed-display text-3xl font-extrabold">Education entry not found</h1>
        <p className="mt-3 text-sm text-slate-400">{error}</p>
        <Link
          to="/about"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <FaArrowLeft size={12} />
          Back to About
        </Link>
      </div>
    );
  }

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
    order,
  } = edu;

  const endDateText = currentlyStudying ? "Present" : formatDate(endDate);

  return (
    <div className="ed-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          <FaArrowLeft size={12} />
          Back to About
        </Link>

        <Reveal className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] sm:h-24 sm:w-24">
            {logo ? (
              <img src={logo} alt={institution} className="h-full w-full object-contain p-3" />
            ) : (
              <GraduationCap size={36} className="text-violet-400" />
            )}
          </div>

          <div className="min-w-0">
            {currentlyStudying && (
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Currently studying
              </span>
            )}
            <h1 className="ed-display break-words text-3xl font-extrabold leading-tight sm:text-5xl">
              {institution}
            </h1>
            <p className="mt-3 text-lg text-slate-400">
              {[degree, field].filter(Boolean).join(" • ")}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* ---------- main ---------- */}
          <div className="min-w-0 space-y-8">
            {description && (
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <BookOpen size={14} className="text-violet-400" />
                    Description
                  </h2>
                  <p className="mt-4 max-w-3xl leading-8 text-slate-300">{description}</p>
                </div>
              </Reveal>
            )}

            {achievements.length > 0 && (
              <Reveal delay={0.06}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <Award size={14} className="text-amber-400" />
                    Key achievements
                  </h2>
                  <ul className="mt-5 space-y-3">
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
              </Reveal>
            )}
          </div>

          {/* ---------- sidebar ---------- */}
          <Reveal delay={0.1} className="lg:sticky lg:top-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-sm font-semibold text-slate-400">Quick info</h3>

              <div className="mt-2">
                <InfoRow icon={GraduationCap} label="Degree" value={degree} />
                <InfoRow icon={BookOpen} label="Field of study" value={field} />
                <InfoRow
                  icon={CalendarDays}
                  label="Duration"
                  value={`${formatDate(startDate)} – ${endDateText}`}
                />
                <InfoRow icon={MapPin} label="Location" value={location} />
                {grade && (
                  <InfoRow
                    icon={Award}
                    label="Grade"
                    value={
                      <span className="inline-flex rounded-lg bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
                        {grade}
                      </span>
                    }
                  />
                )}
                {institutionWebsite && (
                  <InfoRow
                    icon={ExternalLink}
                    label="Website"
                    value={
                      <a
                        href={institutionWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-violet-400 transition hover:text-violet-300"
                      >
                        {institutionWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        <ExternalLink size={11} />
                      </a>
                    }
                  />
                )}
                {order != null && (
                  <InfoRow
                    icon={Hash}
                    label="Order"
                    last
                    value={
                      <span className="inline-flex rounded-lg bg-violet-500/10 px-2.5 py-1 text-violet-300">
                        {String(order).padStart(2, "0")}
                      </span>
                    }
                  />
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}