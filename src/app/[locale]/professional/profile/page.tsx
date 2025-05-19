/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useDeleteCertificatesMutation, useDeleteEducationsMutation, useDeletePortifoliosMutation, useRemoveAddressesMutation, useRequestVerficationMutation, useUserProfileQuery, useAddCategoriesMutation, useRemoveCategoriesMutation, useFetchProfessionalBankAccountQuery, useWithdrawFromPlatformMutation } from "@/store/api/userProfile.api";
import { useGetCategoriesQuery } from "@/store/api/services.api";
import { use, useState } from "react";
import {
  FaCheckCircle,
  FaEdit,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaMailBulk,
  FaPhone,
  FaTimesCircle,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { FiCheckCircle, FiEdit, FiTrash } from "react-icons/fi";
import { MdAdd, MdClose, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { Box, Button, Paper } from "@mui/material";
import {
  UserModal,
  EducationModal,
  PortfolioModal,
  SkillModal,
  GovernmentIdModal,
  CertificateModal,
  AddressModal,
  BankModal,
} from "../_components/modals";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../(features)/_components/loader";
import { set } from "date-fns";
import Header from "../_components/header";
import Footer from "../../(features)/_components/footer";

export default function Profile() {
  const { data: userPofile, isLoading, error } = useUserProfileQuery({});
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: bankAccount } = useFetchProfessionalBankAccountQuery();
  const [withdrawFromPlatform] = useWithdrawFromPlatformMutation();

  const [addCategory] = useAddCategoriesMutation();
  const [removeCategory] = useRemoveCategoriesMutation();
  const [requestVerification] = useRequestVerficationMutation();
  const [deleteEducation] = useDeleteEducationsMutation();
  const [deletePortifolio] = useDeletePortifoliosMutation();
  const [deleteAddress] = useRemoveAddressesMutation();
  const [deleteCertificate] = useDeleteCertificatesMutation();

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [isEducationModalOpen, setEducationModalOpen] = useState(false);
  const [isCertificateModalOpen, setCertificateModalOpen] = useState(false);
  const [isGovernmentIdModalOpen, setGovernmentIdModalOpen] = useState(false);
  const [isPortfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [isBankModalOpen, setBankModalOpen] = useState(false);
  const [selectdEducation, setSelectedEducation] = useState<any>(null);
  const [selctedPortfolio, setSelectedPortfolio] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        An error occurred while fetching the profile.
      </p>
    );
  }

  const {
    user: {
      user: {
        id,
        profile_image_url,
        email,
        entity_type,
        phone_number,
        user_type,
        bio,
        is_active,
        is_blocked,
        org_name,
        created_at,
        address = null,
        first_name,
        last_name
      } = {},
      gender,
      kebele_id_front_image_url,
      kebele_id_back_image_url,
      skills = [],
      rating,
      balance,
      num_of_request,
      is_verified,
      categories = [],
      educations = [],
      portfolios = [],
      certificates = []
    } = {}
  } = userPofile || {};

  const handeSubmitRequestVerification = async () => {
    try {
      await requestVerification();
      toast.success("Request for verification submitted successfully");
    } catch (error) {
      console.error(error);
    }
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newCategory = {
      name: selectedCategory
    }

    try {
      await addCategory({ data: newCategory }).unwrap();
      toast.success("Category add Successfully")
      setCategoryModalOpen(false)

    } catch (error) {
      console.error("Failed to add category:", error);
    }
  }

  const handleDelete = async (category: string) => {
    const newData = {
      name: category,
    }
    try {
      await removeCategory({ data: newData }).unwrap();
      toast.success("Remove Category")
    } catch (error) {
      toast.error("Failed to delete category")
    }
  }

  // Education Action
  const handleDeleteEducation = async (educationId: string) => {
    try {
      await deleteEducation({ id: educationId });
      toast.success("Education deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }
  const handleEditEducation = (education: any) => {
    setSelectedEducation(education);
    setEducationModalOpen(true);
  }

  const handleDeletePortifolio = async (portifolioId: string) => {
    try {
      await deletePortifolio({ id: portifolioId });
      toast.success("Certification deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }
  const handleEditPortfolio = async (portfolio: any) => {
    setSelectedPortfolio(portfolio);
    setPortfolioModalOpen(true);
  }
  // Address Action
  const handleDeleteAddress = async () => {
    try {
      await deleteAddress();
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }

  // certificate Action
  const handleDeleteCertificate = async (certificateId: string) => {
    try {
      await deleteCertificate({ id: certificateId });
      toast.success("Certificate deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }
  const handleEditCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setCertificateModalOpen(true);
  }

  const handleWithdraw = async () => {
    if (withdrawAmount) {
      try {
        await withdrawFromPlatform({ amount: parseFloat(withdrawAmount) }).unwrap();
        toast.success("Withdrawal successful");
        setWithdrawAmount('');
        setWithdrawModalOpen(false);
      } catch (error) {
        toast.error("Withdrawal failed");
      }
    } else {
      toast.error("Please enter an amount to withdraw");
    }
  }
  return (
    <>
      <Header searchQuery={""} setSearchQuery={function (query: string): void {
        throw new Error("Function not implemented.");
      }} filter={[]} setFilter={function (filter: string[]): void {
        throw new Error("Function not implemented.");
      }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
          padding: 4,
        }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: '900px', width: '100%' }}>
          {/* Profile Details */}
          <Box className="flex-1 text-center md:text-left">
            <div className="relative">
              <button
                className="absolute top-2 right-1 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md"
                onClick={() => setUserModalOpen(true)}
              >
                <MdEdit className="text-gray-600" />
              </button>
              <div className="flex flex-col items-center md:items-center md:ml-10">
                <div className="flex justify-center items-center mb-6 md:mb-0 w-32 md:w-40">
                  <img
                    src={profile_image_url}
                    alt={`${first_name}'s Profile Picture`}
                    className="rounded-full object-cover h-32 w-32 md:h-40 md:w-40 shadow-lg"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mt-2 md:ml-10">
                  {entity_type === "organization" ? org_name : `${first_name} ${last_name}`}
                </h1>
                <p className="text-gray-600 text-sm mt-2 md:ml-10">{bio}</p>
                <div className="flex flex-col justify-start items-center gap-3 p-4 rounded-lg shadow-md bg-white">
                  <div className="flex items-center gap-2 mt-2 md:ml-10">
                    <FaPhone className="text-purple-700" />
                    <a
                      href={`tel:${phone_number}`}
                      className="text-gray-700 hover:underline"
                    >
                      {phone_number}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 md:ml-10">
                    <MdMail className="text-purple-700" />
                    <a
                      href={`mailto:${email}`}
                      className="text-gray-700 hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 md:ml-10">
                    <FaUser className="text-purple-700" />
                    <p className="text-gray-800">
                      {user_type
                        ? user_type.charAt(0).toUpperCase() + user_type.slice(1)
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                {/* num of request left */}
                <div className="flex items-center gap-3 p-4 mt-2 rounded-lg shadow-md bg-white">
                  {num_of_request === 0 ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <FaExclamationTriangle className="text-2xl" />
                      <p className="font-semibold">You have finished the subscription</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <FaCheckCircle className="text-2xl" />
                      <p className="font-semibold">You have {num_of_request} job request left</p>
                    </div>
                  )}
                </div>

              </div>
              {
                isUserModalOpen && (
                  <UserModal
                    isOpen={isUserModalOpen}
                    onClose={() => setUserModalOpen(false)} mode={"add"} />
                )
              }
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Bank Account</h2>
                <button
                  onClick={() => {
                    setSelectedBank(bankAccount ?? null);
                    setBankModalOpen(true);
                  }}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
                >
                  {bankAccount ? <MdEdit /> : <MdAdd />}
                </button>
              </div>

              {bankAccount ? (
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Account Name</span>
                          <span className="text-lg font-semibold text-gray-800 mt-1">{bankAccount.account_name}</span>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Account Number</span>
                          <span className="text-lg font-semibold text-gray-800 mt-1">{bankAccount.account_number}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Bank</span>
                          <span className="text-lg font-semibold text-gray-800 mt-1">{bankAccount.bank_details.name}</span>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Bank Code</span>
                          <span className="text-lg font-semibold text-gray-800 mt-1">{bankAccount.bank_details.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separate Balance and Withdraw Section */}
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Available Balance</span>
                        <span className="text-2xl font-bold text-gray-800">
                          {balance ?? 0} Birr
                        </span>
                      </div>
                      <button
                        onClick={() => setWithdrawModalOpen(true)}
                        className="px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                      >
                        Withdraw Funds
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 p-8 bg-gray-50 rounded-xl text-center">
                  <div className="text-gray-400 mb-3">
                    <CiBank className="inline-block text-3xl" />
                  </div>
                  <p className="text-gray-500 font-medium">No bank account found</p>
                  <button
                    onClick={() => setBankModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Add Bank Account
                  </button>
                </div>
              )}

              {isBankModalOpen && (
                <BankModal
                  isOpen={isBankModalOpen}
                  onClose={() => setBankModalOpen(false)}
                  mode={bankAccount ? "edit" : "add"}
                  data={bankAccount}
                />
              )}

              {/* Withdraw Modal */}
              {isWithdrawModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Withdraw Funds</h3>
                      <button
                        onClick={() => setWithdrawModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MdClose />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">Available Balance</span>
                          <span className="text-lg font-bold text-gray-800">
                            {balance !== null ? `${balance} Birr` : '0.00 Birr'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Birr)</label>
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          placeholder="Enter amount to withdraw"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          max={balance || undefined}
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleWithdraw}
                          disabled={!withdrawAmount || (balance !== null && parseFloat(withdrawAmount) > balance)}
                          className={`w-full py-3 px-4 rounded-md text-white font-medium ${!withdrawAmount || (balance !== null && parseFloat(withdrawAmount) > balance)
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                            } transition-colors duration-200`}
                        >
                          Confirm Withdrawal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Add categories  is drop down select and post */}
            <hr className="my-6 border-t border-gray-300" />
            <div className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                {Array.isArray(categories) && categories.length < 3 && (
                  <button
                    onClick={() => setCategoryModalOpen(true)}
                    className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
                  >
                    <MdAdd />
                  </button>
                )}

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {categories.map((category: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <FaCheckCircle className="text-blue-500 text-lg mr-3" />
                    <span className="text-gray-700 font-medium">
                      {category?.name}
                    </span>

                    <button
                      onClick={() => handleDelete(category.name)}
                      className="ml-auto text-gray-600 bg-blue-100 rounded-full p-2 hover:bg-gray-300 hover:text-blue-700 transition duration-200"

                    ><FaTrash /></button>
                  </div>
                ))}
              </div>
              {
                isCategoryModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-xl font-bold mb-4">Add Category</h2>

                      <form onSubmit={handleSubmit}>
                        <label className="block mb-2 font-medium">Select Category</label>
                        <select
                          className="w-full p-2 border rounded mb-4"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">selcet category --</option>
                          {categoriesData?.map((category: any, index: any) => (
                            <option key={category.id ?? index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={() => setCategoryModalOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }
            </div>
            {/* Addresses */}
            <hr className="my-6 border-t border-gray-300" />
            <div className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
                <button
                  onClick={() => {
                    setSelectedAddress(address ?? null);
                    setAddressModalOpen(true);
                  }}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
                >
                  {address ? <MdEdit /> : <MdAdd />}
                </button>
              </div>
              {
                address ? (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-gray-800 font-medium">{address?.country}</h3>
                        <p className="text-gray-600">{address?.region}</p>
                        <p className="text-gray-600">{address?.city}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteAddress()}
                          className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-red-300 hover:text-red-700 transition duration-200"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>please add your address</p>
                )
              }

              {isAddressModalOpen && (
                <AddressModal
                  isOpen={isAddressModalOpen}
                  onClose={() => setAddressModalOpen(false)}
                  mode={address ? "edit" : "add"}
                  data={address}
                />
              )}
            </div>
            <hr className="my-6 border-t border-gray-300" />
            {/* Skills */}
            <div className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800 m-2">Skills</h2>
                <button
                  onClick={() => setSkillModalOpen(true)}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
                >
                  <MdAdd />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {skills.map((skill: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <FaCheckCircle className="text-blue-500 text-lg mr-3" />
                    <span className="text-gray-700 font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
              {isSkillModalOpen && (
                <SkillModal
                  isOpen={isSkillModalOpen}
                  onClose={() => setSkillModalOpen(false)} mode={"add"} />
              )}
            </div>
            <hr className="my-6 border-t border-gray-300" />
            {/* Education */}
            <div className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
                <button
                  onClick={() => {
                    setSelectedEducation(null);
                    setEducationModalOpen(true)
                  }}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
                >
                  <MdAdd />
                </button>
              </div>
              {educations && educations.length > 0 ? (
                <ul className="space-y-4">
                  {educations.map((education: any, index: any) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <FiCheckCircle className="text-purple-700 text-2xl flex-shrink-0" />
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            {education.degree} in {education.field_of_study}
                          </h4>
                          <p className="text-sm text-gray-600">{education.school}</p>
                          {education.graduation_year && (
                            <p className="text-sm text-gray-500">
                              Graduated: {education.graduation_year}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEducation(education)}
                          className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-blue-700 transition duration-200"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(education.id)}
                          className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-red-300 hover:text-red-700 transition duration-200"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No education details provided.</p>
              )}

              {isEducationModalOpen && (
                <EducationModal
                  isOpen={isEducationModalOpen}
                  onClose={() => setEducationModalOpen(false)}
                  mode={selectdEducation ? "edit" : "add"}
                  data={selectdEducation}
                />
              )}
            </div>

            <hr className="my-6 border-t border-gray-300" />
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Portfolios
              </h2>
              <button
                onClick={() => {
                  setSelectedPortfolio(null);
                  setPortfolioModalOpen(true)
                }}
                className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200"
              >
                <MdAdd />
              </button>
            </div>

            {portfolios && portfolios.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {portfolios.map((portfolio: any, index: any) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src={portfolio.portfolio_image_url ?? "/images/c1.png"}
                      alt="Portfolio"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">
                        {portfolio.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {portfolio.description || "No description available."}
                      </p>
                    </div>
                    {/* Add icons for edit and delete */}
                    <div className="p-2 border-t border-gray-200">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => handleEditPortfolio(portfolio)}
                          className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-blue-700 transition duration-200">
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDeletePortifolio(portfolio.id)}
                          className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-red-300 hover:text-red-700 transition duration-200">
                          <FiTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No portfolio provided.</p>
            )}
            {
              isPortfolioModalOpen && (
                <PortfolioModal
                  isOpen={isPortfolioModalOpen}
                  onClose={() => setPortfolioModalOpen(false)}
                  mode={selctedPortfolio ? "edit" : "add"}
                  data={selctedPortfolio}
                />
              )
            }
            <hr className="my-6 border-t border-gray-300" />
            {/* Certificates */}
            <div className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Certification
                </h2>
                <button
                  onClick={() => {
                    setSelectedCertificate(null);
                    setCertificateModalOpen(true)
                  }}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
                  <MdAdd />
                </button>
              </div>

              {certificates && certificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {certificates.map((certification: any, index: any) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    >
                      <img
                        src={
                          certification.certificate_image_url ?? "/images/c1.png"
                        }
                        alt="Certification"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {certification.name}
                        </h4>
                      </div>
                      <div className="p-2 border-t border-gray-200">
                        <div className="flex justify-end gap-2 items-center">
                          <button
                            onClick={() => handleEditCertificate(certification)}
                            className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-blue-700 transition duration-200">
                            <MdEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(certification.id)}
                            className="p-2 text-gray-600 bg-gray-200 rounded-md hover:bg-red-300 hover:text-red-700 transition duration-200">
                            <FiTrash />
                          </button>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              ) : (
                <p>No certifications provided.</p>
              )}
              {
                isCertificateModalOpen && (
                  <CertificateModal
                    isOpen={isCertificateModalOpen}
                    onClose={() => setCertificateModalOpen(false)}
                    mode={selectedCertificate ? "edit" : "add"}
                    data={selectedCertificate}
                  />
                )
              }
            </div>
            <hr className="my-6 border-t border-gray-300" />
            {/* Government Issued ID */}
            <div className="mt-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Government Issued ID
                </h2>
                <button
                  onClick={() => setGovernmentIdModalOpen(true)}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-purple-700 transition duration-200">
                  <MdAdd />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <img
                  src={kebele_id_front_image_url}
                  alt="Front of Government ID"
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <img
                  src={kebele_id_back_image_url}
                  alt="Back of Government ID"
                  className="w-full h-48 object-cover rounded mb-2"
                />
              </div>
              {
                isGovernmentIdModalOpen && (
                  <GovernmentIdModal
                    isOpen={isGovernmentIdModalOpen}
                    onClose={() => setGovernmentIdModalOpen(false)} mode={"add"} />
                )
              }
            </div>
            <hr className="my-6 border-t border-gray-300" />
            {/* request verification button */}
            <div className="flex justify-center mt-6">
              {is_verified ? (
                <div className="flex items-center justify-center gap-2 text-green-700 cursor-pointer hover:text-green-800 transition-all duration-300 w-full max-w-xs py-3 px-6 focus:outline-none">
                  <FaCheckCircle size={20} />
                  <span className="text-lg font-semibold">Verified</span>
                </div>
              ) : (
                <button
                  onClick={handeSubmitRequestVerification}
                  className="flex items-center justify-center gap-2 text-purple-700 cursor-pointer hover:text-purple-800 transition-all duration-300 w-full max-w-xs border-2 border-purple-700 py-3 px-6 rounded-md shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2">
                  <FaExclamationCircle size={20} />
                  <span className="text-lg font-semibold">Request Verification</span>
                </button>
              )}
            </div>
          </Box>
        </Paper>
        <ToastContainer position="top-center" />
      </Box>
      <Footer />
    </>
  );
}
