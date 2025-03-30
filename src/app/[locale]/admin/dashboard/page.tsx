/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FaUserTie, FaTools, FaDollarSign,
  FaUsers, FaCheckCircle, FaExclamationTriangle
} from "react-icons/fa";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import { useGetGeneralStatsQuery } from "@/store/api/user.api";
import Loader from "../../(features)/_components/loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const { data: statsData, isLoading } = useGetGeneralStatsQuery({});

  if (isLoading) return <Loader />



  const monthlyRevenueStats = statsData?.financial_statistics?.monthly_revenue_stats ?? [];
  const month = monthlyRevenueStats.map((stat: { month: string }) => new Date(stat.month).toLocaleString("default", { month: "long" }));
  const revenues = monthlyRevenueStats.map((stat: { total_revenue: number }) => stat.total_revenue);
  const barData = {
    labels: month,
    datasets: [
      {
        label: "Monthly Subscription",
        data: revenues,
        backgroundColor: "#4F46E5",
        borderColor: "#4338CA",
        borderWidth: 1,
      },
    ],
  };


  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Data for the First Five Months",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieData = {
    labels: ["Customers", "Professionals"],
    datasets: [
      {
        data: [statsData?.user_statistics?.total_customers ?? 0, statsData?.user_statistics?.total_professionals ?? 0],
        backgroundColor: ["#34D399", "#4F46E5"],
        borderColor: ["#10B981", "#4338CA"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  const monthlyStats = statsData?.monthly_user_stats ?? [];
  const months = monthlyStats.map((stat: { month: string }) => new Date(stat.month).toLocaleString("default", { month: "long" }));
  const userCounts = monthlyStats.map((stat: { user_count: number }) => stat.user_count);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "User Growth",
        data: userCounts,
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Growth Over Time",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutData = {
    labels: ["Total", "Blocked", "Available", "Verified"],
    datasets: [
      {
        data: [statsData?.user_statistics?.total_professionals ?? 0, statsData?.user_statistics?.blocked_professionals ?? 0, statsData?.user_statistics?.available_professionals ?? 0, statsData?.user_statistics?.available_professionals, statsData?.user_statistics?.verified_professionals ?? 0],
        backgroundColor: ["#4F46E5", "#F87171", "#34D399", "#FDBA74"],
        borderColor: ["#4338CA", "#E11D48", "#10B981", "#FB923C"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  const stats = [
    { value: statsData?.user_statistics?.total_professionals, label: "Total Professionals", icon: <FaUserTie /> },
    { value: statsData?.service_statistics?.active_services ?? 0, label: "Active Services", icon: <FaTools /> },
    { value: statsData?.financial_statistics?.total_revenue ?? 0, label: "Total Revenue", icon: <FaDollarSign /> },
    { value: statsData?.user_statistics?.total_users ?? 0, label: "Total Users", icon: <FaUsers /> },
    { value: statsData?.user_statistics?.available_professionals, label: "Available Professionals", icon: <FaUserTie /> },
    { value: statsData?.service_statistics?.completed_services ?? 0, label: "Tasks Completed", icon: <FaCheckCircle /> },
    { value: statsData?.feedback_statistics?.total_complian ?? 0, label: "Total Complaints", icon: <FaExclamationTriangle /> },
    { value: statsData?.user_statistics?.total_customers ?? 0, label: "Total Customers", icon: <FaUsers /> },
  ];

  return (
    <div className="p-4 sm:p-8">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center border border-gray-200">
            <div className="text-4xl text-indigo-600 mb-3">{stat.icon}</div>
            <h2 className="text-3xl font-bold">{stat.value}</h2>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded shadow h-80">
          <h2 className="text-xl font-semibold mb-4">Monthly Subscription</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-12 rounded shadow h-80">
          <h2 className="text-xl font-semibold mb-4">Customer vs Professional</h2>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded shadow h-80">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <Line data={lineData} options={lineOptions} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white p-12 rounded shadow h-80">
          <h2 className="text-xl font-semibold mb-4">Professional Status</h2>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
