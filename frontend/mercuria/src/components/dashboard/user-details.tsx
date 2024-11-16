// components/dashboard/UserDetails.tsx
const UserDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-2xl text-gray-600">JD</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-600">Plantation Manager</p>
          <p className="text-sm text-gray-500">Member since: January 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">john.doe@example.com</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">+1 (555) 123-4567</p>
          </div>
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-medium">San Francisco, CA</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Active Plantations</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Total Area</p>
              <p className="text-2xl font-bold">250 ha</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Current Contracts</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Revenue YTD</p>
              <p className="text-2xl font-bold">$125K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
