import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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


import ProjectDetailsSkeleton from "./ProjectDetailsSkeleton";
import ProjectGallery from "./ProjectGallery";
import TechnologyList from "./TechnologyList";
import FeatureCard from "./FeatureCard";
import TechnologyDetails from "./TechnologyDetails";
import ItemGrid from "./ItemGrid";
import ProjectLinks from "./ProjectLinks";


const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  "http://localhost:2000";

const formatDate = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  return [];
};

export default function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/v1/projects/${slug}`
        );

        const projectData = response.data?.project || response.data;

        if (isMounted) {
          setProject(projectData);
        }
      } catch (err) {
        if (isMounted) {
          setProject(null);
          setError(
            err.response?.data?.message || "Unable to load project details."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchProject();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    setActiveImage(0);
    setActiveTab("overview");
  }, [slug]);

  const technologies = useMemo(
    () => normalizeArray(project?.technologies),
    [project]
  );

  const features = useMemo(
    () => normalizeArray(project?.features),
    [project]
  );

  const challenges = useMemo(
    () => normalizeArray(project?.challenges),
    [project]
  );

  const learnings = useMemo(
    () => normalizeArray(project?.learnings),
    [project]
  );

const gallery = useMemo(() => {
  const images = [
    project?.thumbnail,
    ...normalizeArray(project?.gallery),
  ].filter(Boolean);

  return images.length
    ? images
    : ["/images/project-placeholder.png"];
}, [project]);

  const description =
    project?.description || project?.content || project?.shortDescription || "";

  const githubLinks = [
    {
      label: "Frontend",
      url: project?.githubFrontend,
    },
    {
      label: "Backend",
      url: project?.githubBackend,
    },
  ].filter((item) => item.url);

  const infoRows = [
    {
      icon: FaLayerGroup,
      label: "Category",
      value: project?.category,
    },
    {
      icon: FaCheckCircle,
      label: "Status",
      value: project?.status,
    },
    {
      icon: FaRegClock,
      label: "Duration",
      value: project?.duration,
    },
    {
      icon: FaRegCalendarAlt,
      label: "Created",
      value: formatDate(project?.createdAt),
    },
    {
      icon: FaRegCalendarAlt,
      label: "Completed",
      value: formatDate(project?.completedAt),
    },
    {
      icon: FaUserAlt,
      label: "Role",
      value: project?.role,
    },
  ];

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      icon: FaAlignLeft,
    },
    {
      key: "features",
      label: "Features",
      icon: FaStar,
    },
    {
      key: "challenges",
      label: "Challenges",
      icon: FaFlag,
    },
    {
      key: "learnings",
      label: "Learnings",
      icon: FaCode,
    },
    {
      key: "tech",
      label: "Technologies",
      icon: FaCube,
    },
  ];
  function Tag({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-200 backdrop-blur-md">
      {Icon && <Icon size={12} />}
      <span className="truncate">{children}</span>
    </span>
  );
}
function StatusBadge({ status }) {
  const normalizedStatus = (status || "").toLowerCase();

  const dotColor = normalizedStatus.includes("complete")
    ? "bg-emerald-400"
    : normalizedStatus.includes("progress")
    ? "bg-amber-400"
    : "bg-slate-400";

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-200 backdrop-blur-md">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span>{status || "Unknown"}</span>
    </span>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
        <Icon size={13} className="text-violet-400" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05060a] px-4 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Project not found</h1>

          <p className="mt-3 text-sm text-gray-400">
            {error || "This project is unavailable."}
          </p>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
          >
            <FaArrowLeft size={12} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-violet-300 transition hover:text-violet-200"
        >
          <FaArrowLeft size={12} />
          Back to All Projects
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ProjectGallery
            gallery={gallery}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            title={project.title}
          />

          <section className="min-w-0 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {project.featured && <Tag icon={FaStar}>Featured Project</Tag>}

              <Tag icon={FaRegBookmark}>
                {project.category || "Web Application"}
              </Tag>

              <div className="ml-auto">
                <StatusBadge status={project.status} />
              </div>
            </div>

            <div>
              <h1 className="break-words text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                {project.shortDescription || description}
              </p>
            </div>

            {technologies.length > 0 && (
              <TechnologyList technologies={technologies} />
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard features={features} />

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="grid gap-3">
                  {infoRows.map((item) => (
                    <InfoItem key={item.label} {...item} />
                  ))}
                </div>

                <ProjectLinks
                  liveDemo={project.liveDemo}
                  videoDemo={project.videoDemo}
                  githubLinks={githubLinks}
                />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5 md:p-6">
          <div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </div>

          <div className="pt-5">
            {activeTab === "overview" && (
              <p className="max-w-4xl whitespace-pre-line text-sm leading-7 text-gray-300 sm:text-base">
                {description || "No project description available."}
              </p>
            )}

            {activeTab === "features" && (
              <ItemGrid items={features} icon={FaCheckCircle} />
            )}

            {activeTab === "challenges" && (
              <ItemGrid items={challenges} icon={FaFlag} />
            )}

            {activeTab === "learnings" && (
              <ItemGrid items={learnings} icon={FaRegCheckCircle} />
            )}

            {activeTab === "tech" && (
              <TechnologyDetails technologies={technologies} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}


