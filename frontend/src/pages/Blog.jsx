import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock, FaUser } from "react-icons/fa";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.bl-root { font-family: 'Inter', system-ui, sans-serif; }
.bl-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

/* strip any HTML/markdown so raw content never leaks into the card as tags */
const plainText = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatDate = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Recently";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlogCard({ blog, index }) {
  const link = `/resources/blogs/${blog.slug || blog._id}`;
  const excerpt = plainText(blog.excerpt || blog.description || blog.content).slice(0, 160);

  return (
    <Reveal delay={(index % 6) * 0.06} className="h-full">
      <Link
        to={link}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.05]"
      >
        <div className="relative h-52 overflow-hidden bg-white/[0.04]">
          <img
            src={blog.thumbnail || "/bg.png"}
            alt={blog.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/10 to-transparent" />

          {blog.tags?.length > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs text-violet-200 backdrop-blur-md">
              {blog.tags[0]}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <FaUser size={11} /> {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock size={11} /> {formatDate(blog.createdAt)}
            </span>
          </div>

          <h2 className="bl-display mt-3 text-2xl font-bold transition group-hover:text-violet-300">
            {blog.title}
          </h2>

          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-400">
            {excerpt || "No description available."}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 border-t border-white/10 pt-4 text-sm font-medium text-violet-400 transition group-hover:gap-3">
            Read more <FaArrowRight size={12} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="h-52 bg-white/[0.04]" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-32 rounded bg-white/[0.06]" />
        <div className="h-6 w-3/4 rounded bg-white/[0.08]" />
        <div className="h-3 w-full rounded bg-white/[0.05]" />
        <div className="h-3 w-5/6 rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  useEffect(() => {
    let alive = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API}/api/v1/blogs`);
        if (alive) setBlogs(res.data?.blogs || []);
      } catch (err) {
        if (alive) {
          setBlogs([]);
          setError(err.response?.data?.message || "Unable to load blogs right now.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      alive = false;
    };
  }, []);

  const tags = useMemo(() => {
    const set = new Set(blogs.flatMap((b) => b.tags || []));
    return ["All", ...set];
  }, [blogs]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesTag = tag === "All" || b.tags?.includes(tag);
      const matchesQuery =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        plainText(b.excerpt || b.description || b.content).toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [blogs, query, tag]);

  return (
    <div className="bl-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-violet-400">Latest articles</p>
          <h1 className="bl-display mt-3 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Blog &amp; insights
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            Updates, ideas, tutorials and thoughts on web development, UI design and my technical journey.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
          />
        </Reveal>

        {tags.length > 2 && (
          <Reveal className="mt-5 flex flex-wrap justify-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  tag === t
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "border border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

          {!loading &&
            visible.map((blog, i) => <BlogCard key={blog._id} blog={blog} index={i} />)}
        </div>

        {!loading && error && (
          <Reveal className="mx-auto mt-16 max-w-md text-center">
            <p className="text-slate-400">{error}</p>
          </Reveal>
        )}

        {!loading && !error && visible.length === 0 && (
          <Reveal className="mx-auto mt-16 max-w-md text-center">
            <h2 className="text-xl font-semibold">No blogs found</h2>
            <p className="mt-3 text-slate-400">
              {blogs.length === 0 ? "New blog posts will appear here soon." : "Try a different search or tag."}
            </p>
          </Reveal>
        )}
      </main>
    </div>
  );
}