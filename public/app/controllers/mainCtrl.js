angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, User) {

    var vm = this;

    this.id = "invalidID";

    // get info if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    vm.path = window.location.pathname;

    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();

        if(!vm.loggedIn && window.location.pathname == "/booking") {
            $location.path('/'); 
        }

        // get user information on route change
        Auth.getUser()
            .then(function(data) {
                vm.user = data.data;
                vm.id = data.data._id;
            });
    });


    // function to handle login form
    vm.doLogin = function() {
        vm.processing = true;

        vm.error = '';

        // call the Auth.login() function
        Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
            vm.processing = false;
            // if a user successfully logs in, update the view.
            // NOTE --- CHANGE THIS IF YOU NEED TO
            if(data.success) {
                vm.loggedIn = true;
                vm.user = data.userData;
            }
            // NOTE --- YOU CAN USE THIS ERROR MESSAGE
            // SHOWS HOW TO ON PAGE 184-186
            else
                vm.error = data.message;
        });
    };

    // function to handle logging out
    vm.doLogout = function() {
        Auth.logout();
        vm.loggedIn = false;

        // reset all user info
        vm.user = '';

        // update the view
        // NOTE --- CHANGE THIS IF YOU NEED TO
    };


});
