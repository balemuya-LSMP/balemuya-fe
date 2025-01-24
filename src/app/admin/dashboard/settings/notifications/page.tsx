'use client';

export default function Notifications() {
  return (
    <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>
      <form className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            className="mr-3"
          />
          <label htmlFor="emailNotifications" className="text-gray-700">
            Email Notifications
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            className="mr-3"
          />
          <label htmlFor="smsNotifications" className="text-gray-700">
            SMS Notifications
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}
