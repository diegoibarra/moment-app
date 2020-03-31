const mongoose = require('mongoose');

const momentSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    highlight: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: Image,
        required: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Moment = mongoose.model('Listing', momentSchema);

module.exports = Moment;
