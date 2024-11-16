'use client'

import { useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      // Check if response is successful
      if (!res.ok) {
        throw new Error('Failed to fetch the response from the server');
      }

      const data = await res.json();

      // Check if the expected response exists
      if (data && data.response) {
        setResponse(data.response);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Tree Recommendations</h1>
        
        <form onSubmit={handleLocationSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Recommendations'}
          </button>
        </form>
        
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        
        {response && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md">
            <h2 className="text-lg font-semibold text-center mb-2">Top Trees to Plant:</h2>
            <p className="text-center">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
