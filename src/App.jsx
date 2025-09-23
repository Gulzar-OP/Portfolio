import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Project';
import Blogs from './pages/Blog';
import Skill from './pages/Skills';
// import AddBlog from './private/AddBlog';
// import AddProject from './private/AddProject';
import Admin from './private/Protect';
import Protected from './private/Admin';
// import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skill />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        {/* <Route path='/addBlog' element={<AddBlog />} /> */}
        {/* <Route path='/addProject' element={<AddProject />} /> */}
        <Route path='/admin' element={<Admin />} />
        {/* <Route path='/addskill' element={<AddSkill />} /> */}
        <Route path='/protected' element={<Protected/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/register' element={<Register />} /> */}

      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
