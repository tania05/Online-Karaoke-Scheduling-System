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

BookingSchema.methods.isAvailable = function(curr){
    var booking = this;

    var currentDate = new Date(booking.date + ' ' + curr);
    var startDate = new Date(booking.date + ' ' + booking.start);
    var endDate = new Date(booking.date + ' ' + booking.end);

    console.log("made is to isAvailable");
    console.log(curr);

    // room is not available for the time slot
    if(currentDate >= startDate && currentDate < endDate){
        return false;
    }
    // room is available
    return true;
}

// return the model
module.exports = mongoose.model('Booking', BookingSchema);

