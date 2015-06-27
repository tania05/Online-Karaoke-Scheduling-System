angular.module('karaokeApp', ['app.routes', 'contactCtrl', 'bookingCtrl', 'userCtrl'])


.config(function($httpProvider) {

/*
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

	*/

})

.controller('mainController', function() {

    var vm = this;

    var username = "";
    var password = "";

    vm.loggedIn = false;

});





