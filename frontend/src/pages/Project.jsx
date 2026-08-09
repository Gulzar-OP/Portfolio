import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";

const API = import.meta.env.VITE_API || "http://localhost:2000";

export default function Project() {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/projects`);
        setProjectsData(response.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-white">
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              My Work
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Projects
            </h1>

            <p className="mt-6 text-gray-300 text-base md:text-lg leading-8">
              Some of the websites and systems I've built using React, Node.js,
              Express, MongoDB, and modern UI tools.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <div
                key={project._id}
                className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                <Link to={`/projects/${project._id}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.thumbnail || "/bg.png"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-6 pb-3">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition">
                      {project.title}
                    </h2>

                    <p className="text-gray-300 leading-7">
                      {project.shortDescription}
                    </p>
                  </div>
                </Link>

                <div className="px-6 pb-6 flex items-center justify-between">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                    >
                      <FaGithub />
                      Code
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium"
                    >
                      Live Demo
                      <FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}