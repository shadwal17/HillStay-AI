import React from 'react';

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-white border-b p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          HillStay AI
        </h1>
        <div className="flex gap-4">
          <button onClick={() => setCurrentPage('home')} className="hover:text-blue-500">Home</button>
          <button onClick={() => setCurrentPage('dashboard')} className="hover:text-blue-500">Dashboard</button>
          <button onClick={() => setCurrentPage('about')} className="hover:text-blue-500">About</button>
          <button onClick={() => setCurrentPage('login')} className="bg-blue-100 px-3 py-1 rounded">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;