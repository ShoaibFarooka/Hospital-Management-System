const mongoose = require('mongoose');

// Define the user data schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  heartbeat: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required:true,
  },
});

// Create a User model based on the schema
const UserDetails = mongoose.model('user_details', userSchema);

module.exports = UserDetails;