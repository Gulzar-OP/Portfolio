import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaRocket } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05060a] px-4 text-white">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

      <section className="relative z-10 w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-2xl shadow-violet-500/10">
          <FaRocket size={30} />
        </div>

        {/* Content */}
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-300">
          Stay Tuned
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Coming
          <span className="text-violet-500"> Soon</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
          We are working on something exciting. This page will be available
          soon with new features and improvements.
        </p>

        {/* Progress dots */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-300 [animation-delay:300ms]" />
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
        >
          <FaArrowLeft size={12} />
          Back to Home
        </Link>
      </section>
    </main>
  );
}