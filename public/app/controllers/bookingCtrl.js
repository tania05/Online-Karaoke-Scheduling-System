

angular.module('bookingCtrl', [bookingService])

.controller('bookingController', function() {

    var vm = this;
    vm.message = 'Injected Booking Page!';
});

// ====
// ----
// bookingCreateController
// ----
// This controller handles the process of creating a booking
// ====
.controller('userCreateController', function(Booking){
	
	var vm = this;
	
	//variable to differenctialte edit and create bookings
	vm.type='create';
	
	// function to crreate the booking
	
	vm.saveBooking = function(){
	
	vm.processing = true;
	vm.message= '';
	
	// use the create function on bookingService
	Booking.create(vm.bookingData)
		.success(function(data){
			vm.processing =false;
			vm.bookingData={};
			vm.message= data.message;
		})
	
	}

})
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
