angular.module('roomService',[])

.factory('Room', function($http) {
    
    // create a new object
    var roomFactory = {};

    // create a room
    roomFactory.create = function(roomData) {
        return $http.post('/api/rooms', roomData);
    };

    // delete a rooom
    roomFactory.delete = function(id) {
        return $http.delete('/api/rooms/' + id);
    };

    // edit a room
    roomFactory.edit = function(id, roomData) {
        return $http.put('/api/rooms/' + id, roomData);
    };

    // get all rooms
    roomFactory.all = function() {
        return $http.get('/api/rooms/');
    };
    return roomFactory;
});
