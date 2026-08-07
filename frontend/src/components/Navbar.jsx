import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  BookOpen,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <User size={18} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={18} /> },
    { name: "Resources", path: "/resources", icon: <BookOpen size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
  ];

  const linkClass = ({ isActive }) =>
    `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/25"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? " bg-slate-950/40 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-transparent bg-slate-950/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30 ring-1 ring-white/10 group-hover:scale-105 group-hover:shadow-violet-500/50 transition-all duration-300">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                My<span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Portfolio</span>
              </p>
              <p className="text-[11px] sm:text-xs text-gray-400">MERN Developer</p>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/10">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={linkClass}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {item.icon}
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-white/15 active:scale-95 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-3">
              <div className="p-3 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-1.5">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}