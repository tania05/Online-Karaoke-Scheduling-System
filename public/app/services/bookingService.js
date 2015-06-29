angular.module('bookingService',['userService'])

.factory('Booking', function($http) {
    
    // create a new object
    var bookingFactory = {};

    // create a booking
    bookingFactory.create = function(bookingData) {
        return $http.post('/api/bookings/create', bookingData);
    }

    // delete a booking
    bookingFactory.delete = function(id) {
        return $http.delete('/api/bookings/' + id);
    }

    // edit a booking
    bookingFactory.edit = function(id, bookingData) {
        return $http.put('/api/bookings/' + id, bookingData);
    }

    // get all booking by user
    bookingFactory.all = function(userId) {
        return $http.get('/api/bookings/manage', userId);
    }
}
