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
	
	// function to create booking
	
	vm.saveBooking = function(){
		vm.processing= true;
		vm.message='';
	
		//using the create function in the bookingService
		Booking.create(vm.bookingData)
			.success(function(data){
				vm.processing=false;
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


