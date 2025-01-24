import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("Menu state:", !isMenuOpen); // Debugging log
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <h1 className="text-xl sm:text-2xl font-bold text-purple-700">BALEMUYA</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          <a href="#features" className="px-3 py-2 text-gray-600 font-bold hover:text-purple-700">
            Features
          </a>
          <a href="#categories" className="px-3 py-2 text-gray-600 font-bold hover:text-purple-700">
            Categories
          </a>
          <a href="#contact" className="px-3 py-2 text-gray-600 font-bold hover:text-purple-700">
            Contact
          </a>
          <Link href="/auth/login" className="px-3 py-2 text-gray-600 font-bold hover:text-purple-700">
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-3 py-2 text-gray-600 font-bold rounded hover:text-indigo-600"
          >
            Signup
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-600 text-xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg transition-all duration-300`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          <Link
            href="#features"
            className="px-3 py-2 text-gray-600 font-bold rounded hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)} 
          >
            Features
          </Link>
          <Link
            href="#categories"
            className="px-3 py-2 text-gray-600 font-bold rounded hover:text-indigo-600 hover:underline"
            onClick={() => setIsMenuOpen(false)} 
          >
            Categories
          </Link>
          <Link
            href="#contact"
            className="px-3 py-2 text-gray-600 font-bold rounded hover:text-indigo-600 hover:underline"
            onClick={() => setIsMenuOpen(false)} 
          >
            Contact
          </Link>
          <Link
            href="/auth/login"
            className="px-3 py-2 text-gray-600 font-bold rounded hover:text-indigo-600 hover:underline"
            onClick={() => setIsMenuOpen(false)} 
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-3 py-2 text-gray-600 font-bold rounded hover:text-indigo-600 hover:underline"
            onClick={() => setIsMenuOpen(false)} 
          >
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
}
