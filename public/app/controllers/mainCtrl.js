angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, User) {

    var vm = this;


    // get info if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
        vm.loggedIn = Auth.isLoggedIn();

        // get user information on route change
        Auth.getUser()
            .then(function(data) {
                vm.user = data.data;
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

	// function to check current html page
	vm.currPage = function() {
		var path = window.location.pathname;
		var page = path.split("/").pop();
		return page;
	};

	// function to check if current html page is the login page
	vm.isLoginPage = function() {
		var loginPage = false;
		if(vm.currPage() == "login"){
			loginPage = true;
		} else {
			loginPage = false;
		}
		return loginPage;
	};
});
