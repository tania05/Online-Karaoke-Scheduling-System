module.exports = {
    'port': process.env.PORT || 8080,
    'database': '???',
    'secret': 'type something here'
};

var config  = require('./config');

// connect to our database (hosted at ????).
mongoose.connect(config.database);

// START THE SERVER
// ======================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);

// super secret for creating tokens.
var superSectrect = 'type something secret here.';
    
