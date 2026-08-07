import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black w-full sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-8xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
          />

          <Link to="/">
            <h1 className="text-gray-200 text-sm sm:text-lg md:text-2xl tracking-wide">
                BLACKWOOD TECHNOLOGIES
            </h1>
          </Link>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-xl">
          <Link
            to="/systems"
            className="text-gray-200 hover:text-[#c6a96b] transition-colors duration-300"
          >
            SYSTEMS
          </Link>

          <Link
            to="/research"
            className="text-gray-200 hover:text-[#c6a96b] transition-colors duration-300"
          >
            RESEARCH
          </Link>

          <Link
            to="/careers"
            className="text-gray-200 hover:text-[#c6a96b] transition-colors duration-300"
          >
            CAREERS
          </Link>

          <Link
            to="/about"
            className="text-gray-200 hover:text-[#c6a96b] transition-colors duration-300"
          >
            ABOUT
          </Link>

          <button className="bg-black text-[#c6a96b] border-2 border-[#c6a96b] px-5 py-2 rounded-md font-semibold hover:bg-[#eab23a] hover:text-black transition">
            REQUEST ACCESS
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-3xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-black overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center py-6 space-y-6">
          <Link
            to="/systems"
            onClick={() => setMenuOpen(false)}
            className="text-gray-200 hover:text-[#c6a96b]"
          >
            SYSTEMS
          </Link>

          <Link
            to="/research"
            onClick={() => setMenuOpen(false)}
            className="text-gray-200 hover:text-[#c6a96b]"
          >
            RESEARCH
          </Link>

          <Link
            to="/careers"
            onClick={() => setMenuOpen(false)}
            className="text-gray-200 hover:text-[#c6a96b]"
          >
            CAREERS
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-gray-200 hover:text-[#c6a96b]"
          >
            ABOUT
          </Link>

          <button className="bg-black text-[#c6a96b] border-2 border-[#c6a96b] px-6 py-3 rounded-md font-semibold hover:bg-[#FFD700] hover:text-black transition">
            REQUEST ACCESS
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;