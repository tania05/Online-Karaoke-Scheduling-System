    
    //inject ngRoute for all routing needs
    angular.module('app.routes', ['ngRoute'])

    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/views/pages/home.html'
            })

            // form to create a new user
            // same view as edit page
            .when('/register', {
                templateUrl : 'app/views/pages/userForm.html',
                controller  : 'userCreateController',
                controllerAs: 'user'
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
                controller  : 'availabilityMainController',
                controllerAs: 'availability'
            })

            .when('/availability/:date', {
                templateUrl : 'app/views/pages/availability.html',
                controller  : 'availabilityDateController',
                controllerAs: 'availability'
            })
			
            // route for the contact page
            .when('/contact', {
                templateUrl : 'app/views/pages/contact.html',
                controller  : 'contactController',
                controllerAs: 'contact'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'app/views/pages/about.html'
            })



            //=====================================================
            // BOOKING ROUTES
            // ====================================================

             // would be changed to '/profile/bookings/create'
            .when('/bookings/create', {
                templateUrl : 'app/views/pages/bookingForm.html',
                controller  : 'bookingCreateController',
                controllerAs: 'booking'
            })

             // would be changed to '/profile/bookings/delete'
             .when('/bookings/:booking_id/delete', {
                templateUrl : 'app/views/pages/deleteBooking.html',
                controller  : 'bookingDeleteController',
                controllerAs: 'booking'
            })

                          // would be changed to '/profile/bookings/delete'
            .when('/bookings/:booking_id/edit', {
                templateUrl : 'app/views/pages/bookingForm.html',
                controller  : 'bookingEditController',
                controllerAs: 'booking'
            })


             // would be changed to '/profile/bookings'
            .when('/:user_id/bookings', {
                templateUrl : 'app/views/pages/manageBooking.html',
                controller  : 'bookingManageController',
                controllerAs: 'booking'
            })				
			


            //======================================================
            // PASSWORD RESET ROUTES
            // =====================================================
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


            //=====================================================
            // ADMIN ROUTES
            // ====================================================

            // show all users
            // available only to admin
            .when('/admin', {
                templateUrl : 'app/views/pages/admin.html',
                controller  : 'adminController',
                controllerAs: 'admin'
            })

            // page to edit a user
            .when('/admin/:user_id/edit', {
                templateUrl : 'app/views/pages/userForm.html',
                controller  : 'userEditController',
                controllerAs: 'user'

            })  

            // page to delete a user
            .when('/admin/:user_id/delete', {
                templateUrl : 'app/views/pages/deleteUser.html',
                controller  : 'userDeleteController',
                controllerAs: 'user'
            })

            // page to view users bookings
            .when('/admin/:user_id/bookings', {
                templateUrl : 'app/views/pages/manageBooking.html',
                controller  : 'bookingManageController',
                controllerAs: 'booking'
            })

            .when('/admin/:user_id/bookings/create', {
                templateUrl : 'app/views/pages/booking.html',
                controller  : 'bookingCreateController',
                controllerAs: 'booking'
            })

             .when('/admin/bookings/:booking_id/delete', {
                templateUrl : 'app/views/pages/deleteBooking.html',
                controller  : 'bookingDeleteController',
                controllerAs: 'booking'
            })

            .when('/admin/bookings/:booking_id/edit', {
                templateUrl : 'app/views/pages/deleteBooking.html',
                controller  : 'bookingDeleteController',
                controllerAs: 'booking'
            })



            //=====================================================
            // USER ROUTES
            // ====================================================

            // user profile page
            .when('/:user_id', {
                templateUrl : 'app/views/pages/profile.html',
                controller  : 'userController',
                controllerAs: 'user'
            })

            // page to edit a user
            .when('/:user_id/edit', {
                templateUrl : 'app/views/pages/userForm.html',
                controller  : 'userEditController',
                controllerAs: 'user'

            })  

			// page to delete a user
            .when('/:user_id/delete', {
                templateUrl : 'app/views/pages/deleteUser.html',
                controller  : 'userDeleteController',
                controllerAs: 'user'
            });
 
        $locationProvider.html5Mode(true);   
    });
