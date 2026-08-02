import React, { useState, useEffect, useCallback } from 'react';

// ------------------------------------------------------------------
// 1. ERROR BOUNDARY (Catches unexpected crashes in the Dashboard)
// ------------------------------------------------------------------
class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <div className="bg-red-50 p-8 rounded-xl border border-red-200 max-w-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something broke.</h2>
            <p className="text-slate-600 mb-4">We encountered an unexpected error loading your dashboard.</p>
            <p className="text-xs text-red-500 font-mono bg-red-100 p-2 rounded mb-6">{this.state.errorMsg}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-slate-900 text-white px-6 py-3 rounded font-bold uppercase tracking-wide hover:bg-slate-800"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ------------------------------------------------------------------
// 2. MAIN DASHBOARD COMPONENT (Wired to Backend)
// ------------------------------------------------------------------
function DashboardContent({ setCurrentPage, user }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState({ text: '', type: 'success' });

  // Custom Toast helper
  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: 'success' }), 3000);
  };

  // FETCH: Read Bookings (Scoped to logged-in user via JWT)
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('[https://hillstay-ai-1.onrender.com](https://hillstay-ai-1.onrender.com)/api/bookings/my-bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // UPDATE: Modify a booking
  const handleUpdate = async (id) => {
    // 1. Ask for Check-In
    const newCheckIn = prompt("Step 1: Enter new CHECK-IN date (YYYY-MM-DD):");
    if (!newCheckIn) return; // Stop if they click cancel

    // 2. Ask for Check-Out
    const newCheckOut = prompt("Step 2: Enter new CHECK-OUT date (YYYY-MM-DD):");
    if (!newCheckOut) return; // Stop if they click cancel

    // 3. Validate Dates (Check-out must be after Check-in)
    if (new Date(newCheckOut) <= new Date(newCheckIn)) {
      showToast("Error: Check-out date must be after check-in date.", "error");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`[https://hillstay-ai-1.onrender.com](https://hillstay-ai-1.onrender.com)/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        // Send BOTH new dates to the backend
        body: JSON.stringify({ checkIn: newCheckIn, checkOut: newCheckOut, status: 'Updated' })
      });

      if (!response.ok) throw new Error('Failed to update booking');
      
      showToast('Booking dates successfully updated!');
      fetchBookings(); // Refresh the list to show new dates
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  // DELETE: Cancel a booking
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.");
    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`[https://hillstay-ai-1.onrender.com](https://hillstay-ai-1.onrender.com)/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to cancel booking');
      
      showToast('Booking cancelled successfully.', 'success');
      setBookings(bookings.filter(b => b._id !== id)); // Optimistic UI update
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] flex relative">
      
      {/* Toast Notification */}
      {toastMsg.text && (
        <div className={`fixed top-24 right-6 px-6 py-4 rounded shadow-2xl z-50 font-bold text-sm flex items-center gap-3 transition-all ${
          toastMsg.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-900 text-white'
        }`}>
          <span className={`w-2 h-2 rounded-full ${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-emerald-400'}`}></span>
          {toastMsg.text}
        </div>
      )}

      {/* Sidebar (Hidden on mobile for responsiveness) */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col">
        <button className="w-full text-slate-500 hover:bg-slate-100 font-medium py-2 px-4 rounded mb-2 text-left transition">Overview</button>
        <button className="w-full bg-slate-100 font-bold text-slate-900 py-2 px-4 rounded mb-2 text-left transition">My Bookings</button>
        <button className="w-full text-slate-500 hover:bg-slate-100 font-medium py-2 px-4 rounded mb-2 text-left transition">Favorites</button>
        <button className="w-full text-slate-500 hover:bg-slate-100 font-medium py-2 px-4 rounded mt-auto text-left transition">Settings</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-200 pb-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-wide">My Bookings</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">{user?.name || 'Guest'}</span>
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
              {user?.name ? user.name.charAt(0) : 'G'}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading your trips...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Empty State */}
            {bookings.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No active bookings</h3>
                <p className="text-slate-500 mb-6 max-w-md">You haven't booked any eco-homestays yet. Discover beautiful destinations and plan your next escape today.</p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="bg-slate-900 text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition shadow-md"
                >
                  Explore Rooms
                </button>
              </div>
            ) : (
              /* Populated Data State */
              bookings.map(booking => (
                <div key={booking._id} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:shadow-md transition">
                  
                  {/* Booking Info */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-slate-900">Premium Room</h3>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                        Confirmed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <p className="text-sm text-slate-600">Guest: <span className="font-semibold text-slate-900">{booking.guestName}</span></p>
                      <p className="text-sm text-slate-600">Check-in: <span className="font-semibold text-slate-900">{new Date(booking.checkIn).toLocaleDateString()}</span></p>
                      <p className="text-sm text-slate-600">Check-out: <span className="font-semibold text-slate-900">{new Date(booking.checkOut).toLocaleDateString()}</span></p>
                    </div>
                  </div>

                  {/* CRUD Action Buttons */}
                  <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0">
                    <button 
                      onClick={() => handleUpdate(booking._id)} 
                      className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition"
                    >
                      Edit Dates
                    </button>
                    <button 
                      onClick={() => handleDelete(booking._id)} 
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition"
                    >
                      Cancel Stay
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Export wrapped component
export default function Dashboard(props) {
  return (
    <DashboardErrorBoundary>
      <DashboardContent {...props} />
    </DashboardErrorBoundary>
  );
}