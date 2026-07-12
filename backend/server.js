const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// ==========================================
// MONGODB CONNECTION
// ==========================================
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 1. IMPORT MODELS
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const User = require('./models/User'); // Week 6 User Model

// ==========================================
// SECURITY & MIDDLEWARE (Week 6)
// ==========================================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Rate Limiting: Max 5 login attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: { error: "Too many login attempts, please try again after 15 minutes" }
});

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// ==========================================
// AUTHENTICATION ENDPOINTS (Week 6)
// ==========================================

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({ message: "Logged in successfully", token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// ==========================================
// REST API ENDPOINTS
// ==========================================

app.get('/api/rooms/search', async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase();
    if (!query) return res.status(400).json({ error: "Please provide a search query" });
    
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

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
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

app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or Server error" });
  }
});

// PROTECTED ROUTE: Requires verifyToken
app.post('/api/bookings', verifyToken, async (req, res) => {
  try {
    const { roomId, guestName, checkIn, checkOut } = req.body;
    if (!roomId || !guestName || !checkIn || !checkOut) {
      return res.status(400).json({ error: "Please provide all booking details" });
    }
    
    const newBooking = new Booking({ roomId, guestName, checkIn, checkOut });
    const savedBooking = await newBooking.save(); 
    
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error while booking" });
  }
});

app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { checkIn, checkOut },
      { new: true } 
    );
    
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking updated", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error while updating" });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: "Booking not found" });
    
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}\n`);
});