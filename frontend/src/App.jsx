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
import CertificateDetails from "./pages/CertificateDetails";
import NotFound from "./pages/NotFound";
import Resources from "./resource/Resources";
import ComingSoon from "./pages/ComingSoon";
import Education from "./pages/Education";
import EducationDetails from "./pages/EducationDetails";

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
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/resources" element={<Resources />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:id" element={<EducationDetails />} />
      </Routes>
      <Footer />
    </>
  );
}
