import React from "react";

export default function TechnologyDetails({ technologies }) {
  if (!technologies.length) {
    return (
      <p className="text-sm text-gray-500">
        No technologies available.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {technologies.map((technology) => {
        const { icon: Icon, color } = getTechIcon(technology);

        return (
          <div
            key={technology}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
              <Icon size={20} style={{ color }} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm text-white">{technology}</p>
              <p className="text-xs text-gray-400">Used in project</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}