// Required packages for user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

//User schema

/*TEMPORARILY REMOVED ATTRIBUTES FOR TESTING SIMPLICITY
*/

var UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true}},
    password: { type: String, required: true, select: false },	
    email: { type: String, required: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    banExpires: {type: Date}
});

//hashing the password before the user is saved
UserSchema.pre('save', function(next) {
    var user = this;

    //hash only if password is changed or the user is new
    if (!user.isModified('password')) return next();

    //generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        //change the password to the hashed version
        user.password = hash;
        next();
    });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
    var user = this;
		
    return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.validateBookingChange = function(booking) {
    var user = this;

    var date = new Date();
    var startDate = new Date(booking.date + ' ' + booking.start);
    if(Math.abs(startDate - date) <= 1000 * 60 * 60 * 4){
        // Set the ban to expire in 12 hours
        user.banExpires = new Date();
        user.banExpires.setHours(user.banExpires.getHours()+12);

        // Returns false if the user should be banned, save the model after
        console.log('User ' + user.name + ' banned.');
        user.save();
        return false;
    }

    // Returns true if the user should not be banned for this operation
    return true;
}

//return the model
module.exports = mongoose.model('User', UserSchema);


