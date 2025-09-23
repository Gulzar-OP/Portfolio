import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>GULZAR</h1>
      </div>

      {/* Hamburger toggle */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

      <nav className="navbar-links">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>

        </ul>
      </nav>
    </header>
  );
}
