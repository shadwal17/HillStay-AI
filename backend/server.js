const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to talk to this server
app.use(express.json()); // Allows the server to understand JSON data

// ==========================================
// IN-MEMORY DATA (Simulating a Database for Week 4)
// ==========================================
let rooms = [
  { id: '1', name: 'Mountain View Cabin', price: 2500, capacity: 2, type: 'Cabin' },
  { id: '2', name: 'Riverside Eco-Tent', price: 1500, capacity: 2, type: 'Tent' },
  { id: '3', name: 'Forest Retreat House', price: 4000, capacity: 4, type: 'House' }
];

let bookings = [];

// ==========================================
// 6 REST API ENDPOINTS
// ==========================================

// 1. GET /api/rooms/search - Search rooms by name or type
// NOTE: This must go BEFORE the /:id route, otherwise 'search' is treated as an ID!
app.get('/api/rooms/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  
  if (!query) {
    return res.status(400).json({ error: "Please provide a search query using ?q=" });
  }

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(query) || room.type.toLowerCase().includes(query)
  );
  
  res.status(200).json(filteredRooms);
});

// 2. GET /api/rooms - Get all rooms
app.get('/api/rooms', (req, res) => {
  res.status(200).json(rooms);
});

// 3. GET /api/rooms/:id - Get a single room by ID
app.get('/api/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const room = rooms.find(r => r.id === roomId);
  
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  
  res.status(200).json(room);
});

// 4. POST /api/bookings - Create a new booking
app.post('/api/bookings', (req, res) => {
  const { roomId, guestName, checkIn, checkOut } = req.body;

  // Simple validation
  if (!roomId || !guestName || !checkIn || !checkOut) {
    return res.status(400).json({ error: "Please provide roomId, guestName, checkIn, and checkOut" });
  }

  const newBooking = {
    id: Date.now().toString(), // Generate a fake unique ID based on time
    roomId,
    guestName,
    checkIn,
    checkOut,
    status: 'Confirmed'
  };

  bookings.push(newBooking);
  res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});

// 5. PUT /api/bookings/:id - Update an existing booking
app.put('/api/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const { checkIn, checkOut } = req.body;

  const bookingIndex = bookings.findIndex(b => b.id === bookingId);

  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  // Update the booking details
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    checkIn: checkIn || bookings[bookingIndex].checkIn,
    checkOut: checkOut || bookings[bookingIndex].checkOut
  };

  res.status(200).json({ message: "Booking updated", booking: bookings[bookingIndex] });
});

// 6. DELETE /api/bookings/:id - Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const initialLength = bookings.length;
  
  bookings = bookings.filter(b => b.id !== bookingId);

  if (bookings.length === initialLength) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.status(200).json({ message: "Booking cancelled successfully" }); // 200 OK (Could also use 204 No Content)
});

// ==========================================
// START THE SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}\n`);
});