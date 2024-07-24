const mongoose = require('mongoose');

// Define the user data schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

// Create a User model based on the schema
const Notifications = mongoose.model('notifications', userSchema);

module.exports = Notifications;