// start our angular module and inject userServices
angular.module('userCtrl', ['userService'])

// Admin controller for the admin page.
// Allows the admin to manage users.
// inject the User factory.
.controller('userController', function(User) {

    var vm = this;

    //grab all the users at page load
    User.all()
        .success(function(data) {

            // bind the users that come back to vm.users
            vm.users = data;
        });

    // ====
    // function to edit a user. This is probably just a path change to
    // the user's profile page. "Manage Account" wireframe.
    // ====


    // ====
    // function to view a user's bookings. This is probably just a path
    // change to the user's bookings. "Manage bookings" wireframe.
    // ====


    // ====
    // functions to do the searches on the admin page. "Admin Page" wireframe.
    // ====
})