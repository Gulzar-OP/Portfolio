import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/project/ProjectDetails";
import AboutMe from "./pages/AboutMe";
import BlogDetails from "./pages/BlogDetails";
import Dashboard from "./admin/Dashboard";
import AdminSkill from "./admin/AdminSkill";
import CertificateDetails from "./pages/CertificateDetails";
import Login from "./pages/Login";
import ProjectEdit from "./admin/edit/ProjectEdit";
import BlogEdit from "./admin/edit/BlogEdit";
import ProtectedRoute from "./pages/ProtectRoute";
import NotFound from "./pages/NotFound";
import Resources from "./resource/Resources";
import Notes from "./resource/Notes";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/resources/blogs" element={<Blog />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/resources/blogs/:slug" element={<BlogDetails />} />
        <Route path="/certificates/:id" element={<CertificateDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/notes" element={<Notes />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/skills" element={<AdminSkill />} />
          <Route
            path="/dashboard/projects/:projectId/edit"
            element={<ProjectEdit />}
          />
          <Route
            path="/dashboard/blogs/:id/edit"
            element={<BlogEdit />}
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
