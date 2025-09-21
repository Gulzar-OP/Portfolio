import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Skills.css';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/skills/allSkills')
      .then(res => {
        setSkills(res.data);
      })
      .catch(err => console.error("Error fetching skills:", err));
  }, []);

  return (
    <div className="skills-page">
      <h1>My Skills</h1>
      <div className="skills-container">
        {skills.map(skill => (
          <div className="skill-card" key={skill._id}>
            <img src={skill.icon} alt={skill.name} />
            <h3>{skill.name}</h3>
            <p>{skill.level.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
