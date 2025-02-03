'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { CheckCircle, CreditCard } from "lucide-react";
import { useSubscribeServiceMutation } from "@/store/api/userProfile.api";
import { toast } from "react-toastify";

export default function ProfessionalCard() {
  type PlanType = "Silver" | "Gold" | "Diamond";
  const [activeTab, setActiveTab] = useState<PlanType>("Silver");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);

  // Correctly using the mutation hook
  const [subscribeService, { isLoading }] = useSubscribeServiceMutation();

  const handleSubscribe = async () => {
    const totalAmount = activePlan.price * selectedDuration;

    try {
      const response = await subscribeService({
        plan_type: activeTab,
        duration: selectedDuration,
        amount: totalAmount,
        return_url: "http://localhost:3000/professional/check",
      }).unwrap(); 
      
      if (response?.data?.payment_url) {
        window.location.href = response.data.payment_url;
        toast.success("You Subscribed Successfully");
      } else {
        throw new Error("Payment URL not found in response");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Subscription failed. Please try again.");
    }
  };

  const plans = {
    Silver: {
      price: 100,
      planType: "Silver",
      durations: [
        { label: "1 month", value: 1 },
        { label: "3 months", value: 3 },
        { label: "6 months", value: 6 },
        { label: "1 year", value: 12 },
      ],
    },
    Gold: {
      price: 200,
      planType: "Gold",
      durations: [
        { label: "1 month", value: 1 },
        { label: "3 months", value: 3 },
        { label: "6 months", value: 6 },
        { label: "1 year", value: 12 },
      ],
    },
    Diamond: {
      price: 300,
      planType: "Diamond",
      durations: [
        { label: "1 month", value: 1 },
        { label: "3 months", value: 3 },
        { label: "6 months", value: 6 },
        { label: "1 year", value: 12 },
      ],
    },
  };

  const activePlan = plans[activeTab];

  // Calculate the total amount based on the selected duration
  const totalAmount = activePlan.price * selectedDuration;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Choose Your Plan
        </h1>

        <div className="flex justify-between mb-8">
          {["Silver", "Gold", "Diamond"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as PlanType)}
              className={`flex-1 px-6 py-3 text-base font-medium text-center border rounded-md transition-all duration-200 shadow-sm ${activeTab === tab
                ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div>
            <label htmlFor="duration" className="text-base text-gray-700 mb-2 block">
              <strong>Duration:</strong>
            </label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="w-full px-4 py-3 mt-2 border-2 rounded-md bg-white text-gray-700 text-lg font-medium shadow-md focus:outline-none focus:ring-2"
            >
              {activePlan.durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display calculated amount */}
        <div className="mb-6 text-center text-xl font-semibold text-gray-800">
          <span>Total Amount: </span>
          <span className="text-blue-600">{totalAmount} Birr</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-base text-gray-600 mb-3">Pay with</span>
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={`flex items-center justify-center w-full px-6 py-3 ${isLoading ? "bg-gray-500" : "bg-blue-900"
              } text-white rounded-md shadow-md transition-transform transform hover:scale-105`}
          >
            <img src="/images/chapa.png" alt="Chapa" className="h-8 mr-3" />
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> {isLoading ? "Processing..." : "Chapa"}
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
