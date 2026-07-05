import React, { useState } from 'react';

export default function Login({ handleLogin }) {
  const [name, setName] = useState('');
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(name.trim().length > 0) {
      handleLogin(name);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white border border-slate-200 p-10 shadow-2xl w-full max-w-md flex flex-col items-center relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-900"></div>
        
        <div className="w-16 h-16 bg-slate-900 text-white rounded-full mb-6 flex items-center justify-center font-bold text-2xl tracking-widest shadow-md">H</div>
        <h2 className="text-2xl font-light text-slate-900 mb-2 uppercase tracking-widest">Welcome Back</h2>
        <p className="text-sm text-slate-500 mb-8 text-center">Sign in to unlock exclusive rates and manage your bookings.</p>
        
        <form onSubmit={onSubmit} className="w-full">
          <div className="w-full mb-5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 border-b-2 border-slate-200 px-2 outline-none focus:border-slate-900 transition bg-transparent text-slate-900"
            />
          </div>
          <div className="w-full mb-8">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              className="w-full h-12 border-b-2 border-slate-200 px-2 outline-none focus:border-slate-900 transition bg-transparent text-slate-900"
            />
          </div>
          <button 
            type="submit"
            className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest rounded-sm mb-6 transition shadow-md"
          >
            Sign In Securely
          </button>
        </form>
      </div>
    </div>
  );
}