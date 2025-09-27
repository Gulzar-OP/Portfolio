import React, { useState } from "react";
import axios from "axios";
import '../styles/Protect.css';
import { NavLink } from "react-router-dom";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("projects");

    // ----- ADD FORMS -----
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        technologies: "",
        liveLink: "",
        githubLink: "",
        image: ""
    });

    const [blogData, setBlogData] = useState({ title: "", content: "" });
    const [skillData, setSkillData] = useState({ name: "", icon: "", level: "" });

    // ----- DELETE INPUTS -----
    const [deleteProjectName, setDeleteProjectName] = useState("");
    const [deleteBlogTitle, setDeleteBlogTitle] = useState("");
    const [deleteSkillName, setDeleteSkillName] = useState("");

    // ----- Handlers -----
    const handleProjectChange = (e) => setProjectData({ ...projectData, [e.target.name]: e.target.value });
    const handleBlogChange = (e) => setBlogData({ ...blogData, [e.target.name]: e.target.value });
    const handleSkillChange = (e) => setSkillData({ ...skillData, [e.target.name]: e.target.value });

    // ----- IMAGE HANDLER -----
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProjectData({ ...projectData, image: file });
    };

    // ----- ADD FUNCTIONS -----
    const submitProject = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = "";

            if (projectData.image instanceof File) {
                const formData = new FormData();
                formData.append("image", projectData.image);

                const res = await axios.post("http://localhost:3000/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                imageUrl = res.data.url;
            }

            await axios.post("http://localhost:3000/api/projects/create", {
                ...projectData,
                technologies: projectData.technologies.split(",").map(t => t.trim()),
                image: imageUrl
            });

            alert("Project added successfully!");
            setProjectData({ name: "", description: "", technologies: "", liveLink: "", githubLink: "", image: "" });
        } catch (err) {
            console.error(err);
            alert("Error adding project");
        }
    };

    const submitBlog = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/blogs/create", blogData);
            alert("Blog added successfully!");
            setBlogData({ title: "", content: "" });
        } catch (err) {
            console.error(err);
            alert("Error adding blog");
        }
    };

    const submitSkill = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/skills/create", skillData);
            alert("Skill added successfully!");
            setSkillData({ name: "", icon: "", level: "" });
        } catch (err) {
            console.error(err);
            alert("Error adding skill");
        }
    };

    // ----- DELETE FUNCTIONS -----
    const deleteProject = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:3000/api/projects/allProjects");
            const project = res.data.find(p => p.name === deleteProjectName);
            if (!project) return alert("Project not found");

            await axios.delete(`http://localhost:3000/api/projects/delete/${project._id}`);
            alert("Project deleted successfully!");
            setDeleteProjectName("");
        } catch (err) {
            console.error(err);
            alert("Error deleting project");
        }
    };

    const deleteBlog = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:3000/api/blogs/allBlogs");
            const blog = res.data.find(b => b.title === deleteBlogTitle);
            if (!blog) return alert("Blog not found");

            await axios.delete(`http://localhost:3000/api/blogs/delete/${blog._id}`);
            alert("Blog deleted successfully!");
            setDeleteBlogTitle("");
        } catch (err) {
            console.error(err);
            alert("Error deleting blog");
        }
    };

    const deleteSkill = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:3000/api/skills/allSkills");
            const skill = res.data.find(s => s.name === deleteSkillName);
            if (!skill) return alert("Skill not found");

            await axios.delete(`http://localhost:3000/api/skills/delete/${skill._id}`);
            alert("Skill deleted successfully!");
            setDeleteSkillName("");
        } catch (err) {
            console.error(err);
            alert("Error deleting skill");
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li onClick={() => setActiveTab("projects")} className={activeTab === "projects" ? "active" : ""}>Add Project</li>
                    <li onClick={() => setActiveTab("blogs")} className={activeTab === "blogs" ? "active" : ""}>Add Blog</li>
                    <li onClick={() => setActiveTab("skills")} className={activeTab === "skills" ? "active" : ""}>Add Skill</li>
                    <li onClick={() => setActiveTab("deleteProjects")} className={activeTab === "deleteProjects" ? "active" : ""}>Delete Project</li>
                    <li onClick={() => setActiveTab("deleteBlogs")} className={activeTab === "deleteBlogs" ? "active" : ""}>Delete Blog</li>
                    <li onClick={() => setActiveTab("deleteSkills")} className={activeTab === "deleteSkills" ? "active" : ""}>Delete Skill</li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
                {/* ADD TABS */}
                {activeTab === "projects" && (
                    <div className="card">
                        <h2>Add Project</h2>
                        <form onSubmit={submitProject}>
                            <input type="text" name="name" placeholder="Project Name" value={projectData.name} onChange={handleProjectChange} required />
                            <textarea name="description" placeholder="Description" value={projectData.description} onChange={handleProjectChange} required />
                            <input type="text" name="technologies" placeholder="Technologies (comma separated)" value={projectData.technologies} onChange={handleProjectChange} required />
                            <input type="text" name="liveLink" placeholder="Live Link" value={projectData.liveLink} onChange={handleProjectChange} />
                            <input type="text" name="githubLink" placeholder="GitHub Link" value={projectData.githubLink} onChange={handleProjectChange} />

                            {/* Image Upload */}
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            {projectData.image && typeof projectData.image !== "string" && (
                                <img src={URL.createObjectURL(projectData.image)} alt="Preview" style={{ width: "150px", margin: "10px 0" }} />
                            )}

                            <button type="submit">Save Project</button>
                        </form>
                    </div>
                )}

                {/* BLOG TABS */}
                {activeTab === "blogs" && (
                    <div className="card">
                        <h2>Add Blog</h2>
                        <form onSubmit={submitBlog}>
                            <input type="text" name="title" placeholder="Blog Title" value={blogData.title} onChange={handleBlogChange} required />
                            <textarea name="content" placeholder="Content" value={blogData.content} onChange={handleBlogChange} required />
                            <button type="submit">Publish Blog</button>
                        </form>
                    </div>
                )}

                {/* SKILL TABS */}
                {activeTab === "skills" && (
                    <div className="card">
                        <h2>Add Skill</h2>
                        <form onSubmit={submitSkill}>
                            <input type="text" name="name" placeholder="Skill Name" value={skillData.name} onChange={handleSkillChange} required />
                            <input type="text" name="icon" placeholder="Icon" value={skillData.icon} onChange={handleSkillChange} />
                            <input type="text" name="level" placeholder="Skill Level" value={skillData.level} onChange={handleSkillChange} />
                            <button type="submit">Save Skill</button>
                        </form>
                    </div>
                )}

                {/* DELETE TABS */}
                {activeTab === "deleteProjects" && (
                    <div className="card">
                        <h2>Delete Project</h2>
                        <form onSubmit={deleteProject}>
                            <input type="text" placeholder="Enter Project Name" value={deleteProjectName} onChange={(e) => setDeleteProjectName(e.target.value)} />
                            <button type="submit">Delete Project</button>
                        </form>
                    </div>
                )}

                {activeTab === "deleteBlogs" && (
                    <div className="card">
                        <h2>Delete Blog</h2>
                        <form onSubmit={deleteBlog}>
                            <input type="text" placeholder="Enter Blog Title" value={deleteBlogTitle} onChange={(e) => setDeleteBlogTitle(e.target.value)} />
                            <button type="submit">Delete Blog</button>
                        </form>
                    </div>
                )}

                {activeTab === "deleteSkills" && (
                    <div className="card">
                        <h2>Delete Skill</h2>
                        <form onSubmit={deleteSkill}>
                            <input type="text" placeholder="Enter Skill Name" value={deleteSkillName} onChange={(e) => setDeleteSkillName(e.target.value)} />
                            <button type="submit">Delete Skill</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
