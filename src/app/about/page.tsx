/* eslint-disable react/no-unescaped-entities */
'use client';
import Link from "next/link";
import Header from "../(features)/_components/header";
import Footer from "../(features)/_components/footer";

export default function AboutUs() {
  return (
    <><Header /><div className="min-h-screen bg-gradient-to-b from-purple-100 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-xl rounded-2xl p-10 text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-5">
          About <span className="text-purple-600">Balemuya</span>
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Balemuya is a local service marketplace that connects customers with
          skilled professionals. Whether you need home repairs, beauty
          services, tutoring, or other local services, Balemuya makes it easy to
          find trusted professionals near you.
        </p>
        <div className="border-t border-gray-300 my-6"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          We aim to bridge the gap between service providers and customers by
          offering a seamless and reliable platform. We empower professionals to
          showcase their skills and grow their businesses while helping
          customers access high-quality services effortlessly.
        </p>
        <div className="border-t border-gray-300 my-6"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Why Choose Us?
        </h2>
        <ul className="text-gray-700 text-lg mb-8 space-y-3 text-left mx-auto max-w-md">
          <li className="flex items-center gap-2">
            ✅ <span>Trusted and verified professionals</span>
          </li>
          <li className="flex items-center gap-2">
            ✅ <span>Easy booking and secure transactions</span>
          </li>
          <li className="flex items-center gap-2">
            ✅ <span>Wide range of services to choose from</span>
          </li>
          <li className="flex items-center gap-2">
            ✅ <span>Customer reviews for transparency</span>
          </li>
        </ul>
        <div className="border-t border-gray-300 my-6"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Join Us Today
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Whether you're a professional looking to grow your business or a
          customer searching for top-notch local services, Balemuya is the
          perfect place for you. Sign up today and experience hassle-free local
          service booking.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/auth/signup">
            <span className="bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-800 transition duration-300 transform hover:scale-105 cursor-pointer shadow-md">
              Get Started
            </span>
          </Link>
          <Link href="/contact">
            <span className="bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 cursor-pointer shadow-md">
              Contact Us
            </span>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
