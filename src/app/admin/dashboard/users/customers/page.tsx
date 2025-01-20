import { useListCustomersQuery } from "@/store/api/user.api";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function Users() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: customers, isLoading, error}  = useListCustomersQuery("active" );

  console.log(`The list of customers are: ${customers}`);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            Customers
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="p-4 flex flex-col sm:flex-row justify-center items-center gap-4 border-b">
          <div className="flex items-center w-full sm:w-auto border-2 border-gray-300 rounded-2xl px-3 py-2">
            <input
              type="text"
              placeholder="Search users"
              className="ml-2 w-full sm:w-auto focus:outline-none text-gray-800"
            />
            <FaSearch className="text-gray-700" />
          </div>

          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-800 font-medium">
            <FaFilter className="text-2xl"/>  
          </button> 
        </div>

        {/* Table Section */}
        <div className="overflow-hidden">
          <div className="overflow-y-auto max-h-[400px]">
            {" "}
            {/* Set max height for the table body */}
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-medium">
                    Profile
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(50)].map(
                  (_, index /* Increased rows for demonstration */) => (
                    <tr
                      key={index}
                      className={`border-t text-gray-600 ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-6 py-3">Jane Cooper</td>
                      <td className="px-6 py-3">{34 + index}</td>
                      <td className="px-6 py-3">male</td>
                      <td className="px-6 py-3">(225) 555-0118</td>
                      <td className="px-6 py-3">
                        {index % 2 === 0 ? "AA" : "BD"}
                      </td>
                      <td className="px-6 py-3">
                        <button className="px-3 py-1 bg-blue-100 text-blue-500 font-medium rounded-md hover:bg-blue-200">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
