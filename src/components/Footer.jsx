import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-bold mb-2">HillStay AI</h4>
          <p className="text-sm text-gray-400">Smart tourism booking platform.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Links</h4>
          <ul className="text-sm text-gray-400">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Socials</h4>
          <p className="text-sm text-gray-400">[Social Icons Here]</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;