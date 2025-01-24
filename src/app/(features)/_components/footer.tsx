import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function  Footer(){
    return(
        <footer className="bg-gray-800 py-8 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 ml-2 flex flex-col md:flex-row justify-around items-center">
          {/* Left side - Social Media Icons */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://www.facebook.com/balemuya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.twitter.com/balemuya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com/balemuya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/balemuya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Right side - Footer text */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-gray-300">
              © 2024 Balemuya. All rights reserved.
            </p>
            <p className="mt-2">
              Have questions? Contact us at{" "}
              <a
                href="mailto:support@balemuya.com"
                className="text-blue-400 hover:underline"
              >
                support@balemuya.com
              </a>
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Designed and developed with ❤️ by the Balemuya Team
            </p>
          </div>
        </div>
      </footer>
    )
}