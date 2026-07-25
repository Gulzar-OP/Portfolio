import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  BookOpen
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <User size={18} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={18} /> },
    { name: "Blog", path: "/blogs", icon: <BookOpen size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-500 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition">
              <img src="/logo.jpeg" alt="Logo" className="rounded-2xl" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold text-white">MyPortfolio</p>
              <p className="text-xs text-gray-400">MERN Developer</p>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((item) => (
              <NavLink key={item.name} to={item.path} end={item.path === "/"} className={linkClass}>
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/10 hover:bg-white/15 transition"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="mt-2 p-3 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}