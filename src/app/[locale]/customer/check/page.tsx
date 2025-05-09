"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from '@/i18n/navigation'
import { useVerifyPaymentMutation } from "@/store/api/userProfile.api";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function PaymentVerificationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const transactionId = searchParams.get("transaction_id");

    const [verifyPayment, { data, error, isLoading, isSuccess }] = useVerifyPaymentMutation();

    console.log(data)
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (transactionId && !hasTriggered) {
            verifyPayment(transactionId);
            setHasTriggered(true);
        }
    }, [transactionId, verifyPayment, hasTriggered]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <button
                    onClick={() => router.push('/customer/work')}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                    <FiArrowLeft className="mr-2 text-lg" />
                    <span className="text-lg">Back</span>
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Payment Verification</h1>
                    <p className="text-gray-500 mt-2">We&apos;re verifying your transaction details</p>
                </div>

                <div className="space-y-6">
                    {!transactionId && (
                        <div className="flex items-start p-6 bg-red-50 rounded-xl border border-red-100">
                            <FiAlertCircle className="text-red-500 text-2xl mt-0.5 mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg text-red-800">Transaction Error</h3>
                                <p className="text-red-600">Missing transaction ID. Please ensure you came from a valid payment link.</p>
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative">
                                    <div className="w-24 h-24 border-4 border-blue-100 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <FiLoader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Processing Payment</h3>
                            <p className="text-blue-600 max-w-md text-center">Please wait while we verify your payment details. This may take a moment.</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <FiAlertCircle className="text-red-500 text-4xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-red-800 mb-3">Verification Failed</h3>
                            <p className="text-red-600 max-w-md text-center mb-6">
                                We couldn&lsquo;t verify your payment. Please try again or contact our support team for assistance.
                            </p>
                            <button
                                onClick={() => router.push("/support")}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Contact Support
                            </button>
                        </div>
                    )}

                    {isSuccess && data && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                                <FiCheckCircle className="text-green-500 text-5xl" />
                            </div>
                            <h3 className="text-3xl font-bold text-green-800 mb-4">Payment Verified!</h3>
                            <p className="text-green-600 text-lg mb-8 max-w-lg text-center">Payment verified successfully and professional balance updated</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}