// File: Login.jsx
import React, { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:2000/api/v1/auth/login", {
    method: "POST",
    credentials: "include", 
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
    }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login Successful");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-400">Login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-14 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-sm text-gray-300 hover:bg-white/10"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black/30" />
              Remember me
            </label>
            <a href="#" className="text-violet-400 hover:text-violet-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="#" className="text-violet-400 hover:text-violet-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}