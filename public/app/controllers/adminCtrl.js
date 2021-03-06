// start our angular module and inject userServices
angular.module('adminCtrl', ['userService', 'authService'])

// Admin controller for the admin page.
// Allows the admin to manage users.
// inject the User factory.
.controller('adminController', function(User, Auth) {

    var vm = this;

	vm.message = 'my message';
    
	Auth.getUser()
            .then(function(data) {
                vm.isAdmin = data.data.isAdmin;
            });
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
