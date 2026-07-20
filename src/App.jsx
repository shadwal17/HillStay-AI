import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';

const Navbar = ({ setCurrentPage, user, handleLogout }) => {
  return (
    <nav className="bg-white border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
        <div className="w-32 h-8 bg-slate-100 border border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition" onClick={() => setCurrentPage('home')}>
          <span className="text-slate-600 font-bold text-sm tracking-widest">HILLSTAY</span>
        </div>
        
        <div className="flex items-center gap-6">
          {/* AI Assistant Button */}
          <button onClick={() => setCurrentPage('ai')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            ✨ Ask AI
          </button>
          
          <button onClick={() => setCurrentPage('dashboard')} className="text-sm font-semibold text-slate-600 hover:text-slate-900">Dashboard</button>
          
          {!user ? (
            <button onClick={() => setCurrentPage('login')} className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-2.5 rounded transition">
              Login
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-emerald-600">Hi, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold px-4 py-2 rounded">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children, setCurrentPage }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <div className="bg-red-50 border border-red-200 p-8 rounded-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">401 Unauthorized</h2>
          <p className="text-slate-600 mb-6">You must be securely logged in with a valid JWT token to access this protected route.</p>
          <button onClick={() => setCurrentPage('login')} className="bg-slate-900 text-white px-6 py-3 rounded font-bold uppercase tracking-wide">
            Go To Login
          </button>
        </div>
      </div>
    );
  }
  return children;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null); 

  const handleLogin = (name) => {
    setUser({ name });
    setCurrentPage('home'); 
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token'); 
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home user={user} setCurrentPage={setCurrentPage} />;
      case 'ai': 
        return (
          <ProtectedRoute setCurrentPage={setCurrentPage}>
            <AIAssistant user={user} />
          </ProtectedRoute>
        );
      case 'dashboard': 
        return (
          <ProtectedRoute setCurrentPage={setCurrentPage}>
            <Dashboard setCurrentPage={setCurrentPage} user={user} />
          </ProtectedRoute>
        );
      case 'login': return <Login handleLogin={handleLogin} />;
      default: return <Home user={user} setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Navbar setCurrentPage={setCurrentPage} user={user} handleLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
    </div>
  );
}