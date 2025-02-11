/* eslint-disable react/no-unescaped-entities */
'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ListOrdered, CheckCircle, CreditCard, ShieldCheck, Star, UserCheck, TrendingUp, Briefcase, User, Mail } from "lucide-react";
import { useSubscribeServiceMutation } from "@/store/api/userProfile.api";
import { toast } from "react-toastify";
import Header from "../_components/header";
import Footer from "@/app/(features)/_components/footer";

export default function ProfessionalCard() {
  type PlanType = "Silver" | "Gold" | "Diamond";
  const [activeTab, setActiveTab] = useState<PlanType>("Silver");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);

  // Mutation hook
  const [subscribeService, { isLoading }] = useSubscribeServiceMutation();

  const handleSubscribe = async () => {
    const totalAmount = activePlan.price * selectedDuration;

    try {
      const response = await subscribeService({
        plan_type: activeTab.toLowerCase(),
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
    Silver: { price: 100, planType: "Silver", durations: [{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "6 months", value: 6 }, { label: "1 year", value: 12 }] },
    Gold: { price: 200, planType: "Gold", durations: [{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "6 months", value: 6 }, { label: "1 year", value: 12 }] },
    Diamond: { price: 300, planType: "Diamond", durations: [{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "6 months", value: 6 }, { label: "1 year", value: 12 }] },
  };

  const activePlan = plans[activeTab];
  const totalAmount = activePlan.price * selectedDuration;

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full max-w-6xl">
          {/* Left Card */}
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-800 text-center">Why Choose Us?</h3>
            {[{ icon: ShieldCheck, title: "Secure Payments", desc: "All transactions are encrypted and safe.", color: "text-blue-600" },
            { icon: Star, title: "Premium Content", desc: "Access exclusive professional resources.", color: "text-yellow-500" },
            { icon: UserCheck, title: "Career Growth", desc: "Boost your career with expert guidance.", color: "text-green-600" },
            { icon: TrendingUp, title: "Skill Improvement", desc: "Stay ahead with the latest industry trends.", color: "text-purple-600" },
            { icon: Briefcase, title: "Professional Networking", desc: "Connect with industry experts and peers.", color: "text-red-600" }
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-start gap-4">
                <Icon className={`${color} w-7 h-7`} />
                <div>
                  <h4 className="font-medium text-gray-700">{title}</h4>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subscription Card */}
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Choose Your Plan</h1>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {["Silver", "Gold", "Diamond"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as PlanType)}
                  className={`py-2 rounded-md font-medium transition-all text-center ${activeTab === tab ? "bg-purple-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <label className="block text-gray-700 font-medium mb-2">Duration:</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 shadow-sm"
            >
              {activePlan.durations.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <div className="text-center text-lg font-semibold text-gray-800 mt-4">
              <span>Total Amount: </span>
              <span className="text-purple-700">{totalAmount} Birr</span>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="mt-6 w-full py-2 bg-purple-700 text-white rounded-md font-medium shadow-md hover:bg-purple-800 disabled:bg-gray-500"
            >
              {isLoading ? "Processing..." : "Subscribe Now"}
            </button>
            <div className="mt-4 text-center text-gray-600 text-sm">
              <CheckCircle className="inline-block w-5 h-5 text-green-500 mr-2" />
              Secure Payment
            </div>
          </div>

          {/* Steps Card */}
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Subscription Steps</h3>
            <div className="mt-4 space-y-4">
              {[{ icon: ListOrdered, title: "Select a plan and duration", desc: "Choose the subscription plan that best suits your needs.", color: "text-blue-600" },
              { icon: User, title: "Create an account", desc: "Sign up or log in to proceed.", color: "text-indigo-600" },
              { icon: CreditCard, title: "Make payment securely", desc: "Complete your payment through our secure gateway.", color: "text-green-600" },
              { icon: Mail, title: "Get confirmation", desc: "Receive confirmation email with plan details.", color: "text-yellow-600" }
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className={`${color} w-6 h-6`} />
                  <div>
                    <p className="text-gray-700 font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
