import { FaSearch } from "react-icons/fa";

/* eslint-disable @next/next/no-img-element */
export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">BALEMUYA</h1>
        <nav className="space-x-6">
          <a href="#" className="text-gray-600 hover:text-purple-700">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-700">
            Jobs
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-700">
            Categories
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative w-full">
            {/* Input field */}
            <input
              type="text"
              placeholder="Search jobs"
              className="w-full pl-10 pr-4 py-2 text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none"
            />
            {/* Search icon */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="/images/user.jpg" alt="User" className="rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
