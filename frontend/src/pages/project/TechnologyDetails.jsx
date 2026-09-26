import React from "react";
import { getTechIcon, techLabel } from "./techIcons";

export default function TechnologyDetails({ technologies = [] }) {
  if (!technologies.length) {
    return <p className="text-sm text-gray-500">No technologies available.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {technologies.map((technology, i) => {
        const label = techLabel(technology);
        if (!label) return null;

        const { icon: Icon, color } = getTechIcon(label);

        return (
          <div
            key={technology._id || label || i}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-400/30"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
              <Icon size={20} style={{ color }} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm text-white">{label}</p>
              <p className="text-xs text-gray-400">Used in project</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}