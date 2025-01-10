/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Landing() {
  const testimonials = [
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "John Doe",
      feedback: "This platform helped me find great professionals quickly!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Jane Smith",
      feedback: "A fantastic experience! I found everything I needed!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Alice Johnson",
      feedback: "The best platform for connecting with experts!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Bob Brown",
      feedback: "I found the perfect professional for my project!",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">BALEMUYA</h1>
          <nav className="space-x-4">
            <a
              href="#features"
              className="text-gray-600 font-bold hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="#categories"
              className="text-gray-600 font-bold hover:text-indigo-600"
            >
              Categories
            </a>
            <a
              href="#contact"
              className="text-gray-600 font-bold hover:text-indigo-600"
            >
              Contact
            </a>
            <a
              href="#login"
              className="text-gray-600 font-bold hover:text-indigo-600"
            >
              Login
            </a>
            <button className="px-4 py-2 text-gray-600 font-bold rounded hover:text-indigo-600">
              Signup
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[url('/images/ele.png')] bg-cover bg-center py-32">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative max-w-2xl mx-auto text-center text-white px-4">
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Connect Professionals with Customers
          </h1>
          <p className="text-lg mb-8">
            Whether you&apos;re a skilled professional seeking clients or a
            customer looking for reliable expertise nearby, we make it simple
            for both.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition">
              Find Professionals
            </button>
            <button className="px-6 py-3 border text-white rounded-md hover:bg-indigo-500 transition">
              Offer Your Services
            </button>
          </div>

          {/* Additional Tagline */}
          <p className="mt-6 text-sm text-gray-300">
            Simplifying connections for professionals and customers in your
            local area.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Find Experts
            </h3>
            <p className="text-gray-600">
              Browse a wide range of professionals in various fields to meet
              your needs.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Post Opportunities
            </h3>
            <p className="text-gray-600">
              Share your work requirements and let professionals come to you.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Connect Seamlessly
            </h3>
            <p className="text-gray-600">
              Communicate and collaborate with ease on our platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Looking for Professionals?
          </h2>
          <p className="text-gray-800 p-4">
            Find the right expert for your project or job and get started today.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-500">
            Browse Professionals
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-gray-200 text-white py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Say
        </h2>
        <div className="w-full max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center flex flex-col justify-center items-center">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s avatar`}
                      width={96}
                      height={96}
                      className="rounded-full mb-4 shadow-md"
                    />
                    <p className="text-lg text-gray-800 italic mb-4">{`"${testimonial.feedback}"`}</p>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
