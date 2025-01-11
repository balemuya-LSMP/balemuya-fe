/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export default function Dashboard() {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [30, 40, 50, 60, 70], // Mock sales data
        backgroundColor: "#4F46E5", // Bar color
        borderColor: "#4338CA",
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
        data: [200, 100], // Mock data (200 customers, 100 professionals)
        backgroundColor: ["#34D399", "#4F46E5"], // Green for Customers, Blue for Professionals
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
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">300</h2>
          <p>Active Professionals</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">150</h2>
          <p>Tasks Completed</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">$12,000</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-500 text-white p-6 rounded shadow h-64">
          <h2 className="text-lg font-semibold mb-4">Graph</h2>
          <div className="h-full flex items-end justify-evenly">
            {/* Rendering the bar graph */}
            <Bar data={data} options={options} />
          </div>
        </div>
        {/* Pie chart for customer and professional statistics */}
        <div className="flex bg-blue-500 text-white p-6 rounded shadow h-64">
  {/* Description Section */}
  <div className="flex flex-col justify-center w-1/3 pr-4">
    <h2 className="text-lg font-semibold mb-4">Customer vs Professional</h2>
    <p className="text-sm">This chart shows the distribution between customers and professionals.</p>
  </div>

  {/* Pie Chart Section */}
  <div className="flex justify-center items-center w-2/3">
    <div style={{ position: "relative", width: "80%", height: "80%" }}>
      <Pie data={pieData} options={pieOptions} />
    </div>
  </div>
</div>

      </div>
    </>
  );
}
