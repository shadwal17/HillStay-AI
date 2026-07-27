const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // NEW: Links the booking to the logged-in user!
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  guestName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, default: 'Confirmed' }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Booking', bookingSchema);