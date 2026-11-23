const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  isPremium: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
