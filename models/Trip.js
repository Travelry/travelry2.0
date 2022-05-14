const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    markers: {
        type: Array
    },
    tripImage: {
        type: String
    }
});

module.exports = mongoose.model('Trip', TripSchema);