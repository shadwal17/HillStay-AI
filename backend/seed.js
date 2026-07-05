const mongoose = require('mongoose');
require('dotenv').config();
const Room = require('./models/Room');

// Connect to the DB and seed data
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to Atlas for seeding...');
    
    // Clear old data first
    await Room.deleteMany({}); 
    
    // Add sample rooms
    await Room.insertMany([
      { name: "Mountain View Cabin", type: "Cabin", price: 2500, capacity: 4 },
      { name: "Riverside Eco-Tent", type: "Tent", price: 1500, capacity: 2 },
      { name: "Forest Retreat House", type: "House", price: 4000, capacity: 6 }
    ]);
    
    console.log('✅ 3 Rooms successfully added to MongoDB Atlas!');
    process.exit(); 
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });