
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
   return (
          <header className="bg-white shadow sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-700">BALEMUYA</h1>
            <nav className="flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-purple-700 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-700 transition"
              >
                Subscription
              </a>
              <Link
                href="/professional/jobs"
                className="text-gray-700 hover:text-purple-700 transition"
              >
                Job
              </Link>
            </nav>
            <div className="flex justify-end  gap-6">
              <Link href="/professional/notifications">
                <FaBell className="mt-5 text-lg" />
              </Link>
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <Link href="/professional/profile">
                <Image
                  src="/images/user.jpg"
                  alt="User"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </Link>
            </div>
            </div>
          </div>
        </header>
   );
}