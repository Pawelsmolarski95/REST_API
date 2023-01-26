const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    seats: { type: Number, required: true },
    client: { type: String, required: true },   
    emial: { type: String, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);