"use client";
/* eslint-disable @next/next/no-img-element */

export default function Finance() {
  const customers = [
    {
      name: "Alice Johnson",
      subscription: "Silver",
      startDate: "2024-01-15",
      expiryDate: "2024-12-15",
    },
    {
      name: "Bob Smith",
      subscription: "Gold",
      startDate: "2023-05-10",
      expiryDate: "2024-05-10",
    },
    {
      name: "Carol Williams",
      subscription: "Premium",
      startDate: "2024-02-01",
      expiryDate: "2025-02-01",
    },
    {
      name: "David Brown",
      subscription: "Silver",
      startDate: "2023-08-20",
      expiryDate: "2024-08-20",
    },
    {
      name: "Eve Davis",
      subscription: "Gold",
      startDate: "2023-11-15",
      expiryDate: "2024-11-15",
    },
    {
      name: "Frank Miller",
      subscription: "Premium",
      startDate: "2024-03-01",
      expiryDate: "2025-03-01",
    },
    {
      name: "Grace Wilson",
      subscription: "Silver",
      startDate: "2023-12-01",
      expiryDate: "2024-12-01",
    },
    {
      name: "Henry Moore",
      subscription: "Gold",
      startDate: "2023-07-15",
      expiryDate: "2024-07-15",
    },
    {
      name: "Isabella Taylor",
      subscription: "Premium",
      startDate: "2024-04-10",
      expiryDate: "2025-04-10",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col p-6 w-full max-w-4xl bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Finance Dashboard
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to the Finance page! This section displays a list of customers and their subscriptions, along with start and expiry dates.
        </p>

        {/* Customer List Section */}
        <div className="flex flex-col space-y-4">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-slate-50 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-medium text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-600">
                  Subscription: <span className="font-medium">{customer.subscription}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Start Date: <span>{customer.startDate}</span>
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Expiry Date: <span>{customer.expiryDate}</span>
                </p>
                <a
                  href={`/profile/${customer.name.toLowerCase().replace(/ /g, "-")}`}
                  className="text-blue-600 hover:underline self-start"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
