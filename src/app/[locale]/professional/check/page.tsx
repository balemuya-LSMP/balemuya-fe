/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCheckSubscriptionQuery } from "@/store/api/userProfile.api";
import { useSearchParams } from "next/navigation";
import { Loader, AlertCircle } from "lucide-react";
import { FaUser, FaArrowLeft, FaEnvelope, FaHome, FaIdBadge, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaCreditCard, FaDownload } from "react-icons/fa";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useState } from "react";
import Link from "next/link";

// PDF Styles
const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Helvetica" },
    section: { marginBottom: 10 },
    title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    row: { flexDirection: "row", marginBottom: 5 },
    label: { width: "40%", fontSize: 12, fontWeight: "bold" },
    value: { width: "60%", fontSize: 12 },
});

// PDF Component
interface Detail {
    label: string;
    value: string;
}

const TransactionPDF = ({ details }: { details: Detail[] }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Transaction Details</Text>
            {details.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.label}>{item.label}:</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

export default function TransactionDetails() {
    const [isPrintMode, setIsPrintMode] = useState(false);
    const searchParams = useSearchParams();
    const transactionId = searchParams.get("transaction_id");
    const { data, error, isLoading } = useCheckSubscriptionQuery(transactionId || "");

    // If loading or error, return early
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Loader className="animate-spin text-gray-700" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <span className="text-red-600">Error fetching transaction details</span>
            </div>
        );
    }

    const { payment } = data.data;
    const { first_name, last_name, email, amount, currency } = data;

    const details = [
        { icon: <FaUser />, label: "Name", value: `${first_name} ${last_name}` },
        { icon: <FaEnvelope />, label: "Email", value: email },
        { icon: <FaIdBadge />, label: "Transaction ID", value: payment.transaction_id },
        { icon: <FaCreditCard />, label: "Payment Method", value: payment.payment_method },
        { icon: <FaCalendarAlt />, label: "Plan", value: payment.subscription_plan.plan_type },
        { icon: <FaCalendarAlt />, label: "Duration", value: `${payment.subscription_plan.duration} Month(s)` },
        { icon: <FaCalendarAlt />, label: "Start Date", value: new Date(payment.subscription_plan.start_date).toLocaleDateString() },
        { icon: <FaCalendarAlt />, label: "End Date", value: new Date(payment.subscription_plan.end_date).toLocaleDateString() },
        { icon: <FaMoneyBillWave />, label: "Amount Paid", value: `${amount} ${currency}` },
        { icon: <FaCalendarAlt />, label: "Payment Date", value: new Date(payment.payment_date).toLocaleDateString() }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="flex items-center justify-end w-full print:hidden">
                <Link
                    href="/professional"
                    className="p-3 rounded-md bg-blue-100 text-gray-700 print:hidden shadow-sm transition-all duration-300 hover:bg-gray-200"
                >
                    <FaArrowLeft className="w-6 h-4" />
                </Link>

            </div>

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-300">
                <div
                    className="absolute inset-0 flex items-center mt-52 justify-center pointer-events-none h-full"
                >
                    <img src="/images/logo.jpg" alt="Watermark"
                        className="w-3/4 opacity-10"
                    />
                </div>
                {/* Payment Status Icon */}
                <div className="flex justify-center -mt-12">
                    {payment.payment_status === "completed" ? (
                        <FaCheckCircle className="text-green-600 text-5xl bg-white p-2 rounded-full shadow-lg" />
                    ) : (
                        <FaTimesCircle className="text-red-600 text-5xl bg-white p-2 rounded-full shadow-lg" />
                    )}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mt-6 text-center">Transaction Details</h2>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full">
                    {details.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 w-full 
                                       transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-blue-400"
                        >
                            <div className="text-blue-600 text-2xl transition-all duration-300 hover:text-blue-800">
                                {item.icon}
                            </div>
                            <div className="text-left w-full overflow-hidden">
                                <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                                <p className="font-semibold text-gray-800 break-all">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PDF/Print Mode Selector */}
                <div className="flex justify-end mt-6">
                    <PDFDownloadLink
                        document={<TransactionPDF details={details} />}
                        fileName="Transaction-details.pdf"
                    >

                        <button
                            className="flex items-center gap-2  text-gray-700 font-semibold px-4 py-2 rounded-md shadow-md 
                           transition-all duration-300  hover:shadow-lg print:hidden"
                        >
                            <FaDownload /> Download PDF
                        </button>
                    </PDFDownloadLink>
                    <button
                        className="flex items-center gap-2  text-gray-700 font-semibold px-4 py-2 rounded-md shadow-md 
                                   transition-all duration-300 hover:shadow-lg ml-4 print:hidden"
                        onClick={() => window.print()}
                    >
                        <FaDownload /> Print
                    </button>
                </div>
            </div>
        </div>
    );
}
