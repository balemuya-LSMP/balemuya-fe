/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { FaLinkedinIn, FaTwitter, FaGithub} from "react-icons/fa";
import { MdEdit } from "react-icons/md";


export default function Profile() {
  const { data, isLoading, error } = useUserProfileQuery({});

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        An error occurred while fetching the profile.
      </p>
    );
  }

  const user = data?.user?.user || {};
  const userDetails = {
    title: data?.user?.user_type || "Professional",
    bio: data?.user?.bio || "No bio available.",
    image: data?.user?.business_logo || "/images/P.JPG",
    isAvailable: data?.user?.is_available ? "Yes" : "No",
    rating: data?.user?.rating || "Not Rated",
    experience: `${data?.user?.years_of_experience || 0} years`,
    contact: {
      phone: user.phone_number || "N/A",
      email: user.email || "N/A",
    },
    fullName: `${user.first_name || ""} ${user.middle_name || ""}`.trim(),
    address: user.addresses?.length
    ? user.addresses
    : [
        {
          location: "Addis Ababa",
          street_address: "123 AA St",
          city: "AA",
          state: "AA",
          zip_code: "12345",
        },
      ],
    gender: user.gender || "N/A",
    skills: data?.user?.skills || [],
    educations: data?.user?.educations || [],
    portfolios: data?.user?.portfolios || [],
    certificates: data?.user?.certificates || [],
    governmentID: data?.user?.government_id || {
      front_image: "/images/fds.jpg",
      back_image: "/images/fds.jpg",
    },
    socialLinks: {
      linkedin: user.linkedin_url || "http://linkedin.com",
      twitter: user.twitter_url || "http://twitter.com",
      facebook: user.facebook_url || "http://myportfolio.com",
      instagram: user.instagram_url || "http://instagram.com",
      github: user.github_url || "http://github.com",
    },
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:flex md:items-start md:space-x-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-6 md:mb-0 w-full md:w-1/3">
          <img
            src={userDetails.image}
            alt={`${userDetails.fullName}'s Profile Picture`}
            className="rounded-full object-cover h-40 w-40 shadow-lg"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">{userDetails.fullName}</h1>
          <p className="text-purple-700 font-semibold">{userDetails.title}</p>
          <p className="text-gray-600 text-sm mt-2">{userDetails.bio}</p>

          <hr className="my-6 border-t border-gray-300" />

          <div className="mt-4 text-sm space-y-2">
            <div className="flex justify-between ">
            <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
            <button className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
              <MdEdit />
            </button>
            </div>
            
            <div>
            
              <div>
              <a href={`tel:${userDetails.contact.phone}`} className="text-blue-600 hover:underline">
                {userDetails.contact.phone}
              </a>{' '}
              </div>
              
              {' '}
              <a href={`mailto:${userDetails.contact.email}`} className="text-blue-600 hover:underline">
                {userDetails.contact.email}
              </a>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-300" />
          <div className="mt-6">
          <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
          <button className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
            <MdEdit />
          </button>
          </div>
         
          {userDetails.address?.map((address:any, index:any) => (
            <div key={index} className="mt-4">
              <h3 className="text-gray-800 font-medium">{address.location ?? "Ethiopia"}</h3>
              <p className="text-gray-600">{address.street_address ?? "Addis Ababa"}</p>
              <p className="text-gray-600">{address.city ?? "AA"}, {address.state} {address.zip_code}</p>
            </div>
          ))}

          </div>

          <hr className="my-6 border-t border-gray-300" />
          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            <ul className="list-disc pl-5 mt-2">
              {userDetails.skills.map((skill:any, index:any) => (
                <li key={index} className="text-gray-700">{skill.name}</li>
              ))}
            </ul>
          </div>

          <hr className="my-6 border-t border-gray-300" />

          {/* Education */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            {userDetails.educations.map((edu:any, index:any) => (
              <div key={index} className="mt-4">
                <h3 className="text-gray-800 font-medium">{edu.school} - {edu.degree}</h3>
                <p className="text-gray-600">{edu.field_of_study} ({edu.start_date} - {edu.end_date})</p>
                <p className="text-gray-600">{edu.location}</p>
              </div>
            ))}
          </div>

          <hr className="my-6 border-t border-gray-300" />

          {/* Portfolios */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Portfolios</h2>
            {userDetails.portfolios.map((portfolio:any, index:any) => (
              <div key={index} className="mt-4">
                <h3 className="text-gray-800 font-medium">{portfolio.title}</h3>
                <p className="text-gray-600">{portfolio.description}</p>
              </div>
            ))}
          </div>

          <hr className="my-6 border-t border-gray-300" />

          {/* Social Links */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Social Links</h2>
            <div className="flex space-x-4 mt-2">
              <a href={userDetails.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                <FaLinkedinIn />
              </a>
              <a href={userDetails.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                <FaTwitter />
              </a>
              <a href={userDetails.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">
                <FaGithub />
              </a>
            </div>
          </div>

          <hr className="my-6 border-t border-gray-300" />

          {/* Certificates */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Certificates</h2>
            {userDetails.certificates.map((cert:any, index:any) => (
              <div key={index} className="mt-4">
                <h3 className="text-gray-800 font-medium">{cert.name}</h3>
                <p className="text-gray-600">Issued by: {cert.issued_by}</p>
                <p className="text-gray-600">Expiration: {cert.expiration_date}</p>
                <a href={cert.document_url} className="text-blue-600 hover:underline">View Certificate</a>
              </div>
            ))}
          </div>

          <hr className="my-6 border-t border-gray-300" />

          {/* Government Issued ID */}
          <div className="mt-6">
            <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Government Issued ID</h2>
            <button className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
              <MdEdit />
            </button>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <img
                src={userDetails.governmentID.front_image}
                alt="Front of Government ID"
                className="w-full h-32 object-cover rounded mb-2"
              />
              <img
                src={userDetails.governmentID.back_image}
                alt="Back of Government ID"
                className="w-full h-32 object-cover rounded"
              />
            </div>
          </div>

          {/* Action Buttons */}
        </div>
      </div>
    </div>
  );
}
