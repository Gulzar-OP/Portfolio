import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#07070a] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">MyPortfolio</h2>
            <p className="text-gray-300 leading-7">
              Building modern, responsive, and beautiful web experiences with React, Node.js, and Tailwind CSS.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span>gulzarhu88@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-400" />
                <span>+91 9661720780</span>
              </li>
              <li className="flex items-center gap-3">
                <CiLocationOn className="text-pink-400 text-xl" />
                <span>Katihar, Bihar, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <p className="text-gray-300 leading-7">
              MERN stack developer focused on clean UI, smooth UX, and scalable web applications.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {year} MyPortfolio. All rights reserved.</p>
          <p>Designed with React and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}