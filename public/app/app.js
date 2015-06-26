// script.js


//EVENTUALLY SPLIT INTO SEPARATE CONTROLLER FILES

    // also include ngRoute for all our routing needs
    angular.module('karaokeApp', ['app.routes'])


    .controller('mainController', function() {

        var vm = this;

        var username = "";
        var password = "";

        vm.loggedIn = false;

        vm.doLogin = function() {
            vm.isloggedIn = true;
        }

        vm.doLogout = function() {
            vm.isloggedIn = false;
        }

    })

    .controller('homeController', function() {

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


