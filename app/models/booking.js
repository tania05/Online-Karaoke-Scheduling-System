// Required packages for booking model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// Booking schema
var BookingSchema = new Schema({

    start       : { type: Date, required: true},
    end         : { type: Date, required: true}, 
//    equipment   : { type: Number, required: true
    
    // This links the booking to a specific room ID
    inRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'    
    }

    // This links the booking to a specific User ID
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

// return the model
module.exports = mongoose.model('Booking', BookingSchema)
