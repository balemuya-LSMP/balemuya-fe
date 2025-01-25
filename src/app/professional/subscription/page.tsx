'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { CheckCircle, CreditCard } from "lucide-react";

export default function ProfessionalCard() {
  type PlanType = "Silver" | "Gold" | "Premium";
  const [activeTab, setActiveTab] = useState<PlanType>("Silver");

  const plans = {
    Silver: {
      duration: "Available for 3 months",
      benefits: "Apply for up to 100 jobs",
      price: "200.00 Birr",
    },
    Gold: {
      duration: "Available for 6 months",
      benefits: "Apply for up to 200 jobs",
      price: "400.00 Birr",
    },
    Premium: {
      duration: "Available for 1 year",
      benefits: "Unlimited job applications",
      price: "700.00 Birr",
    },
  };
  const activePlan = plans[activeTab as PlanType];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Choose Your Plan
        </h1>

        <div className="flex justify-between mb-8">
          {["Silver", "Gold", "Premium"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as PlanType)}
              className={`flex-1 px-6 py-3 text-base font-medium text-center border rounded-md transition-all duration-200 shadow-sm ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-base text-gray-700 mb-2">
            <strong>Duration:</strong> {activePlan.duration}
          </p>
          <p className="text-base text-gray-700">
            <strong>Benefits:</strong> {activePlan.benefits}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-800">Total</span>
          <span className="text-lg font-semibold text-blue-900">{activePlan.price}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-base text-gray-600 mb-3">Pay with</span>
          <button className="flex items-center justify-center w-full px-6 py-3 bg-blue-900 text-white rounded-md shadow-md transition-transform transform hover:scale-105">
            <img
              src="/images/chapa.png"
              alt="Chapa"
              className="h-8 mr-3"
            />
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Chapa
            </span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <CheckCircle className="w-5 h-5 text-green-500" /> Secure Payment
        </div>
      </div>
    </div>
  );
}
