import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const URI = import.meta.env.VITE_API_URL|| 'http://localhost:3000';

  useEffect(() => {
  axios.get(`${URI}/api/projects`)
    .then(res => {
      console.log(res.data);  // check what data is coming
      setProjects(res.data);   // or res.data.projects depending on backend
    })
    .catch(err => console.error(err));
}, []);


  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <div className="projects-container">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p><strong>Tech:</strong> {project.technology.join(', ')}</p>
            <a href={project.livelink} target="_blank" rel="noopener noreferrer">Live</a> | 
            <a href={project.githublink} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        ))}
      </div>
    </div>
  );
}
