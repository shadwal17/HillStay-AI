import React, { useState } from 'react';

export default function Login({ handleLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

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

      // Catch Rate Limit Error (429)
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
        localStorage.setItem('token', data.token); // Save JWT!
        
        // Wait a second so you can take a screenshot, then redirect
        setTimeout(() => {
          handleLogin(data.user.name);
        }, 2000);
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
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

        {/* Dummy OAuth Button for UI requirement */}
        <div className="mt-8 pt-6 border-t border-slate-200">
           <button className="w-full h-12 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign in with Google
           </button>
        </div>
      </div>
    </div>
  );
}