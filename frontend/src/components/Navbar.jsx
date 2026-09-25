import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, BookOpen, Home, Mail, Menu, User, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Resources", path: "/resources", icon: BookOpen },
  { name: "Contact", path: "/contact", icon: Mail },
];

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&display=swap');
.nb-brand { font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: -0.02em; }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock page scroll only while the mobile menu is open — the menu itself
     is an overlay now, so it never pushes the page content down */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* close on Escape, and when the viewport grows into desktop size */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const desktopLinkClass = ({ isActive }) =>
    `relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/10"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      <style>{FONT_CSS}</style>

      <nav
        className={`sticky top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#07070d]/70 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-b border-transparent bg-[#07070d]/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-[72px]">
            {/* Logo */}
            <NavLink to="/" onClick={() => setOpen(false)} className="group flex shrink-0 items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30 ring-1 ring-white/10 transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
                <img src="/logo.jpeg" alt="Logo" className="h-full w-full object-cover" />
              </div>
              <div className="leading-tight">
                <p className="nb-brand text-base font-bold text-white sm:text-lg">
                  CodeBy<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Gulzar</span>
                </p>
                <p className="text-[11px] text-slate-500 sm:text-xs">MERN Developer</p>
              </div>
            </NavLink>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
              {NAV_LINKS.map(({ name, path, icon: Icon }) => (
                <NavLink key={name} to={path} end={path === "/"} className={desktopLinkClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-violet-600 shadow-lg shadow-violet-600/30"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon size={16} />
                      {name}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition active:scale-95 hover:bg-white/15 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu — position: absolute, so it overlays the page instead
            of pushing content down when it opens */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full border-b border-white/10 bg-[#07070d]/95 backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 pb-4 pt-3 sm:px-6 lg:px-8">
                <div className="space-y-1.5 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
                  {NAV_LINKS.map(({ name, path, icon: Icon }) => (
                    <NavLink key={name} to={path} end={path === "/"} onClick={() => setOpen(false)} className={mobileLinkClass}>
                      <Icon size={18} />
                      {name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* dimmed backdrop behind the overlay menu — click to close */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}