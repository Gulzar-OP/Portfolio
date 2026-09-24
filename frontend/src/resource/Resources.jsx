import React from 'react';
import {
  FileText,
  BookOpen,
  ClipboardList,
  MessageSquareText,
  Map,
  Download,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';


const categories = [
  {
    icon: FileText,
    title: 'Articles / Blogs',
    count: '22 Articles',
    click: './resources/blogs',
    desc: 'In-depth articles on web development, backend, databases, cloud and more.',
    tint: 'bg-violet-500/15 text-violet-400',
  },
  {
    icon: BookOpen,
    title: 'Notes',
    count: '48 Notes',
    click: './coming-soon',
    desc: 'Quick revision notes, concept explanations and topic summaries.',
    tint: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: ClipboardList,
    title: 'Cheat Sheets',
    count: '16 Cheat Sheets',
    click: './coming-soon',
    desc: 'Handy cheat sheets for fast reference and productivity.',
    tint: 'bg-sky-500/15 text-sky-400',
  },
  {
    icon: MessageSquareText,
    title: 'Interview Prep',
    count: '30 Questions',
    click: './coming-soon',
    desc: 'Interview questions, answers and company-wise preparation.',
    tint: 'bg-orange-500/15 text-orange-400',
  },
  {
    icon: Map,
    title: 'Roadmaps',
    count: '10 Roadmaps',
    click: './coming-soon',
    desc: 'Step-by-step roadmaps to guide your learning journey.',
    tint: 'bg-teal-500/15 text-teal-400',
  },
  {
    icon: Download,
    title: 'Downloads',
    count: '12 Resources',
    click: './coming-soon',
    desc: 'E-books, templates, important links and useful downloads.',
    tint: 'bg-rose-500/15 text-rose-400',
  },
];

const recentlyAdded = [
  {
    icon: BookOpen,
    tint: 'bg-orange-500/15 text-orange-400',
    title: 'MongoDB Aggregation Pipeline Notes',
    desc: 'Complete notes on aggregation with examples',
    tag: 'Notes',
    tagColor: 'bg-emerald-500/15 text-emerald-400',
    date: 'Aug 06, 2025',
  },
  {
    icon: FileText,
    tint: 'bg-violet-500/15 text-violet-400',
    title: 'How I Built a Scalable MERN Blog',
    desc: 'Step by step breakdown of the project',
    tag: 'Articles',
    tagColor: 'bg-violet-500/15 text-violet-400',
    date: 'Aug 05, 2025',
  },
  {
    icon: ClipboardList,
    tint: 'bg-sky-500/15 text-sky-400',
    title: 'JavaScript Array Methods Cheat Sheet',
    desc: 'All important array methods in one place',
    tag: 'Cheat Sheet',
    tagColor: 'bg-sky-500/15 text-sky-400',
    date: 'Aug 04, 2025',
  },
  {
    icon: MessageSquareText,
    tint: 'bg-orange-500/15 text-orange-400',
    title: 'React Interview Questions',
    desc: 'Top 50 React interview questions',
    tag: 'Interview Prep',
    tagColor: 'bg-orange-500/15 text-orange-400',
    date: 'Aug 03, 2025',
  },
];


function HeroGraphic() {
  const chips = [
    { icon: BookOpen, className: 'bg-violet-500 -translate-y-6 -translate-x-2' },
    { icon: ClipboardList, className: 'bg-emerald-500 -translate-y-2 translate-x-10' },
    { icon: FileText, className: 'bg-sky-500 translate-y-6 -translate-x-8' },
    { icon: Download, className: 'bg-rose-500 translate-y-10 translate-x-6' },
  ];
  return (
    <div className="relative hidden md:flex items-center justify-center w-64 h-48">
      <div className="absolute w-40 h-24 bottom-0 rounded-md bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl" />
      <div className="absolute w-48 h-4 bottom-[-6px] rounded-b-md bg-slate-700" />
      {chips.map(({ icon: Icon, className }, i) => (
        <div
          key={i}
          className={`absolute w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20 ${className}`}
        >
          <Icon size={20} />
        </div>
      ))}
    </div>
  );
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#080b14] text-white font-sans">

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-10 mb-14">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Resources</h1>
            <p className="text-slate-400 leading-relaxed">
              A curated collection of blogs, notes, cheat sheets, interview prep materials
              and roadmaps to help you learn and grow.
            </p>
          </div>
          <HeroGraphic />
        </section>

        {/* Explore Categories */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <h2 className="text-lg font-semibold">Explore Categories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(({ icon: Icon, title, count, desc, tint ,click}) => (
              <button
                key={title}
                className="group text-left bg-[#0d1220] border border-white/5 rounded-xl p-5 hover:border-violet-500/40 hover:-translate-y-0.5 transition-all"
                onClick={() => window.location.href = click}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${tint}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-xs text-slate-500 mb-3">{count}</p>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-slate-300 group-hover:text-violet-400 group-hover:gap-2 transition-all">
                  <ArrowRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <h2 className="text-lg font-semibold">Recently Added</h2>
            </div>
            <button className="text-sm text-violet-400 flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-[#0d1220] border border-white/5 rounded-xl divide-y divide-white/5">
            {recentlyAdded.map(({ icon: Icon, tint, title, desc, tag, tagColor, date }) => (
              <div key={title} className="flex items-center gap-4 px-5 py-4">
                <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${tint}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{title}</h4>
                  <p className="text-xs text-slate-500 truncate">{desc}</p>
                </div>
                <span className={`hidden sm:inline-block text-xs px-2.5 py-1 rounded-full font-medium ${tagColor}`}>
                  {tag}
                </span>
                <span className="text-xs text-slate-500 w-24 text-right shrink-0">{date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex items-center justify-between bg-[#0d1220] border border-white/5 rounded-xl px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center">
              <Lightbulb size={18} />
            </div>
            <div>
              <h4 className="font-semibold">Keep Learning, Keep Building</h4>
              <p className="text-sm text-slate-500">Consistent learning is the key to becoming a better developer.</p>
            </div>
          </div>
          <button className="bg-violet-500 hover:bg-violet-400 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg shrink-0">
            Explore Now
          </button>
        </section>
      </main>
    </div>
  );
}