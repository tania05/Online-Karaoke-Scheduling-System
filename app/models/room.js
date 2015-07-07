// Required packages for booking model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Room schema
var RoomSchema = new Schema({
    
    name: { type: String, required: true },
    capacity: { type: Number, required: true }

});

module.exports = mongoose.model('Room', RoomSchema);
    
