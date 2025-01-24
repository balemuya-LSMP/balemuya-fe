/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
  useCreateAddressMutation,
  useAddEducationsMutation,
  useAddCertificationMutation,
  useCreateSkillsMutation,
  useAddPortifolioMutation,
  useUpdateProfessionalMutation,
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

      first_name: firstName || user?.first_name,
      middle_name: middleName || user?.middle_name,
      last_name: lastName || user?.last_name,
      phone_number: phoneNumber || user?.phone_number,
      email: email || user?.email,
      profile_image: profilePicture || null,
    };

    const formData = new FormData();
    formData.append("first_name", updatedData.first_name);
    formData.append("middle_name", updatedData.middle_name);
    formData.append("last_name", updatedData.last_name);
    formData.append("phone_number", updatedData.phone_number);
    formData.append("email", updatedData.email);
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
              className="w-1/3 sm:w-1/4 py-2 bg-blue-600 text-white rounded-md hover:bg-purple-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 sm:w-1/4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
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
  const [createAddress] = useCreateAddressMutation()

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

    try {
      await createAddress({ addresses: newAddress }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to address address:", error);
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
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SkillModal({ isOpen, onClose }: ModalProps) {
  const [skillName, setSkillName] = useState("");
  const { data: user } = useUserProfileQuery({});
  const [addSkill] = useCreateSkillsMutation();

  const existingSkills = user?.skills;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSkills = {
      names: [skillName],
    };

    try {
      await addSkill({ skills: newSkills }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update skills:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Skills</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Skill Name:
            <input
              list="skills"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="Select or add a skill"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            <datalist id="skills">
              {existingSkills?.map((skill: any) => (
                <option key={skill} value={skill} />
              ))}
            </datalist>
          </label>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function EducationModal({ isOpen, onClose }: ModalProps) {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [addEducation] = useAddEducationsMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newEducation = {
      school: school,
      degree: degree,
      field_of_study: fieldOfStudy,
    }



    try {
      await addEducation({ educations: newEducation }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update education:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Education</h1>
        <form>
          <label className="block mb-2">
            School:
            <input
              type="text"
              placeholder="Enter school name"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Degree/Diploma:
            <input
              type="text"
              value={degree}
              placeholder="Enter Degree/Diploma"
              onChange={(e) => setDegree(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Feild of Study:
            <input
              type="text"
              value={fieldOfStudy}
              placeholder="Enter Feild of Study"
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CertificateModal({ isOpen, onClose }: ModalProps) {
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [certificateName, setCertificateName] = useState("");
  const [addCertificate] = useAddCertificationMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!certificateImage) {
      console.error("No certificate image uploaded!");
      return;
    }

    const formData = new FormData();

    formData.append("name", certificateName);
    formData.append("image", certificateImage);

    try {
      await addCertificate({ certification: formData }).unwrap();
      console.log("Certificate updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update certification:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Certification</h1>
        <form>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              placeholder="Enter Certificate Name"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-4">
            Certificate Image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {certificateImage
                  ? certificateImage.name
                  : "Upload Certificate Image"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setCertificateImage(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function GovernmentIdModal({ isOpen, onClose }: ModalProps) {
  const [idFrontImage, setIdFrontImage] = useState<File | null>(null);
  const [idBackImage, setIdBackImage] = useState<File | null>(null);
  const [updateProfile] = useUpdateProfessionalMutation();



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!idFrontImage || !idBackImage) {
      console.error("No ID image uploaded!");
      return;
    }

    const formData = new FormData();
    formData.append("kebele_id_front_image", idFrontImage);
    formData.append("kebele_id_back_image", idBackImage);

    try {
      await updateProfile({ updated: formData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to upload ID images:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Government Issued ID</h1>
        <form>
          <label className="block mb-4">
            ID front Image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {idFrontImage
                  ? idFrontImage.name
                  : "Upload ID front Image"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setIdFrontImage(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <label className="block mb-4">
            ID back Image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {idBackImage
                  ? idBackImage.name
                  : "Upload back Image"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setIdBackImage(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PortfolioModal({ isOpen, onClose }: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [addPortifolio] = useAddPortifolioMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!image) {
      console.error("No image uploaded!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await addPortifolio({ portifolio: formData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update portifolio:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Portifolio</h1>
        <form>
          <label className="block mb-2">
            Title:
            <input
              type="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Certificate Name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Description:
            <input
              type="text"
              placeholder="Enter the description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-4">
            Portifolio Image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {image ? image.name : "Upload Portifolio Image"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function BioModal ({ isOpen, onClose }: ModalProps) {
  const [bio, setBio] = useState("");
  const [updateProfile] = useUpdateProfessionalMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedData = {
      bio: bio,
    };

    try {
      await updateProfile({ updated: updatedData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update bio:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Bio</h1>
        <form>
          <label className="block mb-2">
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter bio"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-1/4 mt-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="w-1/4 mt-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}