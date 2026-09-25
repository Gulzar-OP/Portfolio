import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

/* ---- edit your real details here ---- */
const CONTACT = {
  email: "gulzarhu80@gmail.com",
  phone: "+91XXXXXXXXXX", // TODO: replace with your real number
  whatsapp: "", // e.g. "https://wa.me/91XXXXXXXXXX" — leave empty to hide the button
  location: "Nasirganj, Barsoi, Katihar, Bihar, India",
};

const EMPTY_FORM = { name: "", email: "", subject: "", message: "", phone: "" };
const MESSAGE_MAX = 1000;

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.ct-root { font-family: 'Inter', system-ui, sans-serif; }
.ct-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30";

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      <input className={inputClass} {...props} />
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(`${API}/api/v1/contact`, form);
      setSuccess(res.data?.message || "Message sent successfully.");
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { icon: FaEnvelope, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, accent: "text-violet-400 bg-violet-500/10" },
    { icon: FaPhoneAlt, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`, accent: "text-emerald-400 bg-emerald-500/10" },
    { icon: FaMapMarkerAlt, label: "Location", value: CONTACT.location, href: null, accent: "text-pink-400 bg-pink-500/10" },
  ];

  return (
    <div className="ct-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-violet-400">Contact me</p>
          <h1 className="ct-display mt-3 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Let&apos;s build something great
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            If you have a project, an idea or a collaboration in mind, send me a message
            and I&apos;ll get back to you soon.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* ---------- left: contact info ---------- */}
          <Reveal className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8">
              <h2 className="ct-display text-2xl font-bold">Contact information</h2>

              <div className="mt-6 space-y-3">
                {infoItems.map(({ icon: Icon, label, value, href, accent }) => {
                  const content = (
                    <>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent}`}>
                        <Icon />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">{label}</p>
                        <p className="truncate font-medium text-slate-100">{value}</p>
                      </div>
                    </>
                  );
                  const rowClass =
                    "flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition";

                  return href ? (
                    <a key={label} href={href} className={`${rowClass} hover:border-violet-400/40 hover:bg-white/[0.05]`}>
                      {content}
                    </a>
                  ) : (
                    <div key={label} className={rowClass}>
                      {content}
                    </div>
                  );
                })}
              </div>

              {CONTACT.whatsapp && (
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
                >
                  <FaWhatsapp size={16} />
                  Chat on WhatsApp
                </a>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-6 text-slate-400">
              I usually reply within a day. For urgent queries, email is the fastest way to reach me.
            </div>
          </Reveal>

          {/* ---------- right: form ---------- */}
          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8"
            >
              <h2 className="ct-display text-2xl font-bold">Send a message</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required maxLength={80} />
                <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required maxLength={120} />
              </div>

              <div className="mt-4">
                <Field label="Phone (optional)" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" maxLength={20} />
              </div>

              <div className="mt-4">
                <Field label="Subject" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" required maxLength={120} />
              </div>

              <div className="mt-4">
                <label className="block">
                  <span className="mb-1.5 flex items-baseline justify-between text-xs font-medium text-slate-500">
                    Message
                    <span className="tabular-nums text-slate-600">{form.message.length}/{MESSAGE_MAX}</span>
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    required
                    maxLength={MESSAGE_MAX}
                    className={`${inputClass} resize-none`}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaPaperPlane size={14} />
                {loading ? "Sending…" : "Send message"}
              </button>

              <div aria-live="polite" className="mt-4 space-y-3">
                {success && (
                  <p className="flex items-start gap-2 rounded-xl bg-emerald-900/20 p-3 text-sm text-emerald-300">
                    <FaCheckCircle className="mt-0.5 shrink-0" />
                    {success}
                  </p>
                )}
                {error && (
                  <p className="flex items-start gap-2 rounded-xl bg-red-900/20 p-3 text-sm text-red-300">
                    <FaExclamationTriangle className="mt-0.5 shrink-0" />
                    {error}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </main>
    </div>
  );
}