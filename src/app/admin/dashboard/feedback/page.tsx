import React from 'react';
import { FaCommentDots } from 'react-icons/fa';

// Mock data from backend
const feedbacks = [
    {
        id: 1,
        user: 'John Doe',
        message: 'Great app, very intuitive and easy to use! I would recommend it to everyone I know. The features are great and the performance is excellent. Overall, I am very satisfied with the experience!',
        date: '2025-01-15',
    },
    {
        id: 2,
        user: 'Jane Smith',
        message: 'The app is good but needs some performance improvements. Sometimes it takes a little too long to load, especially when accessing the settings menu. If this can be fixed, the app will be amazing.',
        date: '2025-01-17',
    },
    {
        id: 3,
        user: 'Michael Brown',
        message: 'Excellent customer service, quick response! Every time I have an issue, the support team is quick to respond and very helpful. I am truly impressed with the service provided!',
        date: '2025-01-18',
    },
    {
        id: 4,
        user: 'John Doe',
        message: 'Great app, very intuitive and easy to use! I would recommend it to everyone I know. The features are great and the performance is excellent. Overall, I am very satisfied with the experience!',
        date: '2025-01-15',
    },
    {
        id: 5,
        user: 'Jane Smith',
        message: 'The app is good but needs some performance improvements. Sometimes it takes a little too long to load, especially when accessing the settings menu. If this can be fixed, the app will be amazing.',
        date: '2025-01-17',
    },
    {
        id: 6,
        user: 'Michael Brown',
        message: 'Excellent customer service, quick response! Every time I have an issue, the support team is quick to respond and very helpful. I am truly impressed with the service provided!',
        date: '2025-01-18',
    },
];

export default function Feedback() {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-indigo-50 via-gray-100 to-white">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">User Feedback</h1>

            <div className="space-y-6">
                {feedbacks.map((feedback) => (
                    <div
                        key={feedback.id}
                        className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                {/* Common Feedback Icon */}
                                <FaCommentDots className="text-indigo-600 text-2xl" />
                                <h3 className="text-xl font-semibold text-gray-800">{feedback.user}</h3>
                            </div>
                            <p className="text-sm text-gray-500">{feedback.date}</p>
                        </div>
                        {/* Adjusted Message Area */}
                        <p className="text-gray-700 text-base mb-2 leading-relaxed overflow-auto max-h-48">{feedback.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
