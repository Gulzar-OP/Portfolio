import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaLaptopCode,
  FaServer,
  FaMobileAlt,
  FaPalette,
  FaArrowRight,
  FaCertificate,
  FaAward,
  FaQuoteLeft,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [skill , setSkill] = useState([]);
  const API = import.meta.env.VITE_API || "http://localhost:3000";

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [profileRes, blogRes, projectRes, certificateRes, skillRes] =
          await Promise.allSettled([
            axios.get(`${API}/api/v1/profile`, { withCredentials: true }),
            axios.get(`${API}/api/v1/blogs`),
            axios.get(`${API}/api/v1/projects`),
            axios.get(`${API}/api/v1/certificate`),
            axios.get(`${API}/api/v1/skills`)
          ]);

        if (profileRes.status === "fulfilled") {
          setProfile(profileRes.value.data.profile);
        }
        if (blogRes.status === "fulfilled") {
          setBlogs(blogRes.value.data.blogs || []);
        }
        if (projectRes.status === "fulfilled") {
          setProjects(projectRes.value.data.projects || []);
        }
        if (certificateRes.status === "fulfilled") {
          setCertificate(certificateRes.value?.data.certifications || []);
        }
        if (skillRes.status === "fulfilled") {
          setSkill(skillRes.value?.data.data || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);


  const services = [
    { icon: <FaLaptopCode />, title: "Frontend Development", desc: "Responsive, modern UI with React and Tailwind." },
    { icon: <FaServer />, title: "Backend Development", desc: "Secure APIs, auth, CRUD, and database design." },
    { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Mobile-first layouts that work on every screen." },
    { icon: <FaPalette />, title: "UI/UX Design", desc: "Clean interfaces with strong visual hierarchy." },
  ];

  const stats = [
    { label: "Projects", value: "12+" },
    { label: "Years Experience", value: "3+" },
    { label: "Technologies", value: "10+" },
    { label: "Happy Clients", value: "20+" },
  ];

  const timeline = [
    { year: "2024", title: "Started MERN Journey", desc: "Built my first React and Node.js projects." },
    { year: "2025", title: "Built Production Apps", desc: "Worked on e-commerce and school management features." },
    { year: "2026", title: "Portfolio + CMS", desc: "Focused on creating a premium portfolio website." },
  ];

  const testimonials = [
    { name: "Client A", role: "Startup Founder", text: "Very professional work, clean UI, and fast delivery." },
    { name: "Client B", role: "Business Owner", text: "Great communication and excellent frontend quality." },
  ];

  const process = ["Understand requirement", "Design UI structure", "Build frontend + backend", "Test, refine, deploy"];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex flex-col overflow-x-hidden">
      <main className="flex-1">
        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 md:pt-24 pb-28 sm:pb-24 md:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-violet-400 font-medium mb-10 sm:mb-6 tracking-wide">
              Welcome to my portfolio
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Hello, I&apos;m <br />
              <span className="text-white">
                Gulzar <span className="text-violet-400">Hussain</span>
              </span>
            </h1>

            <div className="mt-2 h-1 w-24 sm:w-32 bg-violet-500 rounded-full mx-auto lg:mx-0" />

            <h2 className="text-xl sm:text-2xl mt-8 font-bold leading-tight text-gray-100">
              {loading ? "Loading..." : profile?.title || "MERN Stack Developer"}
            </h2>

            <p className="mt-6 text-gray-400 text-base sm:text-lg leading-7 sm:leading-8 max-w-xl mx-auto lg:mx-0">
              {profile?.about ||
                "I build modern web applications with React, Node.js, Express, MongoDB, and Tailwind CSS. I focus on performance, clean design, and great user experience."}
            </p>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold shadow-lg shadow-violet-600/20"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition font-medium"
              >
                Contact Me
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-xl text-gray-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition"><FaGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition"><FaLinkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition"><FaInstagram /></a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="order-1 lg:order-2 relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[560px] pb-16 sm:pb-20"
          >
            {/* Cover */}
            <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={
                  profile?.coverImage ||
                  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                }
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent" />
            </div>

            {/* Profile */}
            <div className="group absolute -bottom-2 sm:-bottom-4 left-6 sm:left-8 z-10">
              <div className="w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-56 rounded-2xl overflow-hidden border-4 border-[#07070a] shadow-xl transition-all duration-500">
                <img
                  src={profile?.profileImage}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* scroll cue */}
        <div className="flex justify-center -mt-16 sm:-mt-10 mb-8 text-violet-400/70">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <FaChevronDown />
          </motion.div>
        </div>

        {/* STATS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition text-center sm:text-left"
            >
              <h3 className="text-2xl sm:text-3xl font-bold">{item.value}</h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">{item.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* ABOUT + SERVICES */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
            <motion.div variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
              <p className="text-violet-400 font-medium mb-3">About Me</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Passionate about building useful web products</h2>
              <p className="mt-5 text-gray-400 leading-7 sm:leading-8">
                I design and develop full-stack web applications with a focus on clean architecture,
                modern UI, and smooth user experience. I enjoy turning ideas into scalable products.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
              {skill.map((s) => (
                <span
                  key={s._id}
                  className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 border border-violet-400/20 text-sm"
                >
                  {s.name}
                </span>
              ))}
            </div>
            </motion.div>

            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
              {services.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-3xl p-6 bg-white/[0.03] border border-white/10 hover:-translate-y-1 transition"
                >
                  <div className="text-violet-400 text-2xl">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-gray-400 leading-7">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          // initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div>
              <p className="text-violet-400 font-medium">Featured Projects</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">Some recent work</h2>
            </div>
            <Link to="/projects" className="text-violet-400 hover:text-violet-300 transition">
              View all
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {(projects.length ? projects.slice(0, 3) : [
              { _id: 1, title: "E-commerce Platform", description: "Modern shopping app with cart, auth, and admin panel." },
              { _id: 2, title: "School Management System", description: "Dashboard for students, teachers, and admin workflows." },
              { _id: 3, title: "Portfolio Website", description: "Responsive personal portfolio with blog and admin CMS." },
            ]).map((project) => (
              <motion.div key={project._id} variants={fadeUp} className="rounded-3xl p-6 bg-white/[0.03] border border-white/10">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-gray-400 leading-7 line-clamp-3">{project.description}</p>
                <Link to="/projects" className="inline-flex items-center gap-2 mt-5 text-violet-400 hover:text-violet-300 transition">
                  Read more <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* BLOGS */}
        <motion.section
          // initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div>
              <p className="text-violet-400 font-medium">Latest Blogs</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">Ideas and tutorials</h2>
            </div>
            <Link to="/blogs" className="text-violet-400 hover:text-violet-300 transition">
              View all
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {(blogs.length ? blogs.slice(0, 3) : [
              { _id: 1, title: "Getting Started with MERN Stack", excerpt: "Learn how to build your first MERN Stack application from scratch." },
              { _id: 2, title: "React UI Best Practices", excerpt: "Make your interfaces cleaner, faster, and more maintainable." },
              { _id: 3, title: "Node.js API Design", excerpt: "Build scalable and secure backend APIs with Express." },
            ]).map((blog) => (
              <motion.div key={blog._id} variants={fadeUp} className="rounded-3xl p-6 bg-white/[0.03] border border-white/10">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="mt-3 text-gray-400 leading-7 line-clamp-3">{blog.excerpt || blog.description}</p>
                <Link to="/blogs" className="inline-flex items-center gap-2 mt-5 text-violet-400 hover:text-violet-300 transition">
                  Read more <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TIMELINE + CERTIFICATES */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
            <motion.div variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-violet-400 text-xl">
                <FaCalendarAlt />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Experience Timeline</h2>
              </div>
              <div className="mt-6 space-y-5">
                {timeline.map((item) => (
                  <div key={item.year} className="border-l-2 border-violet-500 pl-5 relative">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-violet-400" />
                    <p className="text-sm text-violet-300">{item.year}</p>
                    <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                    <p className="text-gray-400 mt-2 leading-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-violet-400 text-xl">
                <FaCertificate />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Certificates & Achievements</h2>
              </div>
              <div className="mt-6 space-y-4">
                {certificate.length ? (
                  certificate.map((item) => (
                    <Link
                      to={`/certificates/${item._id}`}
                      key={item._id || item.title}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition"
                    >
                      <div className="text-violet-400 text-xl mt-1">
                        <FaAward />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.issuer} • {item.year}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No certificates added yet.</p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* TESTIMONIALS + PROCESS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
            <motion.div variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-violet-400 text-xl">
                <FaQuoteLeft />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Testimonials</h2>
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {testimonials.map((item) => (
                  <div key={item.name} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <p className="text-gray-300 leading-7">&ldquo;{item.text}&rdquo;</p>
                    <p className="mt-4 font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.role}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-violet-400 text-xl">
                <FaCheckCircle />
                <h2 className="text-xl sm:text-2xl font-bold text-white">My Process</h2>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {process.map((step, index) => (
                  <div key={step} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <p className="text-violet-300 text-sm">Step {index + 1}</p>
                    <h3 className="mt-2 font-semibold text-sm sm:text-base">{step}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <div className="rounded-3xl bg-violet-600/10 border border-violet-400/20 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-violet-300 font-medium">Let's work together</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">Need a modern website or dashboard?</h2>
              <p className="text-gray-300 mt-3 max-w-2xl leading-7">
                I can build responsive portfolio sites, admin panels, MERN apps, and custom web solutions with clean UI and scalable structure.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold shadow-lg shadow-violet-600/20 shrink-0"
            >
              <FaEnvelope />
              Contact Me
            </Link>
          </div>
        </motion.section>

        {/* RESUME */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-violet-400 font-medium">Resume Download</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">Download my resume for a quick overview</h2>
              <p className="text-gray-300 mt-3 max-w-2xl leading-7">
                Get a quick look at my experience, skills, projects, and technical background in one PDF file.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="/resume/Gulzar-Hussain-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold shadow-lg shadow-violet-600/20"
              >
                View Resume
              </a>

              <a
                href="/resume/Gulzar-Hussain-Resume.pdf"
                download
                className="px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition font-medium"
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}