
import Image from "next/image";

export default function Header(){

    return (
        <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">BALEMUYA</h1>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Professionals
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Work Post
            </a>
          </nav>
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/images/user.jpg"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h5>Abebe K</h5>
          </div>
        </div>
      </header>
    );
}