import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";

const API = import.meta.env.VITE_API || "http://localhost:2000"

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/blogs`);

        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-white">
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Latest Articles
            </p>

            <h1 className="text-4xl md:text-6xl font-bold">
              Blog & Insights
            </h1>

            <p className="mt-6 text-gray-300">
              Read updates, ideas, tutorials, and thoughts about web
              development, UI design, and my technical journey.
            </p>
          </div>

          {/* Loading  */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6 animate-pulse"
                >
                  <div className="h-40 bg-white/10 rounded-2xl mb-5"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No blogs found</h2>
              <p className="text-gray-400 mt-3">
                New blog posts will appear here soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blogs/${blog._id}`}
                  className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={
                        blog.thumbnail
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-2">
                        <FaUser />
                        {blog.author || "Admin"}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaClock />
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "Recently"}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition">
                      {blog.title}
                    </h2>

                    <p className="text-gray-300 line-clamp-3">
                      {blog.content || "No description available."}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-blue-400 group-hover:text-blue-300 font-medium">
                        Read More <FaArrowRight />
                      </span>

                      {blog.tags?.length > 0 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                          {blog.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}