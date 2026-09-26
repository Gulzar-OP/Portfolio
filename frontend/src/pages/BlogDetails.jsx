import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaLink,
  FaLinkedin,
  FaQuoteLeft,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegCopy,
  FaRegEye,
  FaTwitter,
} from "react-icons/fa";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
.bd-root { font-family: 'Inter', system-ui, sans-serif; }
.bd-display { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.03em; }
`;

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

/* resolve an avatar/thumbnail path whether the API already returns a full
   URL or just a filename that needs the API host prefixed */
function resolveMedia(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
  return `${API}/${path}`;
}

function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked, ignore */
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <span className="font-mono text-xs text-gray-400">{lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 transition hover:text-violet-300"
        >
          {copied ? <FaCheck size={11} className="text-emerald-400" /> : <FaRegCopy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-6">
        <code className="font-mono text-gray-200">{code}</code>
      </pre>
    </div>
  );
}

/* an icon-only social link that hides itself when there's no real URL,
   instead of rendering a dead href="#" */
function SocialIcon({ href, icon: Icon, label, size = 15 }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:border-violet-500/40 hover:bg-violet-600/20 hover:text-violet-300"
    >
      <Icon size={size} />
    </a>
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
        if (!ignore) setError(err.response?.data?.message || "Blog not found.");
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
    } catch {
      /* ignore */
    }
  };

  /* ---------- loading / error states ---------- */

  if (loading) {
    return (
      <div className="bd-root min-h-screen bg-[#07070d] text-white">
        <style>{FONT_CSS}</style>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_320px]">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-24 rounded bg-white/5" />
            <div className="h-9 w-2/3 rounded bg-white/5" />
            <div className="h-4 w-1/3 rounded bg-white/5" />
            <div className="h-80 rounded-2xl bg-white/5" />
            <div className="h-4 w-full rounded bg-white/5" />
            <div className="h-4 w-5/6 rounded bg-white/5" />
          </div>
          <div className="hidden animate-pulse space-y-6 lg:block">
            <div className="h-40 rounded-2xl bg-white/5" />
            <div className="h-52 rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bd-root flex min-h-screen flex-col items-center justify-center bg-[#07070d] text-white">
        <style>{FONT_CSS}</style>
        <h1 className="text-2xl font-bold">{error || "Blog not found."}</h1>
        <Link
          to="/resources/blogs"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <FaArrowLeft size={12} />
          Back to blogs
        </Link>
      </div>
    );
  }

  const author = blog.author || {};
  const authorName = typeof author === "string" ? author : author.name || "Admin";
  const authorRole = author.role || "Full Stack Developer";
  const authorAvatar = resolveMedia(author.avatar);
  const authorBio =
    author.bio ||
    "Passionate full-stack developer who loves building scalable web applications and sharing knowledge.";
  const authorSocials = author.socials || {};

  const readTime = blog.readTime || Math.max(1, Math.round((blog.content?.split(" ").length || 400) / 200));
  const views = blog.views ?? null;
  const category = blog.category || (blog.tags && blog.tags[0]) || "Web Development";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="bd-root relative min-h-screen overflow-x-clip bg-[#07070d] text-white">
      <style>{FONT_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <Link
          to="/resources/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          <FaArrowLeft size={12} />
          Back to blogs
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* ---------------- Main column ---------------- */}
          <div className="min-w-0">
            <span className="mb-4 inline-block rounded-lg border border-violet-500/30 bg-violet-600/20 px-3 py-1 text-xs font-semibold text-violet-300">
              {category}
            </span>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
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

            <h1 className="bd-display break-words text-3xl font-extrabold leading-tight md:text-5xl">
              {blog.title}
            </h1>

            {blog.description && (
              <p className="mt-5 text-lg leading-8 text-gray-400">{blog.description}</p>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-7">
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="h-10 w-10 rounded-full border border-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/30 bg-violet-600/30 text-sm font-semibold text-violet-300">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{authorName}</p>
                  <p className="text-xs text-gray-500">{authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="mr-1 hidden text-xs text-gray-500 sm:inline">Share:</span>
                <SocialIcon
                  href={shareUrl && `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                  icon={FaTwitter}
                  label="Share on Twitter"
                  size={13}
                />
                <SocialIcon
                  href={
                    shareUrl && `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                  }
                  icon={FaLinkedin}
                  label="Share on LinkedIn"
                  size={13}
                />
                <SocialIcon
                  href={shareUrl && `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  icon={FaFacebookF}
                  label="Share on Facebook"
                  size={13}
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-violet-600/30"
                >
                  {copiedLink ? <FaCheck size={12} className="text-emerald-400" /> : <FaLink size={12} />}
                </button>
              </div>
            </div>

            {/* Cover image */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <img
                src={blog.thumbnail || "/bg.png"}
                alt={blog.title}
                className="h-72 w-full object-cover md:h-96"
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
                      className="mb-4 mt-12 scroll-mt-28 text-2xl font-bold text-white md:text-3xl"
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
                      className="my-8 flex gap-4 rounded-xl border border-violet-500/20 bg-violet-600/[0.07] px-6 py-5"
                    >
                      <FaQuoteLeft className="mt-1 shrink-0 text-violet-400" size={20} />
                      <p className="text-lg italic leading-8 text-gray-200">{s.text}</p>
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
              <div className="mt-10 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-violet-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Prev / Next */}
            {(blog.prevPost || blog.nextPost) && (
              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {blog.prevPost ? (
                  <Link
                    to={`/resources/blogs/${blog.prevPost.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-violet-500/40"
                  >
                    <FaArrowLeft className="shrink-0 text-violet-400" size={14} />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Previous post</p>
                      <p className="truncate text-sm font-semibold transition group-hover:text-violet-300">
                        {blog.prevPost.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {blog.nextPost && (
                  <Link
                    to={`/resources/blogs/${blog.nextPost.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition hover:border-violet-500/40 sm:justify-end"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Next post</p>
                      <p className="truncate text-sm font-semibold transition group-hover:text-violet-300">
                        {blog.nextPost.title}
                      </p>
                    </div>
                    <FaArrowRight className="shrink-0 text-violet-400" size={14} />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* ---------------- Sidebar ---------------- */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            {/* About the author */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="mb-4 text-sm font-semibold text-gray-400">About the author</p>
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="h-12 w-12 rounded-full border border-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/30 bg-violet-600/30 text-base font-semibold text-violet-300">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{authorName}</p>
                  <p className="text-xs text-violet-400">{authorRole}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-400">{authorBio}</p>

              <div className="mt-4 flex items-center gap-3">
                <SocialIcon href={authorSocials.github} icon={FaGithub} label="GitHub" />
                <SocialIcon href={authorSocials.linkedin} icon={FaLinkedin} label="LinkedIn" />
                <SocialIcon href={authorSocials.twitter} icon={FaTwitter} label="Twitter" />
                <SocialIcon href={authorSocials.website} icon={FaGlobe} label="Website" />
              </div>
            </div>

            {/* Table of contents */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="mb-3 text-sm font-semibold text-gray-400">Table of contents</p>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block border-l-2 py-1.5 pl-3 text-sm transition ${
                          activeHeading === item.id
                            ? "border-violet-500 font-medium text-violet-300"
                            : "border-white/10 text-gray-400 hover:border-white/30 hover:text-gray-200"
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
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="mb-4 text-sm font-semibold text-gray-400">Related posts</p>
                <div className="space-y-4">
                  {blog.relatedPosts.map((post) => (
                    <Link
                      key={post._id || post.slug}
                      to={`/resources/blogs/${post.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-600/40 to-fuchsia-600/20">
                        {post.thumbnail || post.image ? (
                          <img
                            src={post.thumbnail || post.image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-violet-200">
                            {post.title?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium leading-5 transition group-hover:text-violet-300">
                          {post.title}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
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
                  to="/resources/blogs"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-400 transition hover:text-violet-300"
                >
                  View all posts
                  <FaArrowRight size={11} />
                </Link>
              </div>
            )}

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="mb-3 text-sm font-semibold text-gray-400">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-violet-300"
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