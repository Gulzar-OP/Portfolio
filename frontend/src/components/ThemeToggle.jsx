// import React, { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <button
//       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//       className="rounded-lg bg-slate-200 px-4 py-2 text-slate-900 dark:bg-slate-800 dark:text-white"
//     >
//       {theme === "light" ? "Dark Mode" : "Light Mode"}
//     </button>
//   );
// }