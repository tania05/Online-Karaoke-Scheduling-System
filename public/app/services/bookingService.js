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
    bookingFactory.edit = function(id, bookingData) {
        return $http.put('/api/bookings/' + id, bookingData);
    };

    // get all booking by user
    bookingFactory.all = function(id, user_id) {
        return $http.get('/api/bookings/'+id, user_id);
    };
    return bookingFactory;
});
