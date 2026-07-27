import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaDownload,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
} from "react-icons/si";

export default function Hero({ profile }) {
  const tech = [
    {
      icon: <FaReact />,
      name: "React",
      color: "text-cyan-400",
      x: "-15%",
      y: "15%",
      delay: 0,
    },
    {
      icon: <FaNodeJs />,
      name: "Node",
      color: "text-green-400",
      x: "90%",
      y: "8%",
      delay: .2,
    },
    {
      icon: <SiExpress />,
      name: "Express",
      color: "text-gray-200",
      x: "85%",
      y: "70%",
      delay: .4,
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
      color: "text-green-500",
      x: "-12%",
      y: "75%",
      delay: .6,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-600/30 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >
            <p className="uppercase tracking-[5px] text-violet-400 font-semibold">
              Hello I'm 👋
            </p>

            <h1 className="mt-5 text-6xl md:text-7xl xl:text-8xl font-black leading-none">
              <span className="block">Gulzar</span>

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                Hussain
              </span>
            </h1>

            <h2 className="mt-7 text-2xl md:text-3xl font-semibold text-gray-200">
              {profile?.title || "Full Stack MERN Developer"}
            </h2>

            <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">
              {profile?.about ||
                "I build modern, scalable and high-performance web applications using React, Node.js, Express and MongoDB with beautiful user experiences."}
            </p>

            {/* Feature Pills */}

            <div className="mt-10 flex flex-wrap gap-3">

              {[
                "Responsive UI",
                "REST API",
                "MongoDB",
                "JWT Auth",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-sm"
                >
                  ⚡ {item}
                </div>
              ))}

            </div>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap gap-5">

              <a
                href="/projects"
                className="group rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold flex items-center gap-3 hover:scale-105 duration-300 shadow-xl shadow-violet-700/30"
              >
                View Projects
                <FaArrowRight className="group-hover:translate-x-1 duration-300" />
              </a>

              <a
                href="/resume/Gulzar-Hussain-Resume.pdf"
                download
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg px-8 py-4 flex items-center gap-3 hover:bg-white/10 duration-300"
              >
                <FaDownload />
                Resume
              </a>

            </div>

            {/* Social */}

            <div className="mt-12 flex gap-5 text-2xl">

              <a
                href="https://github.com/Gulzar-OP"
                target="_blank"
                rel="noreferrer"
                className="hover:text-violet-400 duration-300"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="hover:text-blue-400 duration-300"
              >
                <FaLinkedin />
              </a>

            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
                        {/* Laptop Card */}

            <div className="relative w-full max-w-[560px]">

              {/* Floating Icons */}

              {tech.map((item) => (
                <motion.div
                  key={item.name}
                  animate={{
                    y: [0, -18, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: item.delay,
                  }}
                  style={{
                    left: item.x,
                    top: item.y,
                  }}
                  className="absolute z-30"
                >
                  <div className="w-20 h-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl">
                    <div className={`text-3xl ${item.color}`}>
                      {item.icon}
                    </div>

                    <span className="text-xs mt-2 text-gray-300">
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Laptop */}

              <motion.div
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: .3,
                }}
                className="relative rounded-[34px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#131B36] via-[#0B1120] to-[#06090F] shadow-[0_0_80px_rgba(124,58,237,.35)]"
              >
                {/* Screen */}

                <div className="p-7">

                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080b12]">

                    {/* Browser */}

                    <div className="h-12 px-5 flex items-center gap-2 border-b border-white/10 bg-[#0d1118]">

                      <div className="w-3 h-3 rounded-full bg-red-400" />

                      <div className="w-3 h-3 rounded-full bg-yellow-400" />

                      <div className="w-3 h-3 rounded-full bg-green-400" />

                    </div>

                    {/* Code */}

                    <div className="p-8 space-y-4 font-mono">

                      <div className="flex gap-3">
                        <span className="text-pink-400">
                          const
                        </span>

                        <span className="text-cyan-400">
                          developer
                        </span>

                        <span className="text-white">
                          =
                        </span>

                        <span className="text-yellow-300">
                          {"{"}
                        </span>
                      </div>

                      <div className="pl-8 text-gray-300">
                        name:
                        <span className="text-green-400">
                          " Gulzar "
                        </span>
                        ,
                      </div>

                      <div className="pl-8 text-gray-300">
                        stack:
                        <span className="text-violet-400">
                          " MERN "
                        </span>
                        ,
                      </div>

                      <div className="pl-8 text-gray-300">
                        passion:
                        <span className="text-cyan-400">
                          " Building Amazing Products "
                        </span>
                        ,
                      </div>

                      <div className="pl-8 text-gray-300">
                        status:
                        <span className="text-green-400">
                          " Available "
                        </span>
                      </div>

                      <div className="text-yellow-300">
                        {"}"}
                      </div>

                    </div>

                  </div>

                  {/* Bottom */}

                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

                      <h4 className="text-sm text-gray-400">
                        Experience
                      </h4>

                      <h2 className="text-3xl font-bold mt-2">
                        3+
                      </h2>

                      <p className="text-sm text-gray-500">
                        Years Learning
                      </p>

                    </div>

                    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

                      <h4 className="text-sm text-gray-400">
                        Projects
                      </h4>

                      <h2 className="text-3xl font-bold mt-2">
                        12+
                      </h2>

                      <p className="text-sm text-gray-500">
                        Completed
                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

              {/* Coffee */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="absolute -bottom-6 left-10"
              >
                <div className="text-5xl">
                  ☕
                </div>
              </motion.div>

              {/* Plant */}

              <motion.div
                animate={{
                  rotate: [-4, 4, -4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="absolute -bottom-5 right-8"
              >
                <div className="text-5xl">
                  🌱
                </div>
              </motion.div>

            </div>

          </motion.div>

        </div>

        {/* Tech Stack */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-24 rounded-3xl  backdrop-blur-xl p-8"
        >

          <div className="flex flex-wrap justify-center gap-10 text-lg font-semibold">

            <div className="flex items-center gap-2">
              <FaReact className="text-cyan-400 text-3xl" />
              React
            </div>

            <div className="flex items-center gap-2">
              <FaNodeJs className="text-green-500 text-3xl" />
              Node.js
            </div>

            <div className="flex items-center gap-2">
              <SiExpress className="text-white text-3xl" />
              Express
            </div>

            <div className="flex items-center gap-2">
              <SiMongodb className="text-green-500 text-3xl" />
              MongoDB
            </div>

            <div className="flex items-center gap-2">
              <SiJavascript className="text-yellow-400 text-3xl" />
              JavaScript
            </div>

            <div className="flex items-center gap-2">
              <SiTailwindcss className="text-cyan-400 text-3xl" />
              Tailwind CSS
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}