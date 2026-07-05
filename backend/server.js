const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to talk to this server
app.use(express.json()); // Allows the server to understand JSON data

// ==========================================
// MONGODB CONNECTION (Week 5)
// ==========================================
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 1. IMPORT YOUR NEW MODELS
const Room = require('./models/Room');
const Booking = require('./models/Booking');

// ==========================================
// 6 REST API ENDPOINTS (Updated for MongoDB)
// ==========================================

// 1. GET /api/rooms/search - Search rooms by name or type
app.get('/api/rooms/search', async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase();
    if (!query) return res.status(400).json({ error: "Please provide a search query" });
    
    // $regex allows for partial text searching in MongoDB
    const filteredRooms = await Room.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(filteredRooms);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 2. GET /api/rooms - Get all rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    // We map _id to id so your React frontend doesn't break!
    const formattedRooms = rooms.map(room => ({
      id: room._id,
      name: room.name,
      price: room.price,
      capacity: room.capacity,
      type: room.type
    }));
    res.status(200).json(formattedRooms);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 3. GET /api/rooms/:id - Get a single room by ID
app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or Server error" });
  }
});

// 4. POST /api/bookings - Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { roomId, guestName, checkIn, checkOut } = req.body;
    if (!roomId || !guestName || !checkIn || !checkOut) {
      return res.status(400).json({ error: "Please provide all booking details" });
    }
    
    const newBooking = new Booking({ roomId, guestName, checkIn, checkOut });
    const savedBooking = await newBooking.save(); // Saves to MongoDB Atlas!
    
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error while booking" });
  }
});

// 5. PUT /api/bookings/:id - Update an existing booking
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;
    // findByIdAndUpdate finds the document and updates it in one step
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { checkIn, checkOut },
      { new: true } // This tells Mongoose to return the newly updated version
    );
    
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking updated", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error while updating" });
  }
});

// 6. DELETE /api/bookings/:id - Cancel a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: "Booking not found" });
    
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting" });
  }
});

// ==========================================
// START THE SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}\n`);
});