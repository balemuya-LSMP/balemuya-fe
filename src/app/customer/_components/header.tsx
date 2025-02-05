'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";


export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

const handleLogout = async() =>{
  await logout();

  router.push("/auth/login")
}

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">BALEMUYA</h1>

        <nav className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-purple-700">
            Home
          </a>
          <Link href="/customer/work" className="text-gray-700 hover:text-purple-700">
            Professionals
          </Link>
          <Link href="/customer/work" className="text-gray-700 hover:text-purple-700">
            Work Post
          </Link>
        </nav>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <Image
              src="/images/user.jpg"
              alt="User"
              width={40}
              height={40}
              className="rounded-full border border-gray-300 cursor-pointer"
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg overflow-hidden transition-all duration-200">
              <ul className="py-2">
                <li>
                  <Link
                    href="/customer/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <FiUser className="mr-3 text-lg text-purple-700" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout} // Replace with logout logic
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <FiLogOut className="mr-3 text-lg text-red-600" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
