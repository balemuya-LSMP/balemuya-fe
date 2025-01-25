/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Subscription",
        data: [30, 40, 50, 60, 70],
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
        data: [200, 100],
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
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "User Growth",
        data: [50, 80, 120, 180, 250],
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
    labels: ["Active", "Blocked", "Available", "Verified"],
    datasets: [
      {
        data: [300, 50, 200, 150],
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
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 sm:p-8">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-3xl font-bold">300</h2>
          <p>Active Professionals</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-3xl font-bold">150</h2>
          <p>Tasks Completed</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-3xl font-bold">$12,000</h2>
          <p>Total Revenue</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-3xl font-bold">500</h2>
          <p>New Users</p>
        </div>
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
          <h2 className="text-xl font-semibold mb-4">User Status</h2>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
