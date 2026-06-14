import React from 'react';

const Login = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-4">Login Page</h2>
      <p className="text-gray-600 mb-4">
        This is a placeholder for the login form.
      </p>
      <div className="border p-4 w-64 max-w-full rounded">
        <input type="text" placeholder="Username" className="border w-full mb-2 p-1" />
        <input type="password" placeholder="Password" className="border w-full mb-2 p-1" />
        <button className="bg-blue-600 text-white w-full py-1 rounded">Submit</button>
      </div>
    </div>
  );
};

export default Login;