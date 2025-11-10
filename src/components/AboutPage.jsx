import React, { useEffect, useState } from "react";
import {
  FaLink,
  FaShareAlt,
  FaEdit,
  FaChartLine,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const THEME_KEY = "theme";

  // helper: safe add/remove dark class
  const applyDarkClass = (enable) => {
    if (typeof document === "undefined") return;
    if (enable) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    // initialize theme safely
    try {
      if (typeof window === "undefined") return;

      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === "dark") {
        setIsDarkMode(true);
        applyDarkClass(true);
        // console.log("Theme loaded from storage: dark");
        return;
      } else if (saved === "light") {
        setIsDarkMode(false);
        applyDarkClass(false);
        // console.log("Theme loaded from storage: light");
        return;
      }

      // no saved preference -> follow OS preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      applyDarkClass(prefersDark);
      // console.log("Theme loaded from system preference:", prefersDark ? "dark" : "light");

      // listen for OS preference changes and update UI (optional)
      const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        const newPref = e.matches;
        // only apply if user hasn't chosen a saved preference
        if (!window.localStorage.getItem(THEME_KEY)) {
          setIsDarkMode(newPref);
          applyDarkClass(newPref);
          // console.log("System preference changed:", newPref ? "dark" : "light");
        }
      };
      if (mq && mq.addEventListener) mq.addEventListener("change", handleChange);
      else if (mq && mq.addListener) mq.addListener(handleChange);

      return () => {
        if (mq && mq.removeEventListener) mq.removeEventListener("change", handleChange);
        else if (mq && mq.removeListener) mq.removeListener(handleChange);
      };
    } catch (err) {
      // fallback: light mode
      // console.warn("Theme init error:", err);
      setIsDarkMode(false);
      applyDarkClass(false);
    }
  }, []);

  const toggleTheme = () => {
    try {
      const next = !isDarkMode;
      setIsDarkMode(next);
      applyDarkClass(next);
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      // console.log("Theme toggled:", next ? "dark" : "light");
    } catch (err) {
      // ignore storage errors but still toggle visual
      setIsDarkMode((s) => {
        const next = !s;
        applyDarkClass(next);
        return next;
      });
      // console.warn("Theme toggle error:", err);
    }
  };

  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-6 pb-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Toggle Button */}
      <div className="w-full flex justify-end mb-4 px-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-yellow-300 shadow transition-transform hover:scale-105"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 w-full sm:py-12 py-10 rounded-lg shadow-sm transition-colors duration-300">
        <h1 className="sm:text-4xl text-3xl text-slate-800 dark:text-white font-bold italic mb-4 px-6">
          About Linklytics
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-8 max-w-3xl leading-relaxed px-6">
          Linklytics makes sharing links effortless — shorten URLs, manage them
          securely, and gain insights through analytics. Built for speed,
          privacy, and simplicity.
        </p>

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <article className="flex items-start gap-4 p-5 rounded-xl transform transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 dark:shadow-[0_12px_30px_rgba(2,6,23,0.6)] dark:border-transparent" aria-labelledby="f1">
            <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm" aria-hidden="true">
              <FaLink className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 id="f1" className="text-lg font-semibold text-slate-800 dark:text-slate-100">Simple URL Shortening</h2>
              <p className="text-gray-600 dark:text-slate-300 text-sm">Create short, memorable URLs with just a few clicks.</p>
            </div>
          </article>

          {/* Feature 2 */}
          <article className="flex items-start gap-4 p-5 rounded-xl transform transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 dark:shadow-[0_12px_30px_rgba(2,6,23,0.6)] dark:border-transparent" aria-labelledby="f2">
            <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm" aria-hidden="true">
              <FaShareAlt className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 id="f2" className="text-lg font-semibold text-slate-800 dark:text-slate-100">Powerful Analytics</h2>
              <p className="text-gray-600 dark:text-slate-300 text-sm">Track clicks, location, and traffic sources easily.</p>
            </div>
          </article>

          {/* Feature 3 */}
          <article className="flex items-start gap-4 p-5 rounded-xl transform transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 dark:shadow-[0_12px_30px_rgba(2,6,23,0.6)] dark:border-transparent" aria-labelledby="f3">
            <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm" aria-hidden="true">
              <FaEdit className="text-2xl text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 id="f3" className="text-lg font-semibold text-slate-800 dark:text-slate-100">Enhanced Security</h2>
              <p className="text-gray-600 dark:text-slate-300 text-sm">Your links and data are protected with encryption.</p>
            </div>
          </article>

          {/* Feature 4 */}
          <article className="flex items-start gap-4 p-5 rounded-xl transform transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 dark:shadow-[0_12px_30px_rgba(2,6,23,0.6)] dark:border-transparent" aria-labelledby="f4">
            <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-700 shadow-sm" aria-hidden="true">
              <FaChartLine className="text-2xl text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 id="f4" className="text-lg font-semibold text-slate-800 dark:text-slate-100">Fast & Reliable</h2>
              <p className="text-gray-600 dark:text-slate-300 text-sm">Lightning-fast redirects with high uptime guaranteed.</p>
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">Made with ❤️ by <span className="font-semibold">Deepak Chakravarti</span></p>
    </div>
  );
};
