// start our angular module and inject userServices
angular.module('adminCtrl', ['userService'])

// Admin controller for the admin page.
// Allows the admin to manage users.
// inject the User factory.
.controller('adminController', function(User) {

    var vm = this;

	vm.message = 'my message';
    
    // ====
    // function to populate the page with the user's information.
    // ====
    User.all()
        .success(function(data) {

            // when all the users come back, remove the processing variable
            vm.processing = false;

            // bind the users that come back to vm.users
            vm.users = data;
        });


    // function to delete a user
    vm.deleteUser = function(id) {
        vm.processing = true;

        User.delete(id)
            .success(function(data) {

                // get all users to update the table
                // you can also set up your api 
                // to return the list of users with the delete call
                User.all()
                    .success(function(data) {
                        vm.processing = false;
                        vm.users = data;
                    });

            });
    };


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
});
