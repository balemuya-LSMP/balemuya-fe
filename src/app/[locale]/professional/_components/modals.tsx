/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import {
  useAddAddressesMutation,
  useAddCertificatesMutation,
  useAddEducationsMutation,
  useAddPortifoliosMutation,
  useAddSkillsMutation,
  useUpdateAddressesMutation,
  useUpdateCertificatesMutation,
  useUpdateEducationsMutation,
  useUpdatePortifoliosMutation,
  useUpdateProfessionalProfileMutation,
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/store/api/userProfile.api";
import { useGeolocation } from "@/hooks/useGeolocation";
import { FaUpload } from "react-icons/fa";
import Loader from "../../(features)/_components/loader";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  data?: any;
}

export function UserModal({ isOpen, onClose }: ModalProps) {
  const { data: userData, error, isLoading } = useUserProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();

  const [firstName, setFirstName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }


  const user = userData?.user?.user;

  console.log("User data:", user);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      first_name: firstName ?? user?.first_name ?? '',
      last_name: lastName ?? user?.last_name ?? '',
      org_name: orgName ?? user?.org_name ?? '',
      phone_number: phoneNumber ?? user?.phone_number ?? '',
      bio: bio ?? user?.bio ?? '',
      profile_image: profilePicture ?? null,
    };

    const formData = new FormData();
    formData.append("first_name", updatedData.first_name);
    formData.append("last_name", updatedData.last_name);
    formData.append("org_name", updatedData.org_name);
    formData.append("phone_number", updatedData.phone_number);
    formData.append("bio", updatedData.bio);


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
          {user.entity_type === "organization" ? (
            <label className="block mb-2">
              Organization Name:
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder={user?.org_name || "Enter organization name"}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
          ) : (
            <>
              <label className="block mb-2">
                First Name:
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={user?.first_name || "Enter first name"}
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
            </>)}
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
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={user?.bio || "Enter Bio"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            ></textarea>
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

export function AddressModal({ isOpen, onClose, mode, data }: ModalProps) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [addAddress] = useAddAddressesMutation();
  const [updateAddress] = useUpdateAddressesMutation();
  const { position, getPosition, isLoading, error } = useGeolocation();

  useEffect(() => {
    if (isOpen) {
      getPosition();
    }
  }, [isOpen, getPosition]);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && data) {
        setCountry(data.country || "");
        setRegion(data.region || "");
        setCity(data.city || "");
      } else if (mode === "add") {
        setCountry("");
        setRegion("");
        setCity("");
      }
    }
  }, [mode, data, isOpen]);

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
      if (mode === "add") {
        await addAddress({ address: newAddress }).unwrap();
      } else if (mode === "edit") {
        await updateAddress({ address: newAddress }).unwrap();
      }
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Region:
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            City:
            <input
              type="text"
              value={city}
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
  const [addSkills] = useAddSkillsMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedSkills = {
      names: [skillName]
    }

    try {
      await addSkills({ skills: updatedSkills }).unwrap();
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

export function EducationModal({ isOpen, onClose, mode, data }: ModalProps) {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [addEducations] = useAddEducationsMutation();
  const [updateEducations] = useUpdateEducationsMutation();


  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && data) {
        setSchool(data.school || "");
        setDegree(data.degree || "");
        setFieldOfStudy(data.field_of_study || "");
      } else if (mode === "add") {
        setSchool("");
        setDegree("");
        setFieldOfStudy("");
      }
    }
  }, [isOpen, mode, data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedEducations = {
      school: school,
      degree: degree,
      field_of_study: fieldOfStudy,
    }
    try {
      if (mode === "add") {
        await addEducations({ educations: updatedEducations }).unwrap();
      } else if (mode === "edit") {

        await updateEducations(
          { id: data?.id ?? "", educations: updatedEducations }
        ).unwrap();
      }
      onClose();

    } catch (error) {
      console.error("Failed to update educations:", error);
    }

  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">
          {mode === "edit" ? "Edit Education" : "Add Education"}
        </h1>
        <form>
          <label className="block mb-2">
            School:
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Enter school"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Degree:
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Enter degree"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Field of Study:
            <input
              type="text"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="Enter field of study"
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

export function CertificateModal({ isOpen, onClose, mode, data }: ModalProps) {
  const [certificateName, setCertificateName] = useState("");
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [addCertificates] = useAddCertificatesMutation();
  const [updateCertificates] = useUpdateCertificatesMutation();

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && data) {
        setCertificateName(data.name || "");
      } else if (mode === "add") {
        setCertificateName("");
      }
    }
  }, [isOpen, mode, data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", certificateName);
    if (certificateImage) {
      formData.append("image", certificateImage);
    }

    try {
      if (mode === "add") {
        await addCertificates({ certificates: formData }).unwrap();
      } else if (mode === "edit") {
        await updateCertificates({ id: data?.id ?? "", certificates: formData }).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Failed to update certificates:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Certificates</h1>
        <form>
          <label className="block mb-2">
            Certificate Name:
            <input
              type="text"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              placeholder="Enter Certificate Name"
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
                onChange={(e) => setCertificateImage(e.target.files?.[0] || null)}
                className="hidden"
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

  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);

  const [updateID] = useUpdateProfessionalProfileMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (idFront) {
      formData.append("kebele_id_front_image", idFront);
    }
    if (idBack) {
      formData.append("kebele_id_back_image", idBack);
    }

    try {
      await updateID({ updated: formData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update ID:", error);
    }
  }
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Certificates</h1>
        <form>
          <label className="block mb-4">
            ID front image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {idFront
                  ? idFront.name
                  : "Upload ID Front Image"}
              </span>
              <input
                type="file"
                onChange={(e) => setIdFront(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          </label>
          <label className="block mb-4">
            ID back Image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {idBack
                  ? idBack.name
                  : "Upload ID Back Image"}
              </span>
              <input
                type="file"
                onChange={(e) => setIdBack(e.target.files?.[0] || null)}
                className="hidden"
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

export function PortfolioModal({ isOpen, onClose, data, mode }: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [addPortfolios] = useAddPortifoliosMutation();
  const [updatePortfolios] = useUpdatePortifoliosMutation();

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
      } else if (mode === "add") {
        setTitle("");
        setDescription("");
      }
    }
  }, [isOpen, mode, data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {

      if (mode === "edit") {
        await updatePortfolios({ id: data?.id ?? "", portifolios: formData }).unwrap();
        onClose();
      } else if (mode === "add") {

        await addPortfolios({ portifolios: formData }).unwrap();
        onClose();
      }

    } catch (error) {
      console.error("Failed to update portifolios:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Portifolios</h1>
        <form>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-4">
            Portifolio Image:
            <div className="mt-1 flex items-center justify-center p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                {image
                  ? image.name
                  : "Upload Portifolio Image"}
              </span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
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

