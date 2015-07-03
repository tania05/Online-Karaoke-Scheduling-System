angular.module('bookingCtrl', ['bookingService'])

.controller('bookingController', function($routeParams, Booking) {

    var vm = this;
    vm.processing=true;
    vm.message = 'Injected Booking Page!';
    
    Booking.get($routeParams.booking_id)
    	.success(function(data){
    		vm.bookingData=data;
    	})
})

.controller('bookingDeleteController', function($routeParams, Booking){
	var vm = this;
	
	vm.deleted= false;
	
	vm.deleteBooking = function(){
		Booking.delete($routeParams.booking_id)
			.success(function(data){
				vm.deleted= true;
			})
	
	}

});


// ====
// ----
// bookingCreateController
// ----
// This controller handles the process of creating a booking
// ====


    // ====
    // functions...
    // ====

// ====
// ----
// bookingEditController
// ----
// This controller handles the process of editing a booking.
// ====
    // ====
    // functions...
    // ====


// ====
// ----
// bookingsManageController
// ----
// This controller handles the process of viewing all of your bookings
// ====
    // ====
    // functions...
    // ====
