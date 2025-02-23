import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-8 py-3">
        {/* Logo & Branding */}
        <Link href="/customer" className="flex items-center space-x-2">
          <Image
            src="/images/logo.jpg"
            alt="Balamuya Logo"
            width={70}
            height={50}
            className="rounded-full"
          />
          <span className="text-lg font-semibold text-gray-800">Balamuya</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">
            Contact
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 rounded-lg border border-purple-700 text-indigo-600 font-semibold hover:bg-purple-800 hover:text-white transition"
          >
            Signup
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } md:hidden absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out`}
      >
        <nav className="flex flex-col space-y-4 p-4 text-center">
          <Link href="/" className="text-gray-700 font-medium hover:text-indigo-600">
            Home
          </Link>
          <Link href="/contact" className="text-gray-700 font-medium hover:text-indigo-600">
            Contact
          </Link>
          <Link href="/about" className="text-gray-700 font-medium hover:text-indigo-600">
            About
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition"
          >
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
}
