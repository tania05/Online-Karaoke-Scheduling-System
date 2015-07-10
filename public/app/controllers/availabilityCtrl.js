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
    vm.times = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'];

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
    vm.initDate = new Date();
    vm.date = vm.initDate.toISOString().substr(0, 10);

    vm.maxDate = new Date(vm.date);
    vm.maxDate.setDate(vm.initDate.getDate()+13);
    vm.maxDate = vm.maxDate.toISOString().substr(0, 10);

    vm.times = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'];

    vm.isAvailable = function(booking, curr) {
        var currentDate = new Date(booking.date + ' ' + curr);
        var startDate = new Date(booking.date + ' ' + booking.start);
        var endDate = new Date(booking.date + ' ' + booking.end);

        // room is not available for the time slot
        if(currentDate >= startDate && currentDate < endDate){
            return false;
        }
        // room is available
        return true;
    }

    vm.getAvailability = function(date){
        Availability.all(date)
            .success(function(data){
                vm.bookings = data;
            });   
    }
});