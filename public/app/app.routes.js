    
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

            .when('/profile', {
                templateUrl : 'app/views/pages/profile.html',
                controller  : 'profileController',
                controllerAs: 'profile'
            })

            // route for the about page
            .when('/availability', {
                templateUrl : 'app/views/pages/availability.html',
                controller  : 'availabilityController',
                controllerAs: 'availability'
            })

            // route for the contact page
            .when('/booking', {
                templateUrl : 'app/views/pages/booking.html',
                controller  : 'bookingController',
                controllerAs: 'booking'
            })

            .when('/contact', {
                templateUrl : 'app/views/pages/contact.html',
                controller  : 'contactController',
                controllerAs: 'contact'
            });
        $locationProvider.html5Mode(true);   
    });