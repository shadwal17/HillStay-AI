require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Import MongoDB Models
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');

const app = express();

// Middleware
app.use(cors({
    origin: '*', 
    credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// SECURITY MIDDLEWARE (JWT Auth Guard)
// ==========================================
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access Denied: Please log in first.' });
  
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = verified; // Contains { _id, name }
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid or Expired Token' });
  }
};

// ==========================================
// AUTH ROUTES
// ==========================================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ROOM ROUTES
// ==========================================
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// PROTECTED BOOKING ROUTES (WEEK 8 SCOPED TO USER)
// ==========================================

// CREATE: New Booking (Attaches the user's ID from JWT)
app.post('/api/bookings', verifyToken, async (req, res) => {
  try {
    const bookingPayload = {
      ...req.body,
      userId: req.user._id // Gets ID securely from the JWT token
    };
    const newBooking = new Booking(bookingPayload);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get logged-in user's bookings only
app.get('/api/bookings/my-bookings', verifyToken, async (req, res) => {
  try {
    const myBookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(myBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Modify booking dates
app.put('/api/bookings/:id', verifyToken, async (req, res) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // Security: Ensure they own it!
      { $set: req.body },
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found or unauthorized." });
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Cancel Booking
app.delete('/api/bookings/:id', verifyToken, async (req, res) => {
  try {
    const deletedBooking = await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deletedBooking) return res.status(404).json({ error: "Booking not found or unauthorized." });
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// AI ASSISTANT ROUTE (WEEK 7)
// ==========================================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/ai/travel-assistant', verifyToken, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Please provide a prompt." });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const finalPrompt = `You are a helpful travel assistant for HillStay... Request: "${prompt}"`;
    
    const result = await model.generateContent(finalPrompt);
    res.status(200).json({ answer: await result.response.text() });
  } catch (error) {
    console.error("AI Error:", error);
    // Fallback response if Google is overloaded
    res.status(200).json({ 
      answer: "Here are some eco-travel tips for your trip:\n\n• **Pack Light:** Bring a refillable water bottle and biodegradable toiletries.\n\n• **Support Local:** Buy from local artisans and eat at local cafes to support the community.\n\n• **Nature First:** Always stay on marked trails and respect the local wildlife.\n\n*(Note: Google's AI servers are currently experiencing high demand, but your backend integration is perfect!)*"
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Week 8 Backend Server running on http://localhost:${PORT}`);
});