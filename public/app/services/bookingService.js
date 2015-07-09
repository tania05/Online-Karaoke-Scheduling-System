angular.module('bookingService',[])

.factory('Booking', function($http) {
    
    // create a new object
    var bookingFactory = {};

    // create a booking
    bookingFactory.create = function(bookingData) {
        return $http.post('/api/bookings', bookingData);
    };

    // delete a booking
    bookingFactory.delete = function(id) {
        return $http.delete('/api/bookings/' + id);
    };

    // edit a booking
    bookingFactory.update = function(id, bookingData) {
        return $http.put('/api/bookings/' + id, bookingData);
    };

    // get all booking by user
    bookingFactory.user = function(userID) {
        return $http.get('/api/userBookings/' + userID);
    };

        // get particular booking by Id
    bookingFactory.get = function(bookingID) {
        return $http.get('/api/bookings/' + bookingID);
    };
    return bookingFactory;
});
