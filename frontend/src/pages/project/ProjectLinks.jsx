import React from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
} from "react-icons/fa";
export default function ProjectLinks({ liveDemo, videoDemo, githubLinks }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {liveDemo && (
        <a
          href={liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          Live Demo
          <FaExternalLinkAlt size={12} />
        </a>
      )}

      {githubLinks.map((github) => (
        <a
          key={github.label}
          href={github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          {github.label}
          <FaGithub size={14} />
        </a>
      ))}

      {videoDemo && (
        <a
          href={videoDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          Video Demo
          <FaPlay size={11} />
        </a>
      )}
    </div>
  );
}