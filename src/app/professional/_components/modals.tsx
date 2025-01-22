/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/store/api/userProfile.api";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Address } from "@/store/types";
import { FaUpload } from "react-icons/fa";
import Loader from "@/app/(features)/_components/loader";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ isOpen, onClose }: ModalProps) {
  const { data: userData, error, isLoading } = useUserProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const user = userData?.user?.user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      user: {
        first_name: firstName || user?.first_name,
        middle_name: middleName || user?.middle_name,
        last_name: lastName || user?.last_name,
        phone_number: phoneNumber || user?.phone_number,
        email: email || user?.email,
      },
      profile_image: profilePicture || null,
    };

    const formData = new FormData();
    formData.append("user", JSON.stringify(updatedData.user));

    if (updatedData.profile_image) {
      formData.append("profile_image", updatedData.profile_image);
    }

    try {
      await updateProfile({ updated: formData }).unwrap();
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-full max-h-[90vh] overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Update User Details
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={user?.first_name || "Enter first name"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Middle Name:
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder={user?.middle_name || "Enter middle name"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={user?.last_name || "Enter last name"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={user?.phone_number || "Enter phone number"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user?.email || "Enter email"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-4">
            Profile Picture:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {profilePicture
                  ? profilePicture.name
                  : "Upload Profile Picture"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="w-1/3 sm:w-1/4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 sm:w-1/4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddressModal({ isOpen, onClose }: ModalProps) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [updateProfile] = useUpdateProfileMutation();

  const { position, getPosition, isLoading, error } = useGeolocation();

  useEffect(() => {
    if (isOpen) {
      getPosition();
    }
  }, [isOpen, getPosition]);

  const handeSubmit = async (e: any) => {
    e.preventDefault();
    const newAddress = {
      country: country,
      region: region,
      city: city,
      latitude: position?.lat,
      longitude: position?.lng,
      is_current: true,
    };
    const updatedData = {
      user: {
        addresses: [newAddress],
      },
    };

    try {
      await updateProfile({ updated: updatedData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Address</h1>
        <form>
          <label className="block mb-2">
            Country:
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Region:
            <input
              type="text"
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            City:
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handeSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-purple-700 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SkillModal({ isOpen, onClose }: ModalProps) {
  const [skillName, setSkillName] = useState("");
  const [updateProfile] = useUpdateProfileMutation();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedData = {
      skills: [{ name: skillName }],
    };
    try {
      await updateProfile({ updated: updatedData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update skills:", error);
    }

  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Skills</h1>
        <form>
          <label className="block mb-2">
            Skill Name:
            <input
              type="text"
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="Enter skill name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-purple-700 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EducationModal() {
  return (
    <div>
      <h1>Education Modal</h1>
      <form>
        <label>
          School:
          <input type="text" placeholder="Enter school name" />
        </label>
        <label>
          Degree:
          <input type="text" placeholder="Enter degree" />
        </label>
        <label>
          Education Certificate:
          <input type="file" accept="image/*" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export function CertificateModal() {
  return (
    <div>
      <h1>Certificate Modal</h1>
      <form>
        <label>
          Certificate Name:
          <input type="text" placeholder="Enter certificate name" />
        </label>
        <label>
          Certificate Image:
          <input type="file" accept="image/*" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export function GovernmentIdModal() {
  return (
    <div>
      <h1>Government ID Modal</h1>
      <form>
        <label>
          ID Front Image:
          <input type="file" accept="image/*" />
        </label>
        <label>
          ID Back Image:
          <input type="file" accept="image/*" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export function PortfolioModal() {
  return (
    <div>
      <h1>Portfolio Modal</h1>
      <form>
        <label>
          Portfolio Title:
          <input type="text" placeholder="Enter portfolio title" />
        </label>
        <label>
          Portfolio Description:
          <textarea placeholder="Enter portfolio description" />
        </label>
        <label>
          Portfolio Image:
          <input type="file" accept="image/*" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
