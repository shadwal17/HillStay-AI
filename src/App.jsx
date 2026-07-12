import React, { useState } from 'react';

// ==========================================
// 1. HOME & DASHBOARD PLACEHOLDERS
// ==========================================
const Home = ({ user, setCurrentPage }) => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold mb-4">Home Page</h1>
    <p>This is where your rooms will be displayed.</p>
  </div>
);

const Dashboard = ({ user }) => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold mb-4">Secure Dashboard</h1>
    <p>Welcome to your protected area, {user?.name}!</p>
  </div>
);

// ==========================================
// 2. THE REAL LOGIN / REGISTER FORM WITH OAUTH
// ==========================================
const Login = ({ handleLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // State to show the simulated Google Popup
  const [showGoogleOAuth, setShowGoogleOAuth] = useState(false); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.status === 429) {
        setMessage({ text: "HTTP 429 Rate Limit Exceeded: Too many login attempts. Please try again later.", type: 'error' });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isRegistering) {
        setMessage({ text: "Registration Success! You can now log in.", type: 'success' });
        setIsRegistering(false);
      } else {
        setMessage({ text: "Login Success! JWT Token generated.", type: 'success' });
        localStorage.setItem('token', data.token);
        
        setTimeout(() => {
          handleLogin(data.user?.name || formData.name);
        }, 2000);
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50 relative">
      
      {/* ========================================== */}
      {/* SIMULATED GOOGLE OAUTH POPUP               */}
      {/* ========================================== */}
      {showGoogleOAuth && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <h2 className="text-xl font-medium mt-4 mb-2 text-slate-800">Sign in with Google</h2>
            <p className="text-sm text-slate-600 mb-8 text-center">Choose an account to continue to <br/><b>HillStay App</b></p>
            
            <div 
              className="w-full flex items-center gap-4 p-3 border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer transition mb-4"
              onClick={() => {
                setShowGoogleOAuth(false);
                handleLogin('Shadwal Chauhan'); // Logs you in!
              }}
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">S</div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">Shadwal Chauhan</p>
                <p className="text-xs text-slate-500">shadwalchauhan@gmail.com</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">To continue, Google will share your name and email address.</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 p-10 shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-900"></div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-widest text-center">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-slate-500 mb-6 text-center">
          {isRegistering ? 'Sign up to book eco-homestays securely.' : 'Sign in to access your secure dashboard.'}
        </p>

        {message.text && (
          <div className={`p-4 mb-6 text-sm font-bold border-l-4 ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-500' : 'bg-emerald-50 text-emerald-700 border-emerald-500'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="w-full">
          {isRegistering && (
            <div className="w-full mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full h-12 border border-slate-200 px-4 rounded outline-none focus:border-slate-900" />
            </div>
          )}
          <div className="w-full mb-4">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" required placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full h-12 border border-slate-200 px-4 rounded outline-none focus:border-slate-900" />
          </div>
          <div className="w-full mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full h-12 border border-slate-200 px-4 rounded outline-none focus:border-slate-900" />
          </div>
          <button type="submit" className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest rounded mb-4">
            {isRegistering ? 'Register' : 'Secure Login'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-4">
          {isRegistering ? 'Already have an account? ' : 'Need an account? '}
          <span onClick={() => setIsRegistering(!isRegistering)} className="font-bold text-slate-900 cursor-pointer hover:underline">
            {isRegistering ? 'Sign In' : 'Register Here'}
          </span>
        </p>

        {/* CLICK THIS FOR OAUTH SCREENSHOT */}
        <div className="mt-8 pt-6 border-t border-slate-200">
           <button 
             onClick={() => setShowGoogleOAuth(true)} 
             className="w-full h-12 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded flex items-center justify-center gap-3 transition"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign in with Google
           </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. NAVBAR
// ==========================================
const Navbar = ({ setCurrentPage, user, handleLogout }) => {
  return (
    <nav className="bg-white border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
        <div className="w-32 h-8 bg-slate-100 border border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition" onClick={() => setCurrentPage('home')}>
          <span className="text-slate-600 font-bold text-sm tracking-widest">HILLSTAY</span>
        </div>
        
        <div className="flex items-center gap-8">
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

// ==========================================
// 4. ROUTE GUARD (Week 6 Security)
// ==========================================
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

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null); 

  const handleLogin = (name) => {
    setUser({ name });
    setCurrentPage('home'); 
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear JWT on logout
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home user={user} setCurrentPage={setCurrentPage} />;
      case 'dashboard': 
        return (
          <ProtectedRoute setCurrentPage={setCurrentPage}>
            <Dashboard user={user} />
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