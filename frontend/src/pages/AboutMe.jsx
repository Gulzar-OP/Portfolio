import React from "react";
import {
  FaCode,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaMobileAlt,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
// import { FaCode } from "react-icons/fa";

const getIcon = (iconName) => {
  return FaIcons[iconName] || FaCode;
};

export default function AboutMe() {
//   const skills = [
//     { name: "React", icon: <FaReact /> },
//     { name: "Node.js", icon: <FaNodeJs /> },
//     { name: "MongoDB", icon: <FaDatabase /> },
//     { name: "Responsive UI", icon: <FaMobileAlt /> },
//     { name: "Full Stack", icon: <FaCode /> },
//   ];

  const [skills, setSkills] = React.useState([]);
useEffect(() => {
  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/v1/skills"
      );

      console.log(response.data);

      setSkills(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Fetching skills...",skills);
  fetchSkills();
}, []);

  const [education, setEducation] = React.useState([]);
useEffect(() => {
  const fetchEducation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/v1/education"
      );

      setEducation(response.data.education);
    } catch (error) {
      console.error(error);
    }
  };

  fetchEducation();
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-white">

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              About Me
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Who I Am
            </h1>
            <p className="mt-6 text-gray-300 text-base md:text-lg leading-8">
              I’m a MERN stack developer who loves building clean, responsive,
              and useful web applications with a strong focus on UI and user experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">About Gulzar</h2>
              <p className="text-gray-300 leading-8">
                I work with React, Node.js, Express, and MongoDB to create full-stack
                applications. I enjoy turning ideas into polished digital products,
                especially portfolio websites, dashboards, and business applications.
              </p>
              <p className="text-gray-300 leading-8 mt-4">
                I care a lot about structure, performance, and modern design. I also
                like building reusable components, clean APIs, and layouts that look
                good on every screen size.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-semibold">Begusarai, Bihar</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-gray-400">Focus</p>
                  <p className="font-semibold">MERN Stack Development</p>
                </div>
              </div>
            </div>



<div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl">
  <h2 className="text-2xl font-bold mb-6">Skills</h2>

  <div className="grid sm:grid-cols-2 gap-4">
    {Array.isArray(skills) &&
      skills.map((skill) => {
        const Icon = getIcon(skill.icon);

        return (
          <div
            key={skill._id || skill.name}
            className="flex items-center gap-3 rounded-2xl bg-[#07070a] border border-white/10 p-4 hover:border-blue-500/50 transition"
          >
            <span className="text-xl" style={{ color: skill.color || "#60A5FA" }}>
              <Icon />
            </span>
            <div className="flex-1">
              <div className="font-medium">{skill.name}</div>
              <div className="text-xs text-gray-400">
                {skill.category} • {skill.level}%
              </div>
            </div>
          </div>
        );
      })}
  </div>

  <div className="mt-8 rounded-2xl bg-[#07070a] border border-blue-500/20 p-5">
    <h3 className="text-lg font-semibold mb-2">What I Like Building</h3>
    <p className="text-gray-300 leading-7">
      Portfolio websites, admin dashboards, e-commerce systems, school management apps,
      and any project where UI matters as much as logic.
    </p>
  </div>
</div>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <FaGraduationCap className="text-blue-400 text-2xl" />
              <h2 className="text-2xl md:text-3xl font-bold">Education</h2>
            </div>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {education.map((edu) => (
    <div
      key={edu._id}
      className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-lg hover:shadow-xl transition duration-300"
    >
      <h3 className="text-xl font-bold">{edu.degree}</h3>

      <p className="text-gray-300 mt-2">
        {edu.field} • {edu.institution}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{edu.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          <span>
            {edu.currentlyStudying ? "Currently Studying" : "Completed"}
          </span>
        </div>

        <div>
          <strong>Grade:</strong> {edu.grade}
        </div>
      </div>

      {edu.description && (
        <p className="text-gray-300 mt-4 text-sm leading-6">
          {edu.description}
        </p>
      )}

      {edu.website && (
        <a
          href={edu.website}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          Visit Website <FaExternalLinkAlt size={14} />
        </a>
      )}
    </div>
  ))}
</div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend",
                text: "React, Tailwind CSS, responsive design, reusable components.",
              },
              {
                title: "Backend",
                text: "Node.js, Express, REST APIs, JWT authentication, MongoDB.",
              },
              {
                title: "UI/UX",
                text: "Modern layouts, clean spacing, hover effects, and smooth interactions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400">{item.title}</h3>
                <p className="text-gray-300 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}