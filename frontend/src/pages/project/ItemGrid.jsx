import React from "react";

export default function ItemGrid({ items, icon: Icon }) {
  if (!items.length) {
    return (
      <p className="text-sm text-gray-500">
        No information available for this section.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item, index) => {
        const isChallenge = item && typeof item === "object" && ("problem" in item || "solution" in item);

        return (
          <li
            key={item?._id || (typeof item === "string" ? item : index)}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300"
          >
            <Icon className="mt-0.5 shrink-0 text-violet-400" size={14} />

            {isChallenge ? (
              <div className="min-w-0 space-y-1">
                {item.problem && (
                  <p className="break-words text-gray-200">
                    <span className="font-medium text-white">Problem: </span>
                    {item.problem}
                  </p>
                )}
                {item.solution && (
                  <p className="break-words text-gray-400">
                    <span className="font-medium text-gray-300">Solution: </span>
                    {item.solution}
                  </p>
                )}
              </div>
            ) : (
              <span className="break-words">{item}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}