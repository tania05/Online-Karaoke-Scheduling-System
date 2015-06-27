// start our angular module and inject userServices
angular.module('userCtrl', [])


// ====
// ----
// userController
// ----
// This controller provides the functionality of the user's profile page.
// ====
.controller('userController', function() {

    var vm = this;


    // ====
    // function to populate the page with the user's information.
    // ====

/*
    // function to delete a user
    vm.deleteUser = function(id) {
        
        //accepts the user id as a parameter
        User.delete(id)
            .success(function(data) {
                // if delete was successful, send to homepage.
                $location.path('/');
            });
    };

*/

})

// ====
// ----
// userCreateController
// ----
// This controller covers the registration process.
// ====
.controller('userCreateController', function() {

     var vm = this;
     vm.message = 'Injected Registration Page!';

     vm.type = 'create';
    // ====
    // function to handle the create of a user.
    // ====

})
    

// ====
// ----
// userEditController
// ----
// This controller cover the edit user info process. See pages 196-200
// ====
.controller('userEditController', function() {
    
    var vm = this;

    vm.type = 'edit';


/*    
    // get the user data for the user you want to edit
    // $routeParams is the way we grab data from the URL
    User.get($routeParams.user_id)
        .success(function(data) {
            vm.userData = data;
        });

    // function to save the user
    vm.saveUser = function() {
        vm.message = '';

        // all the userService function to update
        User.update($routeParams.user_id, vm.userData)
            .success(function(data) {
                
                //clear the form
                vm.userData {};

                // bind the message from our API to vm.message
                vm.message = data.message;
            });
    };

*/
});

// ====
// ----
// userResetPWController
// ----
// This controller covers the password reset process.
// ====
    // ====
    // functions to handle the process of reseting a password.
    // ====
