'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-center text-xl font-semibold mb-6">{activeTab}</h1>

        <div className="flex justify-between mb-8">
          {["Silver", "Gold", "Premium"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as PlanType)}
              className={`flex-1 px-6 py-3 text-base font-medium text-center border rounded-md ${
                activeTab === tab
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-base">
            <strong>Duration:</strong> {activePlan.duration}
          </p>
          <p className="text-base">
            <strong>Benefits:</strong> {activePlan.benefits}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">{activePlan.price}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-base mb-3">Pay with</span>
          <button className="flex items-center justify-center w-full px-6 py-3 bg-blue-900 text-white rounded-md">
            <img
              src="/images/chapa.png"
              alt="Chapa"
              className="h-8 mr-3 bg-transparent"
            />
            Chapa
          </button>
        </div>
      </div>
    </div>
  );
}
