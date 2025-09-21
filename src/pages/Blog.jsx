import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Blog.css';
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.URL || 'http://localhost:3000';
export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {


    axios.get(`${URL}/api/blogs`)
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
    <div className="blogs-page">
      <h1>My Blogs</h1>
      <div className="blogs-container">
        {blogs.map(blog => (
          <div className="blog-card" key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p><strong>Author:</strong> {blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
