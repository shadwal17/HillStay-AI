import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Loader, Toast } from './components/ui';

// ==========================================
// SHARED COMPONENTS 
// ==========================================

const Navbar = ({ setCurrentPage, isDarkMode, toggleTheme }) => {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 h-16 flex items-center px-8 sticky top-0 z-50 transition-colors">
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="w-32 h-8 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          onClick={() => setCurrentPage('home')}
        >
          <span className="text-slate-600 dark:text-slate-300 font-bold text-sm tracking-widest">HILLSTAY</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => setCurrentPage('dashboard')} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Dashboard</button>
          <button onClick={() => setCurrentPage('showcase')} className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-80">UI Showcase</button>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button 
            onClick={() => setCurrentPage('login')} 
            className="bg-slate-800 dark:bg-slate-100 hover:bg-slate-700 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold px-6 py-2.5 rounded transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

// ==========================================
// PAGE COMPONENTS
// ==========================================

const ComponentShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 p-8 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">UI Component Library</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">This page demonstrates the reusable components built for Week 3 Deliverables.</p>

        <div className="space-y-12">
          {/* BUTTONS */}
          <section>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">1. Buttons</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Button size="sm">Small Size</Button>
              <Button size="md">Medium Size</Button>
              <Button size="lg">Large Size</Button>
            </div>
          </section>

          {/* INPUTS */}
          <section>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">2. Inputs</h2>
            <div className="max-w-md space-y-4">
              <Input 
                label="Standard Input" 
                placeholder="Type something here..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input 
                label="Input with Error" 
                placeholder="Invalid email address" 
                error="Please enter a valid email address."
                value="test@invalid"
                onChange={() => {}}
              />
            </div>
          </section>

          {/* MODAL */}
          <section>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">3. Modal Window</h2>
            <Button onClick={() => setIsModalOpen(true)}>Open Demo Modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Component Demo Modal">
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                This is a reusable modal component. It traps focus, handles its own state, and can be closed by clicking the "X" or pressing the Escape key.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm Action</Button>
              </div>
            </Modal>
          </section>

          {/* TOAST */}
          <section>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">4. Toast Notification</h2>
            <Button variant="secondary" onClick={() => setIsToastVisible(true)}>Show Toast Message</Button>
            <Toast 
              isVisible={isToastVisible} 
              message="Success! Your components are working perfectly." 
              onClose={() => setIsToastVisible(false)} 
            />
          </section>

          {/* LOADER */}
          <section>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">5. Loader / Spinner</h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg flex flex-col items-center justify-center">
              <Loader />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">Loading data...</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// This is the newly updated Home page! It fetches live data from the backend.
const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return response.json();
      })
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 p-8">
        <Loader />
        <p className="text-slate-500 dark:text-slate-400 mt-4">Loading your perfect stay...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 p-8">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800">
          ⚠️ Error: {error}. Is your backend server running?
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Featured Places</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{room.name}</h3>
              <div className="text-slate-600 dark:text-slate-400 text-sm space-y-2 mb-6 mt-4">
                <p><span className="font-semibold text-slate-700 dark:text-slate-300">Type:</span> {room.type}</p>
                <p><span className="font-semibold text-slate-700 dark:text-slate-300">Price:</span> ₹{room.price} / night</p>
                <p><span className="font-semibold text-slate-700 dark:text-slate-300">Capacity:</span> {room.capacity} Guests</p>
              </div>
              <div className="w-full">
                <Button className="w-full">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple placeholders for the rest of the app to keep it clean for testing
const Dashboard = () => <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 min-h-screen"><h2 className="text-2xl font-bold dark:text-white">Dashboard</h2></div>;
const Login = () => <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 min-h-screen"><h2 className="text-2xl font-bold dark:text-white">Login</h2></div>;

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // Changed this to start on 'home' instead of 'showcase'!
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Deliverable 4: Dark/Light Mode with localStorage persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home />;
      case 'dashboard': return <Dashboard />;
      case 'showcase': return <ComponentShowcase />;
      case 'login': return <Login />;
      default: return <Home />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow bg-slate-50 dark:bg-slate-950">
        {renderPage()}
      </main>
    </div>
  );
}