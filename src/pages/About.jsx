import React from 'react';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Heading */}
      <h1>About Me</h1>

      <div className="about-container">
        {/* Image Section */}
        <div className="about-image">
          <img src="Gulzar.png" alt="Gulzar Hussain" />
        </div>

        {/* Text Section */}
        <div className="about-text">
          <p>
            Hi, I’m <strong>Gulzar Hussain</strong> — a passionate <strong>web developer</strong> who loves building modern, responsive, and user-friendly applications. 
          </p>

          <p>
            My journey started with curiosity about how websites and apps work. Over time, I’ve learned and experimented with technologies like <strong>React, Node.js, Express, MongoDB</strong>, and more. 
          </p>

          <p>
            I enjoy creating projects that solve real problems, experimenting with new tech stacks, and constantly improving my skills. Each project is a step towards crafting better digital experiences.
          </p>

          <p>
            When I’m not coding, I enjoy exploring new ideas, learning UI/UX design, and contributing to open-source projects.
          </p>

          <p className="call-to-action">
            Want to collaborate or discuss a project? <a href="/contact">Get in touch!</a>
          </p>
        </div>
      </div>
    </div>
  );
}
