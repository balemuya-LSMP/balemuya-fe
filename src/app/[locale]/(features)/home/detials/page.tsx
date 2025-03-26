/* eslint-disable @next/next/no-img-element */
'use client';

export default function LearnMore() {
  const workDetails = {
    title: 'Electrician',
    details:
      'Electricians handle electrical wiring, repairs, and installations for residential and commercial buildings. Highly skilled professionals ensure safety and compliance with local regulations.',
    image: '/images/ele.png',
    availability: 'Available Monday to Saturday, 9:00 AM - 6:00 PM',
    rate: '$50/hour',
    contact: {
      phone: '+1 123 456 7890',
      email: 'electrician@example.com',
    },
    location: 'Los Angeles, CA',
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        {/* Image Section */}
        <div className="relative h-64 md:h-80 w-full mb-8">
          <img
            src={workDetails.image}
            alt={workDetails.title}
            className="rounded-lg object-cover h-full w-full shadow-sm"
          />
        </div>
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          {workDetails.title}
        </h1>
        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {workDetails.details}
        </p>
        {/* Additional Info */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 text-lg">
            <strong className="text-gray-800">Availability:</strong>{' '}
            {workDetails.availability}
          </p>
          <p className="text-gray-600 text-lg">
            <strong className="text-gray-800">Rate:</strong> {workDetails.rate}
          </p>
          <p className="text-gray-600 text-lg">
            <strong className="text-gray-800">Location:</strong>{' '}
            {workDetails.location}
          </p>
          <p className="text-gray-600 text-lg">
            <strong className="text-gray-800">Contact:</strong>{' '}
            <a
              href={`tel:${workDetails.contact.phone}`}
              className="text-blue-600 hover:underline"
            >
              {workDetails.contact.phone}
            </a>{' '}
            |{' '}
            <a
              href={`mailto:${workDetails.contact.email}`}
              className="text-blue-600 hover:underline"
            >
              {workDetails.contact.email}
            </a>
          </p>
        </div>
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-purple-700 text-white text-lg font-medium rounded-lg hover:bg-purple-800 transition"
          >
            Back
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
