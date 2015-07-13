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
    vm.initDate = new Date().toISOString().substr(0, 10);
    vm.date = vm.initDate;

    vm.maxDate = new Date(vm.date);
    vm.maxDate.setDate(new Date().getDate()+13);
    vm.maxDate = vm.maxDate.toISOString().substr(0, 10);

    vm.times = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'];

    vm.hrTimes = ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM'];

    vm.isAvailable = function(booking, curr) {
        var currentDate = new Date(booking.date + ' ' + curr);
        var startDate = new Date(booking.date + ' ' + booking.start);
        var endDate = new Date(booking.date + ' ' + booking.end);

        //check if the slot is booked (false if booked, true if available)
        if(currentDate >= startDate && currentDate < endDate) return false;
        else if(endDate < startDate){
            if(currentDate >= startDate) return false;
            else if(currentDate < startDate && currentDate < endDate) return false;
            else return true;
        }
        else return true;

    }

    vm.getAvailability = function(date){
        Availability.all(date)
            .success(function(data){
                vm.bookings = data;
            });   
    }


    vm.changeMicView = function(date,startTime,endTime){
        if(startTime && endTime){
            Availability.equipAvail(date, startTime, endTime)
                .success(function(data){
                    vm.iPads = data.iPads;
                    vm.mics = data.mics;
                }); 
        }    
    }

    vm.Range = function(start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    };
});


