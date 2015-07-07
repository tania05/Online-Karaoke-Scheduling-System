angular.module('availService',[])

.factory('Availability', function($http) {
    
    // create a new object
    var availFactory = {};


    // get rooms based on people
    availFactory.getRooms = function(people) {
        return $http.delete('/api/rooms/capacity', people);
    };

    // get the available equipment
    availFactory.equipAvail = function(bookingData) {
        return $http.put('/api/availability/equip', bookingData);
    };

    // get all rooms availability for a particular day
    availFactory.all = function(date) {
        return $http.get('/api/availability', date);
    };

    // get a specific rooms availability
    availFactory.roomAvail = function(date, roomName) {
        return $http.get('/api/availability/room', date, roomName);
    };
    return bookingFactory;
});
