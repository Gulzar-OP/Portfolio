import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaFilePdf,
  FaIdCard,
  FaStar,
  FaTimes,
} from "react-icons/fa";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.cd-root { font-family: 'Inter', system-ui, sans-serif; }
.cd-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

const formatDate = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
};

const isPDF = (url) => {
  if (!url) return false;
  return url.split("?")[0].toLowerCase().endsWith(".pdf");
};

function InfoCard({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/30 hover:bg-white/[0.05]">
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
        <Icon size={13} className="text-violet-400" />
        {label}
      </div>
      <div className="break-words text-base font-medium text-slate-100">{value}</div>
    </div>
  );
}

export default function CertificateDetails() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openCertificate, setOpenCertificate] = useState(false);

  useEffect(() => {
    let alive = true;

    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API}/api/v1/certificate/${id}`);
        const data = res?.data?.certification || res?.data?.certificate || res?.data || null;
        if (alive) setCertificate(data);
      } catch (err) {
        if (alive) {
          setCertificate(null);
          setError(err?.response?.data?.message || "Failed to load certificate details.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    if (id) fetchCertificate();
    return () => {
      alive = false;
    };
  }, [id]);

  /* close the preview modal with Esc, and lock page scroll while it's open */
  useEffect(() => {
    if (!openCertificate) return;
    const onKey = (e) => e.key === "Escape" && setOpenCertificate(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openCertificate]);

  if (loading) {
    return (
      <div className="cd-root flex min-h-screen items-center justify-center bg-[#07070d] text-white">
        <style>{FONT_CSS}</style>
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-violet-400" />
          <p className="text-slate-400">Loading certificate…</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="cd-root flex min-h-screen flex-col items-center justify-center bg-[#07070d] px-4 text-center text-white">
        <style>{FONT_CSS}</style>
        <h1 className="cd-display text-3xl font-extrabold">Certificate not found</h1>
        <p className="mt-3 text-sm text-slate-400">{error}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <FaArrowLeft size={12} />
          Back to home
        </Link>
      </div>
    );
  }

  const certificateFile = certificate.image || "";
  const certificateIsPDF = isPDF(certificateFile);
  const expiryText = certificate.doesNotExpire ? "Does not expire" : formatDate(certificate.expiryDate);

  return (
    <div className="cd-root relative min-h-screen overflow-x-clip bg-[#07070d] px-4 py-10 text-white sm:px-6">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <Link
        to="/"
        className="relative z-10 mx-auto mb-6 flex max-w-5xl items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
      >
        <FaArrowLeft size={12} />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30"
      >
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-violet-600/25 via-violet-600/10 to-transparent p-6 sm:p-8">
          <p className="text-sm font-medium text-violet-300">
            {certificate.category || "Certificate"}
          </p>
          <h1 className="cd-display mt-2 break-words text-3xl font-extrabold sm:text-4xl">
            {certificate.title}
          </h1>
          {certificate.description && (
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">{certificate.description}</p>
          )}
        </div>

        {/* Content */}
        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[260px_1fr]">
          {/* Left: preview */}
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
            <button
              type="button"
              onClick={() => certificateFile && setOpenCertificate(true)}
              disabled={!certificateFile}
              className={`mb-5 w-full ${certificateFile ? "cursor-pointer" : "cursor-default"}`}
            >
              {certificateFile ? (
                certificateIsPDF ? (
                  <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 transition hover:bg-red-500/15">
                    <FaFilePdf className="text-5xl text-red-400" />
                    <p className="mt-3 font-semibold text-red-300">Certificate PDF</p>
                    <p className="mt-1 text-xs text-red-400/80">Click to view</p>
                  </div>
                ) : (
                  <img
                    src={certificateFile}
                    alt={certificate.title}
                    className="h-44 w-full rounded-xl object-cover shadow-sm transition hover:opacity-90"
                  />
                )
              ) : (
                <div className="flex h-44 w-full items-center justify-center rounded-xl bg-white/[0.04] text-slate-500">
                  No certificate file
                </div>
              )}
            </button>

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
              <FaCheckCircle size={12} />
              Verified
            </span>

            {certificate.featured && (
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
                <FaStar size={11} />
                Featured
              </span>
            )}

            {certificateFile && (
              <button
                type="button"
                onClick={() => setOpenCertificate(true)}
                className="mt-5 w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                {certificateIsPDF ? "View certificate PDF" : "View certificate"}
              </button>
            )}
          </div>

          {/* Right: details */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={FaBuilding} label="Issuer" value={certificate.issuer} />
              <InfoCard icon={FaCalendarAlt} label="Issue date" value={formatDate(certificate.issueDate)} />
              <InfoCard icon={FaIdCard} label="Credential ID" value={certificate.credentialID} />
              <InfoCard icon={FaCalendarAlt} label="Expiry" value={expiryText} />
            </div>

            {certificate.skills?.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-semibold text-white">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {certificate.credentialURL && (
              <div className="mt-8">
                <a
                  href={certificate.credentialURL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-white transition hover:bg-violet-500"
                >
                  View credential
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Preview modal */}
      <AnimatePresence>
        {openCertificate && certificateFile && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpenCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[95vh] max-w-[95vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenCertificate(false)}
                aria-label="Close"
                className="absolute -right-3 -top-3 z-20 rounded-full bg-white p-3 text-slate-900 shadow-lg transition hover:bg-slate-100"
              >
                <FaTimes />
              </button>

              {certificateIsPDF ? (
                <div className="overflow-hidden rounded-xl bg-white">
                  <iframe
                    src={certificateFile}
                    title={certificate.title}
                    className="h-[85vh] w-[90vw] bg-white md:w-[75vw] lg:w-[65vw]"
                  />
                </div>
              ) : (
                <img
                  src={certificateFile}
                  alt={certificate.title}
                  className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}