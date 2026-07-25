import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegEye,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaLink,
  FaGithub,
  FaGlobe,
  FaRegCopy,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";

const API = import.meta.env.VITE_API || "http://localhost:2000"

/* ---------- helpers ---------- */

function parseSections(rawContent) {
  if (!rawContent) return [];

  // If it looks like HTML already, just render it as a single html block
  if (/<[a-z][\s\S]*>/i.test(rawContent)) {
    return [{ type: "html", html: rawContent }];
  }

  const lines = rawContent.split("\n");
  const sections = [];
  let buffer = [];
  let codeBuffer = null;
  let codeLang = "text";

  const flushParagraph = () => {
    if (buffer.length) {
      sections.push({ type: "p", text: buffer.join(" ").trim() });
      buffer = [];
    }
  };

  lines.forEach((line) => {
    const codeFence = line.match(/^```(\w*)/);
    if (codeFence) {
      if (codeBuffer === null) {
        flushParagraph();
        codeBuffer = [];
        codeLang = codeFence[1] || "text";
      } else {
        sections.push({ type: "code", lang: codeLang, code: codeBuffer.join("\n") });
        codeBuffer = null;
      }
      return;
    }
    if (codeBuffer !== null) {
      codeBuffer.push(line);
      return;
    }

    const h2 = line.match(/^##\s+(.*)/);
    const quote = line.match(/^>\s+(.*)/);

    if (h2) {
      flushParagraph();
      sections.push({ type: "h2", text: h2[1].trim() });
    } else if (quote) {
      flushParagraph();
      sections.push({ type: "quote", text: quote[1].trim() });
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      buffer.push(line.trim());
    }
  });
  flushParagraph();
  return sections;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* clipboard blocked, ignore */
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] my-6">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <span className="text-xs font-mono text-gray-400">{lang}</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-300 transition"
        >
          {copied ? <FaCheck size={11} className="text-emerald-400" /> : <FaRegCopy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="px-5 py-4 overflow-x-auto text-[13px] leading-6">
        <code className="font-mono text-gray-200">{code}</code>
      </pre>
    </div>
  );
}

/* ---------- main component ---------- */

export default function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeHeading, setActiveHeading] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/api/v1/blogs/${slug}`);
        if (!ignore) {
          setBlog(res.data.blog || res.data);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setError("Blog not found.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBlog();
    return () => {
      ignore = true;
    };
  }, [slug]);

  const sections = useMemo(() => parseSections(blog?.content), [blog?.content]);

  const toc = useMemo(
    () => sections.filter((s) => s.type === "h2").map((s) => ({ text: s.text, id: slugify(s.text) })),
    [sections]
  );

  useEffect(() => {
    if (!toc.length) return;
    const onScroll = () => {
      let current = toc[0]?.id;
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) current = item.id;
      }
      setActiveHeading(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
    } catch (e) {
      /* ignore */
    }
  };

  /* ---------- loading / error states ---------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070a] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-24 bg-white/5 rounded" />
            <div className="h-9 w-2/3 bg-white/5 rounded" />
            <div className="h-4 w-1/3 bg-white/5 rounded" />
            <div className="h-80 bg-white/5 rounded-2xl" />
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-5/6" />
          </div>
          <div className="hidden lg:block animate-pulse space-y-6">
            <div className="h-40 bg-white/5 rounded-2xl" />
            <div className="h-52 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#07070a] text-white">
        <h1 className="text-2xl font-bold">{error || "Blog not found."}</h1>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition text-sm font-semibold"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  const author = blog.author || {};
  const authorName = typeof author === "string" ? author : author.name || "Admin";
  const authorRole = author.role || "Full Stack Developer";
  const authorAvatar = author.avatar ? `${URI}/${author.avatar}` : null;
  const authorBio =
    author.bio || "Passionate full-stack developer who loves building scalable web applications and sharing knowledge.";

  const readTime = blog.readTime || Math.max(1, Math.round((blog.content?.split(" ").length || 400) / 200));
  const views = blog.views ?? null;
  const category = blog.category || (blog.tags && blog.tags[0]) || "Web Development";

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Breadcrumb */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition text-sm font-medium mb-6"
        >
          <FaArrowLeft size={12} />
          Back to Blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* ---------------- Main column ---------------- */}
          <div>
            <span className="inline-block px-3 py-1 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-4">
              {category}
            </span>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
              {blog.createdAt && (
                <span className="inline-flex items-center gap-1.5">
                  <FaRegCalendarAlt size={11} />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <FaRegClock size={11} />
                {readTime} min read
              </span>
              {views !== null && (
                <span className="inline-flex items-center gap-1.5">
                  <FaRegEye size={11} />
                  {views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views} views
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {blog.title}
            </h1>

            {blog.description && (
              <p className="mt-5 text-lg text-gray-400 leading-8">{blog.description}</p>
            )}

            <div className="flex items-center justify-between mt-7 pb-7 border-b border-white/10">
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-sm font-semibold text-violet-300">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{authorName}</p>
                  <p className="text-xs text-gray-500">{authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden sm:inline mr-1">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-600/30 border border-white/10 flex items-center justify-center transition"
                >
                  <FaTwitter size={13} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-600/30 border border-white/10 flex items-center justify-center transition"
                >
                  <FaLinkedin size={13} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-600/30 border border-white/10 flex items-center justify-center transition"
                >
                  <FaFacebookF size={13} />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-600/30 border border-white/10 flex items-center justify-center transition"
                >
                  {copiedLink ? <FaCheck size={12} className="text-emerald-400" /> : <FaLink size={12} />}
                </button>
              </div>
            </div>

            {/* Cover image */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] mt-8">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-72 md:h-96 object-cover group-hover:scale-110"
              />
            </div>

            {/* Article body */}
            <article className="mt-10 text-[17px] leading-8 text-gray-300">
              {sections.length === 0 && <p className="text-gray-400">No content available.</p>}

              {sections.map((s, i) => {
                if (s.type === "html") {
                  return <div key={i} dangerouslySetInnerHTML={{ __html: s.html }} />;
                }
                if (s.type === "h2") {
                  return (
                    <h2
                      key={i}
                      id={slugify(s.text)}
                      className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 scroll-mt-28"
                    >
                      {s.text}
                    </h2>
                  );
                }
                if (s.type === "code") {
                  return <CodeBlock key={i} lang={s.lang} code={s.code} />;
                }
                if (s.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="flex gap-4 my-8 px-6 py-5 rounded-xl bg-violet-600/[0.07] border border-violet-500/20"
                    >
                      <FaQuoteLeft className="text-violet-400 shrink-0 mt-1" size={20} />
                      <p className="text-lg text-gray-200 italic leading-8">{s.text}</p>
                    </blockquote>
                  );
                }
                return (
                  <p key={i} className="mb-5">
                    {s.text}
                  </p>
                );
              })}
            </article>

            {/* Tags (mobile / inline) */}
            {blog.tags?.length > 0 && (
              <div className="flex gap-2 mt-10 flex-wrap">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-violet-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Prev / Next */}
            {(blog.prevPost || blog.nextPost) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                {blog.prevPost ? (
                  <Link
                    to={`/blogs/${blog.prevPost.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-violet-500/40 transition"
                  >
                    <FaArrowLeft className="text-violet-400 shrink-0" size={14} />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Previous Post</p>
                      <p className="text-sm font-semibold truncate group-hover:text-violet-300 transition">
                        {blog.prevPost.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {blog.nextPost && (
                  <Link
                    to={`/blogs/${blog.nextPost.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-violet-500/40 transition text-right sm:justify-end"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Next Post</p>
                      <p className="text-sm font-semibold truncate group-hover:text-violet-300 transition">
                        {blog.nextPost.title}
                      </p>
                    </div>
                    <FaArrowRight className="text-violet-400 shrink-0" size={14} />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* ---------------- Sidebar ---------------- */}
          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
            {/* About the author */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-sm font-semibold text-gray-400 mb-4">About the Author</p>
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-base font-semibold text-violet-300">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{authorName}</p>
                  <p className="text-xs text-violet-400">{authorRole}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4 leading-6">{authorBio}</p>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="text-gray-500 hover:text-violet-300 transition">
                  <FaGithub size={15} />
                </a>
                <a href="#" className="text-gray-500 hover:text-violet-300 transition">
                  <FaLinkedin size={15} />
                </a>
                <a href="#" className="text-gray-500 hover:text-violet-300 transition">
                  <FaTwitter size={15} />
                </a>
                <a href="#" className="text-gray-500 hover:text-violet-300 transition">
                  <FaGlobe size={15} />
                </a>
              </div>
            </div>

            {/* Table of contents */}
            {toc.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm font-semibold text-gray-400 mb-3">Table of Contents</p>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block py-1.5 pl-3 text-sm border-l-2 transition ${
                          activeHeading === item.id
                            ? "border-violet-500 text-violet-300 font-medium"
                            : "border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/30"
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related posts */}
            {blog.relatedPosts?.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm font-semibold text-gray-400 mb-4">Related Posts</p>
                <div className="space-y-4">
                  {blog.relatedPosts.map((post, i) => (
                    <Link
                      key={i}
                      to={`/blogs/${post.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-violet-600/40 to-fuchsia-600/20 flex items-center justify-center">
                        {post.image ? (
                          <img
                            src={blog.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-violet-200 font-bold">
                            {post.title?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-5 truncate group-hover:text-violet-300 transition">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {post.createdAt &&
                            new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          {post.readTime ? ` · ${post.readTime} min read` : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition mt-4"
                >
                  View All Posts
                  <FaArrowRight size={11} />
                </Link>
              </div>
            )}

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm font-semibold text-gray-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-violet-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}