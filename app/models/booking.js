// Required packages for booking model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// Booking schema
var BookingSchema = new Schema({

    start       : { type: Date, required: true},
    end         : { type: Date, required: true}, 
    date        : { type: Date, required: true},
    room        : { type: String, required: true},
    user        : { type: String, required: true},
    equipment   : { type: Number, required: true}

});

// return the model
module.exports = mongoose.model('Booking', BookingSchema)
