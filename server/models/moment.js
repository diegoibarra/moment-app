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
    color: {
        type: String,
        required:true
    },
    image: { data: Buffer, contentType: String },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;
