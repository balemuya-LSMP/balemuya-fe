"use client";

import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useGiveFeedbackMutation } from "@/store/api/userProfile.api";
import { toast, ToastContainer } from "react-toastify";

export default function Footer() {
  const [giveFeedback] = useGiveFeedbackMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async() => {
    const newData = {
      message: message,
      rating: rating,
    }
    try {
      await giveFeedback({ data: newData }).unwrap();
      toast ("Feedback submitted successfully");
      setIsOpen(false);
      setMessage("");
      setRating(0);
    } catch (error) {
      console.error(error);
    }
 
   
  };

  return (
    <footer className="bg-gray-800 py-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center">
        {/* Left side - Social Media Icons */}
        <div className="flex space-x-6 items-center">
          <a href="https://www.facebook.com/balemuya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com/balemuya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/balemuya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/company/balemuya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Right side - Footer text & Feedback Button */}
        <div className="flex items-center jusify-end gap-8">
          <div>
          <p className="text-lg font-semibold text-gray-300">
            © 2024 Balemuya. All rights reserved.
          </p>
          <p className="mt-2">
            Have questions? Contact us at {" "}
            <a href="mailto:support@balemuya.com" className="text-blue-400 hover:underline">
              support@balemuya.com
            </a>
          </p>
          <p className="mt-6 text-sm text-gray-500">
            Designed and developed with ❤️ by the Balemuya Team
          </p>
          </div>
          {/* Feedback Button */}
          <button onClick={() => setIsOpen(true)} className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded">
            Give Feedback
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800">Give Feedback</h2>

            {/* Message Input */}
            <textarea
              className="w-full mt-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Rating Section */}
            <div className="mt-4">
              <p className="text-gray-600">Rate our app:</p>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
            <button onClick={handleSubmit} className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800">
                Submit
              </button>
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-400 rounded text-gray-600 hover:text-gray-800">
                Cancel
              </button>
           
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center"/>
    </footer>
  );
}
