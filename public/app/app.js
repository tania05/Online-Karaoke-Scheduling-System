// script.js


//EVENTUALLY SPLIT INTO SEPARATE CONTROLLERS


    // create the module and name it karaokeApp
        // also include ngRoute for all our routing needs
    angular.module('karaokeApp', ['app.routes'])


    // create the controller and inject Angular's $scope
    .controller('homeController', function() {
        // create a message to display in our view

        var vm = this;

        vm.message = 'Injected Home Page!';
    })

    .controller('profileController', function() {

        var vm = this;
        this.message = 'Injected Profile Page!';
    })

    .controller('availabilityController', function() {

        var vm = this;
        this.message = 'Injected Availability Page!';
    })

    .controller('bookingController', function($scope) {

        var vm = this;
        this.message = 'Injected Booking Page!';
    })

    .controller('contactController', function($scope) {

        var vm = this;
        vm.message = 'Injected contact Page!';
    });


