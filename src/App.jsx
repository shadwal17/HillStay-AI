import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// SVG Icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null); // Tracks the logged-in user

  const handleLogin = (name) => {
    setUser({ name });
    setCurrentPage('home'); // Redirect to home after login
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home user={user} setCurrentPage={setCurrentPage} />;
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'login': return <Login handleLogin={handleLogin} />;
      default: return <Home user={user} setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      {/* PREMIUM NAVBAR */}
      <nav className="bg-white h-20 flex items-center px-6 md:px-12 sticky top-0 z-40 border-b border-slate-200 shadow-sm">
        <div className="w-full flex justify-between items-center">
          
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-2" onClick={() => setCurrentPage('home')}>
            <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold tracking-widest">H</div>
            <span className="text-xl font-light tracking-widest text-slate-900 uppercase">HillStay</span>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button 
                  onClick={() => setCurrentPage('dashboard')} 
                  className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition border-b-2 border-transparent hover:border-slate-900 pb-1"
                >
                  <UserIcon /> Dashboard
                </button>
                <button 
                  onClick={handleLogout} 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentPage('login')} className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition">
                  <UserIcon /> Sign In
                </button>
                <button onClick={() => setCurrentPage('login')} className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition shadow-md">
                  Join Now
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* RENDER THE CURRENT PAGE */}
      <main className="flex-grow">
        {renderPage()}
      </main>
    </div>
  );
}