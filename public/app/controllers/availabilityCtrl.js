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

.controller('availabilityDateController',function($routeParams,Availability) {
    var vm = this;
    vm.bookings=[];

    Availability.all($routeParams.date)
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

.controller('availabilityMainController',function(Availability) {
    var vm = this;
    vm.bookings=[];
    
    vm.getAvailability = function(date){

        Availability.all(date)
            .success(function(data){
                vm.bookings = data;   
            });   
    }
}); 
        