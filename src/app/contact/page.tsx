/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from "react";
import Header from "../(features)/_components/header";
import Footer from "../(features)/_components/footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <><Header /><div className="min-h-screen bg-gradient-to-b from-gray-100 to-purple-100 flex flex-col items-center justify-center p-6">
          <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-10 text-center transform transition-all duration-300 hover:scale-105">
              <h1 className="text-4xl font-extrabold text-purple-800 mb-5">Contact <span className="text-purple-600">Us</span></h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-left">
                      <label className="block text-gray-700 font-semibold mb-2">Name</label>
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                          placeholder="Enter your name" />
                  </div>
                  <div className="text-left">
                      <label className="block text-gray-700 font-semibold mb-2">Email</label>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                          placeholder="Enter your email" />
                  </div>
                  <div className="text-left">
                      <label className="block text-gray-700 font-semibold mb-2">Message</label>
                      <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                          placeholder="Write your message..." />
                  </div>
                  <button
                      type="submit"
                      className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-800 transition duration-300 transform hover:scale-105 cursor-pointer shadow-md"
                  >
                      Send Message
                  </button>
              </form>
              <div className="mt-8 text-gray-700">
                  <p className="font-semibold">📍 Location:</p>
                  <p>Addis Ababa, Ethiopia</p>
                  <p className="font-semibold mt-3">📞 Phone:</p>
                  <p>+251 911 123 456</p>
                  <p className="font-semibold mt-3">📧 Email:</p>
                  <p>support@balemuya.com</p>
              </div>
          </div>
      </div>
      <Footer/>
      </>
  );
}
