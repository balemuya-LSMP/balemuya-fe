'use client';

export default function Privacy() {
  return (
    <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Privacy Settings</h1>
      <form className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Profile Visibility</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Save Privacy Settings
        </button>
      </form>
    </div>
  );
}
