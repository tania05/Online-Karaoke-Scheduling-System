angular.module('karaokeApp', ['app.routes', 'authService', 'contactCtrl', 'bookingCtrl', 'userCtrl', 'mainCtrl', 'adminCtrl', 'pwResetCtrl' ])


.config(function($httpProvider) {

/* CAUSES APP TO BREAK
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
	*/

});
