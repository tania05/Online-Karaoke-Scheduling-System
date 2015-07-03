    
    //inject ngRoute for all routing needs
    angular.module('app.routes', ['ngRoute'])

    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/views/pages/home.html'
            })

            // route for the login page
			.when('/login', {
                templateUrl : 'app/views/pages/login.html',
                controller  : 'mainController',
                controllerAs: 'login'
            })     

            // route for the availability page
            .when('/availability', {
                templateUrl : 'app/views/pages/availability.html',
                controller  : 'availabilityController',
                controllerAs: 'availability'
            })

            // route for the booking page
            .when('/booking', {
                templateUrl : 'app/views/pages/booking.html',
                controller  : 'bookingController',
                controllerAs: 'booking'
            })

			 .when('/booking/:booking_id/delete', {
                templateUrl : 'app/views/pages/deleteBooking.html',
                controller  : 'bookingDeleteController',
                controllerAs: 'booking'
            })

            .when('/bookings/:user_id', {
                templateUrl : 'app/views/pages/manageBooking.html',
                controller  : 'bookingManageController',
                controllerAs: 'user'
            })				
			
            // route for the contact page
            .when('/contact', {
                templateUrl : 'app/views/pages/contact.html',
                controller  : 'contactController',
                controllerAs: 'contact'
            })
						// route for the password Reset page

			.when('/pwResetForgot', {
                templateUrl : 'app/views/pages/pwResetForgot.html',
                controller  : 'pwResetForgotController',
                controllerAs: 'pwReset'
            })

			.when('/pwReset/:token', {
                templateUrl : 'app/views/pages/pwReset.html',
                controller  : 'pwResetController',
                controllerAs: 'pwReset'
            })



            //============
            // USER ROUTES
            // ===========

            // show all users
            // available only to admin
            .when('/users', {
                templateUrl : 'app/views/pages/users/all.html',
                controller  : 'adminController',
                controllerAs: 'admin'
            })

            // form to create a new user
            // same view as edit page
            .when('/users/register', {
                templateUrl : 'app/views/pages/users/userForm.html',
                controller  : 'userCreateController',
                controllerAs: 'user'
            })


            // user profile page
            .when('/users/:user_id', {
                templateUrl : 'app/views/pages/users/single.html',
                controller  : 'userController',
                controllerAs: 'user'
            })

            // page to edit a user
            .when('/users/:user_id/edit', {
                templateUrl : 'app/views/pages/users/userForm.html',
                controller  : 'userEditController',
                controllerAs: 'user'

            })  

			// page to delete a user
            .when('/users/:user_id/delete', {
                templateUrl : 'app/views/pages/deleteUser.html',
                controller  : 'userDeleteController',
                controllerAs: 'user'
            });
 
        $locationProvider.html5Mode(true);   
    });
