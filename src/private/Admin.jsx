import React, { useState } from "react";
// import "../styles/Admin.css";
import axios from "axios";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("projects");

    // Project form
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        technologies: "",
        liveLink: "",
        githubLink: "",
        image: ""
    });

    // Blog form
    const [blogData, setBlogData] = useState({
        title: "",
        content: ""
    });

    // Skill form
    const [skillData, setSkillData] = useState({
        name: "",
        icon: "",
        level: ""
    });

    // Handlers
    const handleProjectChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };
    const handleBlogChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };
    const handleSkillChange = (e) => {
        setSkillData({ ...skillData, [e.target.name]: e.target.value });
    };

    // Submit functions
    const submitProject = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/projects/create", {
                ...projectData,
                technologies: projectData.technologies.split(",").map(t => t.trim())
            });
            alert(res.data.message);
            setProjectData({
                name: "",
                description: "",
                technologies: "",
                liveLink: "",
                githubLink: "",
                image: ""
            });
        } catch (error) {
            console.error(error);
            alert("Error while saving project");
        }
    };

    const submitBlog = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/blogs/create", blogData);
            alert(res.data.message);
            setBlogData({ title: "", content: "" });
        } catch (error) {
            console.error(error);
            alert("Error while saving blog");
        }
    };

    const submitSkill = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/skills/create", skillData);
            alert(res.data.message);
            setSkillData({ name: "", icon: "", level: "" });
        } catch (error) {
            console.error(error);
            alert("Error while saving skill");
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">Admin Panel</h2>
                <ul>
                    <li onClick={() => setActiveTab("projects")}
                        className={activeTab === "projects" ? "active" : ""}>
                        Add Project
                    </li>
                    <li onClick={() => setActiveTab("blogs")}
                        className={activeTab === "blogs" ? "active" : ""}>
                        Add Blog
                    </li>
                    <li onClick={() => setActiveTab("skills")}
                        className={activeTab === "skills" ? "active" : ""}>
                        Add Skill
                    </li>
                    <li>
                        Home
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
                {activeTab === "projects" && (
                    <div className="card">
                        <h2>Add Project</h2>
                        <form onSubmit={submitProject}>
                            <input type="text" name="name" placeholder="Project Title" value={projectData.name} onChange={handleProjectChange} />
                            <textarea name="description" placeholder="Project Description" value={projectData.description} onChange={handleProjectChange}></textarea>
                            <input type="text" name="technologies" placeholder="Technologies (comma separated)" value={projectData.technologies} onChange={handleProjectChange} />
                            <input type="text" name="liveLink" placeholder="Project Live Link" value={projectData.liveLink} onChange={handleProjectChange} />
                            <input type="text" name="githubLink" placeholder="GitHub Link" value={projectData.githubLink} onChange={handleProjectChange} />
                            <input type="text" name="image" placeholder="Image URL" value={projectData.image} onChange={handleProjectChange} />
                            <button type="submit">Save Project</button>
                        </form>
                    </div>
                )}

                {activeTab === "blogs" && (
                    <div className="card">
                        <h2>Add Blog</h2>
                        <form onSubmit={submitBlog}>
                            <input type="text" name="title" placeholder="Blog Title" value={blogData.title} onChange={handleBlogChange} />
                            <textarea name="content" placeholder="Blog Content" value={blogData.content} onChange={handleBlogChange}></textarea>
                            <button type="submit">Publish Blog</button>
                        </form>
                    </div>
                )}

                {activeTab === "skills" && (
                    <div className="card">
                        <h2>Add Skill</h2>
                        <form onSubmit={submitSkill}>
                            <input type="text" name="name" placeholder="Skill Name" value={skillData.name} onChange={handleSkillChange} />
                            <input type="text" name="icon" placeholder="Icon" value={skillData.icon} onChange={handleSkillChange} />
                            <input type="text" name="level" placeholder="Skill Level (Beginner, Advanced)" value={skillData.level} onChange={handleSkillChange} />
                            <button type="submit">Save Skill</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
