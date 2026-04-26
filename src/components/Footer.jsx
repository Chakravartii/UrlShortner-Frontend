import React from "react";
import { Container } from "./UI";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
              Linklytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Shorten, track, and optimize your URLs with advanced analytics.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {year} <span className="font-semibold">Linklytics</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              Crafted with{' '}
              <HiHeart className="w-4 h-4 text-red-500" /> by <strong className="text-gray-900 dark:text-white">DC</strong>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
