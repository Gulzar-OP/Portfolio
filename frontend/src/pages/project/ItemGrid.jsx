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
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300"
        >
          <Icon className="mt-0.5 shrink-0 text-violet-400" size={14} />
          <span className="break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}