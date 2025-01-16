/* eslint-disable @next/next/no-img-element */
'use client';

import { FaArrowLeft } from "react-icons/fa";

export default function UserDetails() {
    // Mock data for demonstration
    const userData = {
      firstName: "Jane",
      lastName: "Cooper",
      age: 34,
      gender: "Female",
      phoneNumber: "(225) 555-0118",
      city: "Addis Ababa",
      bio: "A highly motivated and skilled professional with over 10 years of experience in the software industry.",
      email: "jane.cooper@example.com",
      imageUrl: "/images/user.jpg",
      profession: "Software Engineer",
      kebeleIdImage: "/images/fds.jpg", // Image for Kebele ID
      certificationImages: [
        "/images/c1.png",
        "/images/c2.jpg",
      ], // Images for certifications
      work: [
        "Web Application Development",
        "Mobile App Development",
        "UI/UX Design",
        "Project Management",
      ],
      subscriptionExpired: false,
      isVerified: false,
    };
  
    const handleVerifyAccount = () => {
      console.log("Account verified!");
      // Add your logic to verify the account, e.g., sending a request to the backend
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h1 className="text-xl font-semibold text-gray-800">User Details</h1>
            <button
              onClick={() => console.log("Navigate Back")}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md"
            >
              <FaArrowLeft className="mr-2" />
            </button>
          </div>
  
          {/* User Information */}
          <div className="p-6 flex flex-col md:flex-row items-start gap-6">
            <img
              src={userData.imageUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full border-2 border-gray-300"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-600 text-sm">{userData.bio}</p>
  
              <div className="mt-4">
                <p className="text-gray-800 font-medium">
                  <strong>Age:</strong> {userData.age}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Phone:</strong> {userData.phoneNumber}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>City:</strong> {userData.city}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Profession:</strong> {userData.profession}
                </p>
              </div>
            </div>
          </div>
  
          {/* Kebele ID */}
          <div className="p-6 border-t">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Kebele ID</h2>
            {userData.kebeleIdImage ? (
              <img
                src={userData.kebeleIdImage}
                alt="Kebele ID"
                className="w-1/2 h-auto max-h-72 border border-gray-300 rounded-md  flex items-center justify-center"
              />
            ) : (
              <p className="text-gray-600">Kebele ID not provided.</p>
            )}
          </div>
  
          {/* Certification Details */}
          <div className="p-6 border-t">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Certifications
            </h2>
            {userData.certificationImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.certificationImages.map((certImage, index) => (
                  <img
                    key={index}
                    src={certImage}
                    alt={`Certification ${index + 1}`}
                    className="w-full h-[250px] object-cover border border-gray-300 rounded-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No certifications provided.</p>
            )}
          </div>
  
          {/* Work Details */}
          <div className="p-6 border-t">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Work/Services
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {userData.work.map((work, index) => (
                <li key={index} className="text-gray-600">
                  {work}
                </li>
              ))}
            </ul>
          </div>
  
          {/* Admin Actions */}
          <div className="p-6 border-t bg-gray-50 flex flex-col gap-4">
            {userData.subscriptionExpired && (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-600 font-medium">
                  Subscription plan has expired. The user may need assistance.
                </p>
                <button
                  onClick={() => console.log("Block User")}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-2"
                >
                  Block User
                </button>
              </div>
            )}
  
            {!userData.isVerified &&
              userData.kebeleIdImage &&
              userData.certificationImages.length > 0 && (
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-600 font-medium">
                    All required information is present. You can verify this
                    account.
                  </p>
                  <button
                    onClick={handleVerifyAccount}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
                  >
                    Verify Account
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
  