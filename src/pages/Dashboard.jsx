import React, { useState } from 'react';

export default function Dashboard({ setCurrentPage }) {
  // Simulating a booking fetched from the database for your screenshots
  const [bookings, setBookings] = useState([
    { 
      _id: 'bk_109283', 
      roomName: 'Mountain View Cabin', 
      guestName: 'Shadwal Chauhan', 
      checkIn: '2026-07-10', 
      checkOut: '2026-07-15',
      price: 2500,
      status: 'Confirmed'
    }
  ]);

  const [toastMsg, setToastMsg] = useState('');

  // UPDATE OPERATION
  const handleUpdate = (id) => {
    // In a real app, this opens a modal and calls PUT /api/bookings/:id
    const updated = bookings.map(booking => {
      if (booking._id === id) {
        return { ...booking, checkOut: '2026-07-20', status: 'Updated' };
      }
      return booking;
    });
    setBookings(updated);
    setToastMsg('Booking successfully updated to new dates!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  // DELETE OPERATION
  const handleDelete = (id) => {
    // In a real app, this calls DELETE /api/bookings/:id
    const filtered = bookings.filter(booking => booking._id !== id);
    setBookings(filtered);
    setToastMsg('Booking cancelled successfully.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] flex relative">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 right-6 bg-slate-900 text-white px-6 py-4 rounded shadow-2xl z-50 font-bold text-sm flex items-center gap-3">
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          {toastMsg}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col">
        <button className="w-full text-slate-500 hover:bg-slate-100 font-medium py-2 px-4 rounded mb-2 text-left transition">Overview</button>
        <button className="w-full bg-slate-100 font-bold text-slate-900 py-2 px-4 rounded mb-2 text-left transition">My Bookings</button>
        <button className="w-full text-slate-500 hover:bg-slate-100 font-medium py-2 px-4 rounded mb-2 text-left transition">Favorites</button>
        <button className="w-full text-slate-500 hover:bg-slate-100 font-medium py-2 px-4 rounded mt-auto text-left transition">Settings</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-light text-slate-900 tracking-wide">My Bookings</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Shadwal Chauhan</span>
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">SC</div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex flex-col gap-6">
          {bookings.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded p-12 text-center shadow-sm">
              <p className="text-slate-500 mb-4">You have no active bookings.</p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="bg-slate-900 text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition"
              >
                Find a Room
              </button>
            </div>
          ) : (
            bookings.map(booking => (
              <div key={booking._id} className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition">
                
                {/* Booking Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-xl text-slate-900">{booking.roomName}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">Guest: <span className="font-semibold text-slate-900">{booking.guestName}</span></p>
                  <p className="text-sm text-slate-600">Dates: <span className="font-semibold text-slate-900">{booking.checkIn}</span> to <span className="font-semibold text-slate-900">{booking.checkOut}</span></p>
                </div>

                {/* CRUD Action Buttons */}
                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => handleUpdate(booking._id)} 
                    className="flex-1 md:flex-none border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition"
                  >
                    Extend Dates
                  </button>
                  <button 
                    onClick={() => handleDelete(booking._id)} 
                    className="flex-1 md:flex-none bg-red-50 text-red-600 hover:bg-red-100 px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition"
                  >
                    Cancel Booking
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}