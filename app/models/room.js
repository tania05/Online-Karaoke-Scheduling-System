// Required packages for booking model
var mongoose = require('mongoose')
var Schema   = mongoose.Schema

// Room schema
var RoomSchema = new Schema({
    
    name: { type: String, required: true },
    number: { type: Number, required: true, index: { unique: true }},
    capacity: { type: Number, required: true },
    available: { type: Boolean, require: true }
});

module.exports = mongoose.model('Room', RoomSchema)
    
