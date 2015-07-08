// Required packages for booking model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Booking schema
var BookingSchema = new Schema({
    date        : { type: String, required: true},
    start       : { type: String, required: true},
    end         : { type: String, required: true},
    iPad        : { type: Number, required: true},
    mic         : { type: Number, required: true},
    people      : { type: Number, required: true},
    
    // This links the booking to a specific room ID
    inRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    // This links the booking to a specific User ID
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// return the model
module.exports = mongoose.model('Booking', BookingSchema);
