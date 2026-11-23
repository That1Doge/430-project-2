const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    platform: {
        type: String,
        required: true,
        trim: true,
    },

    genre: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['Playing', 'Backlog', 'Completed', 'Paused'],
        default: 'Backlog',
    },

    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: '',
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Game', GameSchema);