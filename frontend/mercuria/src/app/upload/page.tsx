'use client'

// pages/upload.tsx
import { useState } from 'react';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [city, setCity] = useState<string>('');

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle city input
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !city) {
      alert('Please upload a document and enter a city.');
      return;
    }

    // You can handle form submission here (e.g., send data to an API)
    alert(`Document: ${file.name}, City: ${city}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-6">
        <h2 className="text-2xl font-semibold text-center">Upload Document and Enter City</h2>

        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-800 border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* City Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Enter City</label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="mt-2 block w-full text-sm text-gray-800 border border-gray-300 rounded-md p-2"
            placeholder="Enter city name"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
