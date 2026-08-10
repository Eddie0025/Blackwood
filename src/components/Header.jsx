import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Header({ onRequestAccess }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAccessClick = () => {
    setMenuOpen(false);
    if (onRequestAccess) onRequestAccess();
  };

  return (
    <header className="bg-black w-full sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-8xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "68px", transform: "translateY(5px)" }}
            className="w-auto object-contain"
          />

          <h1 className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg tracking-wider">
              BLACKWOOD TECHNOLOGIES
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
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

          <button
            onClick={handleAccessClick}
            className="bg-black text-[#c6a96b] border border-[#c6a96b] px-4 py-1.5 rounded-md font-semibold hover:bg-[#eab23a] hover:text-black transition text-xs cursor-pointer"
          >
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

          <button
            onClick={handleAccessClick}
            className="bg-black text-[#c6a96b] border-2 border-[#c6a96b] px-6 py-3 rounded-md font-semibold hover:bg-[#FFD700] hover:text-black transition cursor-pointer"
          >
            REQUEST ACCESS
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;