import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.nf-root { font-family: 'Inter', system-ui, sans-serif; }
.nf-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

export default function NotFound() {
  return (
    <div className="nf-root relative flex min-h-screen flex-col items-center justify-center overflow-x-clip bg-[#07070d] px-6 text-center text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative"
      >
        <p className="nf-display text-[7rem] font-extrabold leading-none text-white/10 sm:text-[9rem]">
          404
        </p>
        <h1 className="nf-display -mt-6 text-3xl font-extrabold sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
          >
            <FaHome size={14} />
            Go back home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/[0.06]"
          >
            <FaArrowLeft size={12} />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
}