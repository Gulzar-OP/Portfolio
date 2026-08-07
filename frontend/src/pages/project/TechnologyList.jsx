
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
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiHtml5,
  SiCss,
  SiSass,
  SiFramer,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiSupabase,
  SiRedux,
  SiAxios,
  SiSocketdotio,
  SiJsonwebtokens,
  SiStripe,
  SiCloudinary,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiPostman,
  SiPython,
  SiNpm,
  SiYarn,
  SiVite,
} from "react-icons/si";


import { FaC, FaJava, FaRobot } from "react-icons/fa6";

const getTechIcon = (technology = "") => {
  const key = technology.trim().toLowerCase();

  return (
    TECH_ICON_MAP[key] || {
      icon: FaLayerGroup,
      color: "#A78BFA",
    }
  );
};
    const TECH_ICON_MAP = {
      react: { icon: SiReact, color: "#61DAFB" },
      nextjs: { icon: SiNextdotjs, color: "#FFFFFF" },
      vue: { icon: SiVuedotjs, color: "#42B883" },
    
      html: { icon: SiHtml5, color: "#E34F26" },
      html5: { icon: SiHtml5, color: "#E34F26" },
    
      css: { icon: SiCss, color: "#1572B6" },
      css3: { icon: SiCss, color: "#1572B6" },
    
      javascript: { icon: SiJavascript, color: "#F7DF1E" },
      typescript: { icon: SiTypescript, color: "#3178C6" },
    
      tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
      "tailwind css": { icon: SiTailwindcss, color: "#38BDF8" },
    
      sass: { icon: SiSass, color: "#CC6699" },
    
      node: { icon: SiNodedotjs, color: "#3C873A" },
      nodejs: { icon: SiNodedotjs, color: "#3C873A" },
      "node.js": { icon: SiNodedotjs, color: "#3C873A" },
    
      express: { icon: SiExpress, color: "#FFFFFF" },
      "express.js": { icon: SiExpress, color: "#FFFFFF" },
    
      mongodb: { icon: SiMongodb, color: "#47A248" },
      mongoose: { icon: SiMongoose, color: "#880000" },
      mysql: { icon: SiMysql, color: "#4479A1" },
      postgresql: { icon: SiPostgresql, color: "#336791" },
    
      firebase: { icon: SiFirebase, color: "#FFCA28" },
      supabase: { icon: SiSupabase, color: "#3ECF8E" },
    
      redux: { icon: SiRedux, color: "#764ABC" },
      "redux toolkit": { icon: SiRedux, color: "#764ABC" },
    
      axios: { icon: SiAxios, color: "#5A29E4" },
      socketio: { icon: SiSocketdotio, color: "#FFFFFF" },
      "socket.io": { icon: SiSocketdotio, color: "#FFFFFF" },
    
      jwt: { icon: SiJsonwebtokens, color: "#D63AFF" },
      "json web token": { icon: SiJsonwebtokens, color: "#D63AFF" },
    
      stripe: { icon: SiStripe, color: "#635BFF" },
      cloudinary: { icon: SiCloudinary, color: "#3448C5" },
    
      framer: { icon: SiFramer, color: "#0055FF" },
      "framer motion": { icon: SiFramer, color: "#0055FF" },
    
      git: { icon: SiGit, color: "#F05032" },
      github: { icon: SiGithub, color: "#FFFFFF" },
      vercel: { icon: SiVercel, color: "#FFFFFF" },
      netlify: { icon: SiNetlify, color: "#00C7B7" },
      docker: { icon: SiDocker, color: "#2496ED" },
      postman: { icon: SiPostman, color: "#FF6C37" },
    
      python: { icon: SiPython, color: "#3776AB" },
      java: { icon: FaJava, color: "#F89820" },
      c: { icon: FaC, color: "#A8B9CC" },
    
      openai: { icon: FaRobot, color: "#10A37F" },
      gemini: { icon: FaRobot, color: "#4285F4" },
    
      npm: { icon: SiNpm, color: "#CB3837" },
      yarn: { icon: SiYarn, color: "#2C8EBB" },
      vite: { icon: SiVite, color: "#646CFF" },
    };
export default function TechnologyList({ technologies }) {

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((technology) => {
        const { icon: Icon, color } = getTechIcon(technology);

        return (
          <span
            key={technology}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 sm:px-4"
          >
            <Icon size={14} style={{ color }} />
            <span className="max-w-[140px] truncate">{technology}</span>
          </span>
        );
      })}
    </div>
  );
}