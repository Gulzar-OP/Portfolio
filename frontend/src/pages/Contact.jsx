import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post("http://localhost:2000/api/v1/contact", form);
      setSuccess(res.data?.message || "Message sent successfully.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-white">

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Contact Me
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Let’s Build Something Great
            </h1>
            <p className="mt-6 text-gray-300 text-base md:text-lg leading-8">
              If you have a project, idea, or collaboration in mind, send me a
              message and I’ll get back to you soon.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">gulzar@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center text-green-400">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+91XXXXXXXXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">Begusarai, Bihar, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <p className="font-medium">Chat for quick discussion</p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="mt-4">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition font-medium"
              >
                <FaPaperPlane />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="mt-4 text-green-400 bg-green-900/20 p-3 rounded-xl text-sm">
                  {success}
                </p>
              )}

              {error && (
                <p className="mt-4 text-red-400 bg-red-900/20 p-3 rounded-xl text-sm">
                  {error}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}