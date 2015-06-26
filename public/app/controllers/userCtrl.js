// start our angular module and inject userServices
angular.module('userCtrl', ['userService'])

// user controller for the user's personal page
// inject the User factory
.controller('userController', function(User) {

    var vm = this;

    // function to delete a user
    vm.deleteUser = function(id) {
        
        //accepts the user id as a parameter
        User.delete(id)
            .success(function(data) {
                // if delete was successful, send to homepage.
                $location.path('/');
            });
    };

    // ====
    // function to allow the user to edit their profile. Might just
    // be a path change to the "Edit user" wireframe.
    // ====

    // ====
    // function to all the user to view their bookings. Might just
    // be a path change to the "Manage Bookings" wireframe.
    // ====

};
