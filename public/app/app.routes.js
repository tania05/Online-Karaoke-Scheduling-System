    
    //inject ngRoute for all routing needs
    angular.module('app.routes', ['ngRoute'])

    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/views/pages/home.html',
                controller  : 'homeController',
                controllerAs: 'home'
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

            // route for the contact page
            .when('/contact', {
                templateUrl : 'app/views/pages/contact.html',
                controller  : 'contactController',
                controllerAs: 'contact'
            })
						// route for the password Reset page

					  .when('/pwReset', {
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
                controller  : 'userController',
                controllerAs: 'user'
            })

            // user profile page
            // CHANGE 'single' to :user_id to select a specific user
            .when('/users/single', {
                templateUrl : 'app/views/pages/users/single.html',
                controller  : 'userController',
                controllerAs: 'user'
            })

            // page to edit a user
            // CHANGE 'single' to :user_id to select a specific user
            .when('/users/single/edit', {
                templateUrl : 'app/views/pages/users/userForm.html',
                controller  : 'userEditController',
                controllerAs: 'user'

            })        

            // form to create a new user
            // same view as edit page
            .when('/users/create', {
                templateUrl : 'app/views/pages/users/userForm.html',
                controller  : 'userCreateController',
                controllerAs: 'user'
            });


            
        $locationProvider.html5Mode(true);   
    });
