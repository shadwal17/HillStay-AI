import React from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Featured Places</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card 
            title="Mountain View Cabin" 
            description="A nice place to stay in the hills." 
          />
          <Card 
            title="Riverside Tent" 
            description="Camp near the river with great views." 
          />
          <Card 
            title="City Center Apartment" 
            description="Close to all the main tourist attractions." 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;