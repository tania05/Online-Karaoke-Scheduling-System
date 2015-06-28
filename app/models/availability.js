// Required packages for availability model
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

// Availability Schema
var AvailabilitySchema = new Schema({
    
    // This links the Availability to a specific room.
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
    
    // This is an array of all the bookings created for the
    // room secified above.
    roomAvailability: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
};

// Return the model
module.exports = mongoose.model('Availability', AvailabilitySchema)
