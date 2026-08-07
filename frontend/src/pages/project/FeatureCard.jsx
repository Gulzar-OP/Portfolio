import React from "react";
import {
  FaAlignLeft,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaCube,
  FaExternalLinkAlt,
  FaFlag,
  FaGithub,
  FaLayerGroup,
  FaPlay,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegCheckCircle,
  FaRegClock,
  FaSearchPlus,
  FaStar,
  FaUserAlt,
} from "react-icons/fa";

export default function FeatureCard({ features }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold sm:text-lg">
        <FaStar className="text-violet-400" size={14} />
        Key Features
      </h3>

      {features.length > 0 ? (
        <ul className="space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-gray-300"
            >
              <FaCheckCircle
                className="mt-0.5 shrink-0 text-violet-400"
                size={14}
              />
              <span className="break-words">{feature}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No features available.</p>
      )}
    </div>
  );
}