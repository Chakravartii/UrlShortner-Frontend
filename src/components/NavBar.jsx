import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="w-full h-16 bg-black text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">

        <Link to="/" className="text-xl font-semibold">
          Linklytics
        </Link>

        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/features" className="hover:text-gray-300">Features</Link>
          <Link to="/pricing" className="hover:text-gray-300">Pricing</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/register" className="hover:text-gray-300">SignUp</Link>
        </nav>

      </div>
    </header>
  );
};

export default NavBar;
