// ====
// ----
// availabilityController
// ----
// This controller covers all the stuff that needs to
// happen on the availabilty page.
// ====
    // ====
    // function to populate the table/calender
    // ====


angular.module('availabilityCtrl', ['availService'])

.controller('availabilityDateController',function($scope,Availability) {
    var vm = this;
    vm.bookings=[];
    vm.date = new Date();
    vm.dateString = vm.date.toISOString().substr(0, 10);

    Availability.all($scope.date)
        .success(function(data){
            vm.bookings = data;   
        });
    
    vm.getAvailability = function(date){
        Availability.all(date)
            .success(function(data){
                vm.bookings = data;   
            });   
    }
}) 

.controller('availabilityMainController', function(Availability) {
    var vm = this;
    vm.bookings=[];
    vm.date = new Date();
    vm.dateString = vm.date.toISOString().substr(0, 10);

    vm.getAvailability = function(date){
        Availability.all(date)
            .success(function(data){
                vm.bookings = data;   
            });   
    }
});