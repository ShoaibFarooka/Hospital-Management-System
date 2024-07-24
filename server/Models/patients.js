const mongoose = require('mongoose');

// Define the user data schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required:true,
    },
    profileurl: {
        type: String,
        required: true,
    }
});

// Create a User model based on the schema
const User = mongoose.model('patients', userSchema);

module.exports = User;