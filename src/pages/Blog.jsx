import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Blog.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const URI = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {


    axios.get(`${URI}/api/blogs/allBlogs`, { withCredentials: true })
      // axios.get('http://localhost:3000/api/blogs/allBlogs')
      .then(res => {
        console.log("Blogs data:", res.data); // check what comes from backend
        setBlogs(res.data);
      })
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  if (blogs.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No blogs found</h2>;
  }

  return (
    <div>
      <Navbar />

      <div className="blogs-page">
        <h1>My Blogs</h1>
        <div className="blogs-container">
          {blogs.map(blog => (
            <div className="blog-card" key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="author">
                <img src="/profile.png" alt="Author" />
                <span><strong>{blog.author}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
