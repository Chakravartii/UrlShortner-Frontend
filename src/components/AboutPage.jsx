import React, { useEffect, useState } from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  const THEME_KEY = "theme";

  const applyDarkClass = (enable) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", enable);
  };

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === "dark") {
        setIsDarkMode(true);
        applyDarkClass(true);
        return;
      } else if (saved === "light") {
        setIsDarkMode(false);
        applyDarkClass(false);
        return;
      }

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      applyDarkClass(prefersDark);
    } catch (err) {
      setIsDarkMode(false);
      applyDarkClass(false);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    applyDarkClass(next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };

  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-6 pb-12 bg-white dark:bg-dm-surface transition-colors duration-300">
      {/* Card container */}
      <div className="rounded-card w-full sm:py-12 py-10 bg-glass-white dark:bg-glass-dark border border-gray-100 dark:border-gray-800 shadow-glass transition-colors duration-300">
        <h1 className="sm:text-4xl text-3xl text-dark dark:text-white font-bold italic mb-4 px-6">About Linklytics</h1>

        <p className="text-gray-600 dark:text-dm-muted text-sm mb-8 max-w-3xl leading-relaxed px-6">
          Linklytics makes sharing links effortless — shorten URLs, manage them securely,
          and gain insights through analytics. Built for speed, privacy, and simplicity.
        </p>

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature Cards */}
          {[
            { icon: <FaLink className="text-2xl text-primary dark:text-dm-primary" />, title: "Simple URL Shortening", desc: "Create short, memorable URLs with just a few clicks." },
            { icon: <FaShareAlt className="text-2xl text-accent dark:text-dm-accent" />, title: "Powerful Analytics", desc: "Track clicks, location, and traffic sources easily." },
            { icon: <FaEdit className="text-2xl text-primary dark:text-dm-glow" />, title: "Enhanced Security", desc: "Your links and data are protected with encryption." },
            { icon: <FaChartLine className="text-2xl text-error dark:text-red-400" />, title: "Fast & Reliable", desc: "Lightning-fast redirects and high uptime guaranteed." },
          ].map((item, index) => (
            <article key={index} className="flex items-start gap-4 p-5 rounded-xl transition-all bg-white/60 dark:bg-dm-surface/60 border border-gray-100 dark:border-transparent shadow-sm hover:-translate-y-1 hover:shadow-deep">
              <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-white dark:bg-dm-surface border border-gray-100 dark:border-gray-700 shadow-sm">
                {item.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-dark dark:text-white">{item.title}</h2>
                <p className="text-gray-600 dark:text-dm-muted text-sm">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
