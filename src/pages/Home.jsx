import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Loader from '../components/ui/Loader'; // Pulling in the Loader you made in Week 3!

const Home = () => {
  // 1. Set up state for our backend data
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch the data from the backend when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/rooms')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return response.json();
      })
      .then((data) => {
        setRooms(data); // Save the backend data to our state
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Featured Places</h2>
        
        {/* 3. Show a loader while waiting for the server */}
        {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader />
                <p className="text-slate-500 mt-4 font-medium">Loading your perfect stay...</p>
            </div>
        )}

        {/* 4. Show an error if the server is off */}
        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                ⚠️ Error: {error}. Is your backend server running?
            </div>
        )}

        {/* 5. Display the REAL data from the backend! */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Card 
                key={room.id}
                title={room.name}
                description={`A beautiful ${room.type} for ₹${room.price}/night. Capacity: ${room.capacity} guests.`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;