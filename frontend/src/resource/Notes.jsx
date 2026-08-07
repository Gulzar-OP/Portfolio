import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Clock,
  BookOpen,
  Sparkles,
  Braces,
  Atom,
  Database,
  Server,
  Table2,
  Boxes,
  Network,
  Library,
} from 'lucide-react';

const categories = [
  { name: 'All Notes', count: 48, active: true },
  { name: 'JavaScript', count: 12 },
  { name: 'React', count: 8 },
  { name: 'Node.js', count: 6 },
  { name: 'MongoDB', count: 5 },
  { name: 'Express.js', count: 4 },
  { name: 'SQL', count: 4 },
  { name: 'DSA', count: 5 },
  { name: 'System Design', count: 4 },
];

const notes = [
  {
    icon: Braces,
    tint: 'bg-orange-500/15 text-orange-400',
    title: 'JavaScript Closures',
    desc: 'Understand closures with examples',
    tag: 'JavaScript',
    tagColor: 'bg-orange-500/15 text-orange-400',
    readTime: '6 min read',
    date: 'Aug 06, 2025',
  },
  {
    icon: Atom,
    tint: 'bg-sky-500/15 text-sky-400',
    title: 'React Hooks Summary',
    desc: 'All React hooks explained',
    tag: 'React',
    tagColor: 'bg-sky-500/15 text-sky-400',
    readTime: '8 min read',
    date: 'Aug 06, 2025',
  },
  {
    icon: Database,
    tint: 'bg-emerald-500/15 text-emerald-400',
    title: 'MongoDB Aggregation Pipeline',
    desc: 'Complete notes on aggregation',
    tag: 'MongoDB',
    tagColor: 'bg-emerald-500/15 text-emerald-400',
    readTime: '10 min read',
    date: 'Aug 06, 2025',
  },
  {
    icon: Server,
    tint: 'bg-lime-500/15 text-lime-400',
    title: 'Express.js Middleware',
    desc: 'Types of middleware in Express',
    tag: 'Node.js',
    tagColor: 'bg-lime-500/15 text-lime-400',
    readTime: '7 min read',
    date: 'Aug 05, 2025',
  },
  {
    icon: Table2,
    tint: 'bg-violet-500/15 text-violet-400',
    title: 'SQL Joins',
    desc: 'All types of joins with examples',
    tag: 'SQL',
    tagColor: 'bg-violet-500/15 text-violet-400',
    readTime: '9 min read',
    date: 'Aug 05, 2025',
  },
  {
    icon: Boxes,
    tint: 'bg-rose-500/15 text-rose-400',
    title: 'Data Structures - Arrays',
    desc: 'Important array questions and notes',
    tag: 'DSA',
    tagColor: 'bg-rose-500/15 text-rose-400',
    readTime: '12 min read',
    date: 'Aug 04, 2025',
  },
  {
    icon: Network,
    tint: 'bg-teal-500/15 text-teal-400',
    title: 'System Design Basics',
    desc: 'Key concepts of system design',
    tag: 'System Design',
    tagColor: 'bg-teal-500/15 text-teal-400',
    readTime: '15 min read',
    date: 'Aug 04, 2025',
  },
];

function NotesGraphic() {
  return (
    <div className="relative hidden md:flex items-center justify-center w-56 h-40">
      <div className="absolute w-48 h-32 bg-white rounded-md shadow-2xl shadow-emerald-500/10 rotate-[-3deg]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-slate-200" />
        <div className="absolute left-3 top-4 w-16 h-1.5 rounded bg-slate-300" />
        <div className="absolute left-3 top-8 w-14 h-1.5 rounded bg-slate-200" />
        <div className="absolute left-3 top-12 w-16 h-1.5 rounded bg-slate-300" />
        <div className="absolute right-3 top-4 w-16 h-1.5 rounded bg-emerald-200" />
        <div className="absolute right-3 top-8 w-14 h-1.5 rounded bg-slate-200" />
      </div>
      <div className="absolute right-6 top-2 w-6 h-8 bg-amber-300 rotate-6 rounded-sm shadow-md" />
      <div className="absolute right-2 bottom-4 w-14 h-1 bg-emerald-500 rotate-[-30deg] rounded-full" />
    </div>
  );
}

export default function Notes() {
  const [activeCategory, setActiveCategory] = useState('All Notes');

  return (
    <div className="min-h-screen bg-[#080b14] text-white font-sans">

      <main className="max-w-6xl mx-auto px-8 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-slate-500 mb-6">
          Resources <span className="mx-1">›</span>{' '}
          <span className="text-slate-300">Notes</span>
        </p>

        {/* Header */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="max-w-xl">
            <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold mb-3">
              <BookOpen className="text-emerald-400" size={30} />
              Notes
            </h1>
            <p className="text-slate-400 leading-relaxed">
              Quick revision notes, concept explanations and topic summaries to
              strengthen your fundamentals.
            </p>
          </div>
          <NotesGraphic />
        </section>

        {/* Search + Sort */}
        <section className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 flex items-center gap-2 bg-[#0d1220] border border-white/5 rounded-lg px-4 py-2.5">
            <Search size={16} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search notes..."
              className="bg-transparent outline-none text-sm placeholder:text-slate-500 w-full"
            />
          </div>
          <button className="flex items-center justify-between gap-2 bg-[#0d1220] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-slate-300 min-w-[160px]">
            Sort by: Newest
            <ChevronDown size={14} />
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-[#0d1220] border border-white/5 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-3 text-slate-200">Categories</h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === cat.name
                          ? 'bg-emerald-500/15 text-emerald-400 font-medium'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={
                          activeCategory === cat.name
                            ? 'text-emerald-400 text-xs'
                            : 'text-slate-600 text-xs'
                        }
                      >
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0d1220] border border-white/5 rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-2 text-amber-400">
                <Sparkles size={14} /> Quick Tip
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Use these notes for quick revision before interviews and exams.
              </p>
              <div className="flex justify-center">
                <Library size={44} className="text-emerald-500/70" />
              </div>
            </div>
          </aside>

          {/* Notes list */}
          <section className="bg-[#0d1220] border border-white/5 rounded-xl divide-y divide-white/5">
            {notes.map(({ icon: Icon, tint, title, desc, tag, tagColor, readTime, date }) => (
              <button
                key={title}
                className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
              >
                <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${tint}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold mb-0.5">{title}</h4>
                  <p className="text-xs text-slate-500 mb-2">{desc}</p>
                  <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${tagColor}`}>
                    {tag}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    {readTime}
                  </span>
                  <span className="text-xs text-slate-600">{date}</span>
                  <Bookmark size={14} className="text-slate-600 hover:text-emerald-400 transition-colors" />
                </div>
              </button>
            ))}
          </section>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white/5">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                page === 1
                  ? 'bg-emerald-500 text-white font-medium'
                  : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white/5">
            <ChevronRight size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}