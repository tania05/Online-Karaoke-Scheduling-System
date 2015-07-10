angular.module('karaokeApp', ['app.routes', 'authService', 'contactCtrl', 'bookingCtrl', 'userCtrl', 'mainCtrl', 'adminCtrl', 'pwResetCtrl', 'roomService','availabilityCtrl' ])


.config(function($httpProvider) {
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});
