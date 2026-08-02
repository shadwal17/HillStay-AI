import React, { useState, useEffect } from 'react';

// SVG Icons
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

export default function Home({ user, setCurrentPage }) {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const today = new Date().toISOString().split('T')[0];
  const [searchDates, setSearchDates] = useState({ checkIn: '', checkOut: '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' }); 

  useEffect(() => {
    fetch('[https://hillstay-ai-1.onrender.com](https://hillstay-ai-1.onrender.com)/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: '' }), 4000);
  };

  const validateDates = () => {
    if (!searchDates.checkIn || !searchDates.checkOut) {
      showToast("Please select your check-in and check-out dates in the top bar.", "error");
      return false;
    }
    const checkInDate = new Date(searchDates.checkIn);
    const checkOutDate = new Date(searchDates.checkOut);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (checkInDate < todayDate) {
      showToast("Check-in date cannot be in the past.", "error");
      return false;
    }
    if (checkOutDate <= checkInDate) {
      showToast("Check-out date must be at least 1 day after check-in.", "error");
      return false;
    }
    return true;
  };

  const handleInitiateBooking = (room) => {
    if (!validateDates()) return;
    
    // AUTH GUARD: Check if user is logged in
    if (!user) {
      showToast("Please sign in or join to secure your booking.", "error");
      setTimeout(() => setCurrentPage('login'), 1500); 
      return;
    }
    
    setSelectedRoom(room);
    setGuestName(user.name); // Auto-fill their name!
    setIsModalOpen(true);
  };

  const submitBooking = async () => {
    if (!guestName.trim()) {
      showToast("Please enter the primary guest's full name.", "error");
      return;
    }

    setIsBooking(true);
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      fetch('[https://hillstay-ai-1.onrender.com/api/bookings](https://hillstay-ai-1.onrender.com/api/bookings)', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <--- THIS FIXES THE BOOKING ISSUE!
        },
        body: JSON.stringify({
          roomId: selectedRoom.id || selectedRoom._id,
          guestName: guestName,
          checkIn: searchDates.checkIn,
          checkOut: searchDates.checkOut
        })
      });
      
      const data = await response.json();

      if (response.ok) {
        showToast(`Success! Your stay at ${selectedRoom.name} is confirmed.`);
        setIsModalOpen(false);
      } else {
        throw new Error(data.error || "Failed to book");
      }
    } catch (err) {
      showToast(err.message || "Error processing booking. Please try again.", "error");
    }
    setIsBooking(false);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMsg.text && (
        <div className={`fixed top-24 right-6 px-6 py-4 shadow-2xl z-50 font-bold text-sm flex items-center gap-3 transition-all border-l-4 ${
          toastMsg.type === 'error' ? 'bg-white text-slate-900 border-red-500' : 'bg-slate-900 text-white border-emerald-500'
        }`}>
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative bg-slate-900 h-[60vh] min-h-[500px] flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 opacity-70 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2070")' }}
        ></div>
        <div className="relative z-10 text-center px-4 -mt-20">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight drop-shadow-lg">Escape to the Extraordinary</h1>
          <p className="text-lg text-white/90 font-medium drop-shadow-md">Discover premium eco-resorts hidden in nature.</p>
        </div>

        {/* FLOATING BOOKING BAR */}
        <div className="absolute -bottom-10 left-0 w-full px-4 md:px-12 flex justify-center z-20">
          <div className="bg-white shadow-2xl flex flex-col lg:flex-row w-full max-w-6xl border border-slate-200">
            <div className="flex-1 p-4 lg:p-6 flex items-center gap-4 hover:bg-slate-50 transition border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="text-slate-400"><MapPinIcon /></div>
              <div className="flex flex-col w-full">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination</span>
                <input type="text" value="All HillStay Properties" readOnly className="w-full text-slate-900 font-semibold outline-none bg-transparent" />
              </div>
            </div>
            <div className="flex-1 p-4 lg:p-6 flex items-center gap-4 hover:bg-slate-50 transition border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="text-slate-400"><CalendarIcon /></div>
              <div className="flex flex-col w-full">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Check-in</span>
                <input type="date" min={today} className="w-full text-slate-900 font-semibold outline-none bg-transparent" value={searchDates.checkIn} onChange={(e) => setSearchDates({...searchDates, checkIn: e.target.value})} />
              </div>
            </div>
            <div className="flex-1 p-4 lg:p-6 flex items-center gap-4 hover:bg-slate-50 transition border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="text-slate-400"><CalendarIcon /></div>
              <div className="flex flex-col w-full">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Check-out</span>
                <input type="date" min={searchDates.checkIn || today} className="w-full text-slate-900 font-semibold outline-none bg-transparent" value={searchDates.checkOut} onChange={(e) => setSearchDates({...searchDates, checkOut: e.target.value})} />
              </div>
            </div>
            <button onClick={() => validateDates() && document.getElementById('rooms-section').scrollIntoView({ behavior: 'smooth' })} className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest px-10 py-6 lg:py-0 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ROOMS LIST */}
      <div id="rooms-section" className="max-w-6xl mx-auto px-4 md:px-12 pt-32 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-slate-900 mb-4 uppercase tracking-widest">Rooms & Suites</h2>
          <div className="w-16 h-0.5 bg-slate-900 mx-auto"></div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div></div>
        ) : (
          <div className="flex flex-col gap-8">
            {rooms.map((room, index) => (
              <div key={room.id || room._id} className="bg-white border border-slate-200 flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
                <div className="md:w-2/5 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${index % 2 === 0 ? '1587061949409-02df41d5e562' : '1523987355523-c7b5b0dd90a7'}?auto=format&fit=crop&q=80&w=800)` }}></div>
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-light text-slate-900">{room.name}</h3>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 uppercase tracking-wider">{room.type}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6 max-w-md">Experience unparalleled comfort in our eco-conscious spaces with stunning panoramic views.</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-2 text-slate-600 text-sm"><UserIcon /> Up to {room.capacity} Guests</div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm"><CheckIcon /> Free Wi-Fi</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100 mt-auto">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Starting from</span>
                      <span className="text-2xl font-semibold text-slate-900">₹{room.price} <span className="text-sm font-normal text-slate-500">/ night</span></span>
                    </div>
                    <button onClick={() => handleInitiateBooking(room)} className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-wider px-8 py-4 transition">Select Room</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <h3 className="text-xl font-light tracking-wide">Complete Reservation</h3>
              <button onClick={() => !isBooking && setIsModalOpen(false)} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-8">
              <div className="bg-slate-50 border border-slate-200 p-4 mb-8">
                <h4 className="font-bold text-slate-900 text-lg mb-2">{selectedRoom.name}</h4>
                <div className="flex justify-between text-sm text-slate-600 mb-1"><span>Check-In:</span><span className="font-semibold text-slate-900">{searchDates.checkIn}</span></div>
                <div className="flex justify-between text-sm text-slate-600 mb-1"><span>Check-Out:</span><span className="font-semibold text-slate-900">{searchDates.checkOut}</span></div>
              </div>
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Guest Name</label>
                <input type="text" className="w-full h-12 border-b-2 border-slate-200 px-2 outline-none focus:border-slate-900 transition bg-transparent text-slate-900 text-lg" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} disabled={isBooking} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider text-slate-600 border border-slate-300 hover:bg-slate-50 transition">Cancel</button>
                <button onClick={submitBooking} disabled={isBooking} className="flex-1 py-4 text-sm font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-70 flex justify-center items-center">
                  {isBooking ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}