"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [catData, setCatData] = useState(null);
  const [completeCatData, setCompleteCatData] = useState(null);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?has_breeds=1');
        setCatData(response.data[0]);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, []);

  const handleFetchDetails = async () => {
    if (catData && catData.id) {
      try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/${catData.id}`);
        setCompleteCatData(response.data);
      } catch (error) {
        console.error('Error fetching complete details of the cat:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center mb-5">Random Cat</h1>
      {catData && (
        <div className="max-w-md rounded overflow-hidden shadow-lg">
          <img className="w-full" src={catData.url} alt="Random Cat" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">ID: {catData.id}</div>
          </div>
          <div className="px-6 pt-4 pb-2 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFetchDetails}
            >
              Fetch Details
            </button>
          </div>
        </div>
      )}
      {completeCatData && (
        <div className="max-w-md mt-5">
          <div className="font-bold text-xl mb-2">Complete Cat Details</div>
          <ul className="list-disc list-inside">
            {Object.entries(completeCatData.breeds[0]).map(([key, value]) => (
              <li key={key} className="text-gray-700 list-none">
                <span className="font-bold">{key}:</span> {JSON.stringify(value)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Homepage;
