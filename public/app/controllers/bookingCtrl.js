angular.module('bookingCtrl', ['bookingService'])

.controller('bookingController', function($routeParams, Booking) {

    var vm = this;
    vm.processing=true;
    vm.message = 'Injected Booking Page!';
    
    Booking.get($routeParams.booking_id)
    	.success(function(data){
    		vm.bookingData=data;
    	});
})

.controller('bookingCreateController', function($routeParams, Booking){
	var vm = this;
	
	// variable to hide/show elements of the view
	// difference between create or edit page
	
	vm.type='create';
	vm.btn = 'Book';
	vm.complete = false;
	
	// function to create booking
	
	vm.saveBooking = function(){
		vm.processing= true;
		vm.message='';
	
		//using the create function in the bookingService
		Booking.create(vm.bookingData)
			.success(function(data){
				vm.processing=false;
				vm.complete = true;
				vm.bookingData={};
				vm.message = data.message;
			});
		};
})

.controller ('bookingManageController', function($routeParams, Booking){
	var vm = this;
	
	vm.message = 'Manage your bookings';
		
		Booking.all($routeParams.user_id)
			.success(function(data){
				//console.log(data);
				//console.log(err);
				// when all the bookings come back, remove the processing variable
				vm.processing= false;
				
				//bind the user that come back to vm.users
				vm.bookings=data;
			
			});

})


.controller ('bookingEditController', function($routeParams, Booking){
	var vm = this;
	
	vm.type = 'edit';
	vm.complete = false;
	vm.btn = "Save Changes";

    Booking.get($routeParams.booking_id)
    	.success(function(data){
    		vm.bookingData = data;

    	});


	// function to save the booking
	vm.saveBooking = function(){
		vm.processing=true;
		vm.message='';

		//call the bookingService function to update
		Booking.update($routeParams.booking_id, vm.bookingData)
			.success(function(data) {
				vm.processing= false;
                vm.complete = true;
				//clear the form
				vm.bookingData = {};
				//bind the message from API to vm.message
				vm.message = data.message;	
			});
	};
})




.controller('bookingDeleteController', function($routeParams, Booking){
	var vm = this;
	
	vm.deleted= false;
	
	vm.deleteBooking = function(){
		Booking.delete($routeParams.booking_id)
			.success(function(data){
				vm.deleted= true;
			});
	
	};

});


