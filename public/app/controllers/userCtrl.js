// start our angular module and inject userServices
angular.module('userCtrl', ['userService'])

// user controller for the user's personal page
// inject the User factory
.controller('userController', function(User) {

    var vm = this;

    // ====
    // function to populate the page with the user's information.
    // ====

    // function to delete a user
    vm.deleteUser = function(id) {
        
        //accepts the user id as a parameter
        User.delete(id)
            .success(function(data) {
                // if delete was successful, send to homepage.
                $location.path('/');
            });
    };
};

// ====
// ----
// userCreateController
// ----
// This controller covers the registration process.
// ====
    // ====
    // function to handle the create of a user.
    // ====

// ====
// ----
// userEditController
// ----
// This controller cover the edit user info process.
// ====
    // ====
    // function to handle edits to the user's data.
    // ====
   

// ====
// ----
// userResetPWController
// ----
// This controller covers the password reset process.
// ====
    // ====
    // functions to handle the process of reseting a password.
    // ====
