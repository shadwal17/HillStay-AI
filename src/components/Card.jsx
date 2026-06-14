import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
      <div className="bg-gray-200 h-32 w-full mb-4 rounded flex items-center justify-center">
        <span className="text-gray-500">[Image Placeholder]</span>
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className="text-blue-600 font-semibold text-sm">View Details</button>
    </div>
  );
};

export default Card;