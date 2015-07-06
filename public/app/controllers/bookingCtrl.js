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

.controller('TimepickerDemoCtrl', function ($scope, $log) {
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
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
			})
		};
})

.controller ('bookingManageController', function($routeParams, Booking){
	var vm = this;
	
	vm.message = 'Manage your bookings';
		
		Booking.all($routeParams.user_id)
			.success(function(data){
				console.log(data);
				console.log(err);
				// when all the bookings come back, remove the processing variable
				vm.processing= false;
				
				//bind the user that come back to vm.users
				vm.bookings=data;
			
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


