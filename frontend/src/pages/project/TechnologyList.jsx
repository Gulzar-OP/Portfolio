import React from "react";
import { getTechIcon, techLabel } from "./techIcons";

export default function TechnologyList({ technologies = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, i) => {
        const label = techLabel(tech);
        if (!label) return null;

        const { icon: Icon, color } = getTechIcon(label);

        return (
          <span
            key={tech._id || label || i}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 transition hover:border-violet-400/30 hover:bg-white/[0.08] sm:px-4"
          >
            <Icon size={14} style={{ color }} />
            <span className="max-w-[140px] truncate">{label}</span>
          </span>
        );
      })}
    </div>
  );
}