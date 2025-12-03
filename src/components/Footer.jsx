import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 bg-white/60 dark:bg-dm-surface/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-4">

        <p className="text-sm text-gray-600 dark:text-dm-muted">
          © {year} <span className="font-semibold">Linklytics</span>. All rights reserved.
        </p>

        <nav className="flex items-center gap-6 text-sm">
          <a
            href="/privacy"
            className="text-gray-600 dark:text-dm-muted hover:text-primary dark:hover:text-dm-glow transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-gray-600 dark:text-dm-muted hover:text-primary dark:hover:text-dm-glow transition-colors"
          >
            Terms & Conditions
          </a>
        </nav>

        <span className="text-xs text-gray-500 dark:text-dm-muted">
          Crafted with ❤️ by <strong>DC</strong>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
