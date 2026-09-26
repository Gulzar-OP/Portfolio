import { FaC, FaJava, FaRobot } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa";
import {
  SiAxios,
  SiCloudinary,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiSass,
  SiSocketdotio,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiYarn,
} from "react-icons/si";

/* Single source of truth for tech -> icon/color, shared by TechnologyList
   (compact tags) and TechnologyDetails (grid cards) so the two views never
   drift out of sync with each other. */
export const TECH_ICON_MAP = {
  react: { icon: SiReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: "#FFFFFF" },
  vue: { icon: SiVuedotjs, color: "#42B883" },

  html: { icon: SiHtml5, color: "#E34F26" },
  html5: { icon: SiHtml5, color: "#E34F26" },

  css: { icon: SiCss3, color: "#1572B6" },
  css3: { icon: SiCss3, color: "#1572B6" },

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
  mongoose: { icon: SiMongoose, color: "#E06666" },
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

  stripe: { icon: SiStripe, color: "#8B87FF" },
  cloudinary: { icon: SiCloudinary, color: "#3448C5" },

  framer: { icon: SiFramer, color: "#8A6BFF" },
  "framer motion": { icon: SiFramer, color: "#8A6BFF" },

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
  vite: { icon: SiVite, color: "#8A6BFF" },
};

export const FALLBACK_TECH_ICON = { icon: FaLayerGroup, color: "#A78BFA" };

/* a tech entry may come in as a plain string ("React") or an object
   ({ name: "React", ... }) depending on the API — support both */
export const techLabel = (tech) => (typeof tech === "string" ? tech : tech?.name || "");

export const getTechIcon = (label = "") =>
  TECH_ICON_MAP[label.trim().toLowerCase()] || FALLBACK_TECH_ICON;