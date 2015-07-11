angular.module('bookingService',[])

.factory('Booking', function($http) {
    
    // create a new object
    var bookingFactory = {};



    // function modifyBack(time){
    //     var modifiedTime = Number(time.substring(0, 2))-3;
    //     if(modifiedTime < 0)
    //         modifiedTime += 24;
    //     if(modifiedTime == 0)
    //         return modifiedTime.toString().concat('0').concat(time.substring(2, 5));

    //     return modifiedTime.toString().concat(time.substring(2, 5));
    // }

    //     function modifyForward(time){
    //     var modifiedTime = Number(time.substring(0, 2))+3;
    //     if(modifiedTime < 0)
    //         modifiedTime += 24;
    //     return modifiedTime.toString().concat(time.substring(2, 5));
    // }




    // create a booking
    bookingFactory.create = function(bookingData) {

        // bookingData.start = modifyBack(bookingData.start);
        // bookingData.end = modifyBack(bookingData.end);

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