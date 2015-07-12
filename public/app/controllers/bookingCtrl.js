angular.module('bookingCtrl', ['bookingService'])

.controller('bookingController', function($routeParams, Booking) {

    var vm = this;
    vm.processing=true;
    vm.message = 'Injected Booking Page!';
    
    Booking.get($routeParams.booking_id)
        .success(function(data){
           vm.bookingData = data;
        });
})

.controller('bookingCreateController', function($routeParams, Booking, Room){
    var vm = this;
	
	// variable to hide/show elements of the view
	// difference between create or edit page
	
    vm.type = 'create';
    vm.processing = true;
    vm.date = new Date();
    vm.bookingData = {};
    vm.btn = 'Book';
    vm.bookingData.people = undefined;
    vm.bookingData.mic = 0;
    vm.bookingData.iPad = 0;
    vm.bookingData.date = new Date().toISOString().substr(0,10);
    vm.bookingData.compareDate = new Date().toISOString().substr(0,10);    
    vm.complete = false;

    // Get all of the rooms to be displayed
    Room.all()
        .success(function(data){
            vm.processing=false;
            vm.rooms=data;

            // traverse all the rooms and determine visibility of each room in the view
            for(var i = 0; i < vm.rooms.length; i++){
                // TODO: determine visibility here based on whether a room is available
                vm.rooms[i].visible = false;
            }

            /*for(var i = 0; i < vm.rooms.length; i++){
                // TODO: determine visibility here based on whether a room is available
                if(vm.rooms[i].capacity == 2){
                    vm.bookingData.roomSelected = vm.rooms[i];
                    vm.rooms[i].visible = true;
                }
            }*/
            
            //Setting the default selection for the view
                
            
            vm.message = data.message;
        });

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

    vm.changeRoomview= function(people){
        var min = vm.rooms[0];
        // for(var j = 0; j < vm.rooms.length; j++){
        //     vm.rooms[j].visible = false;
        // }

        
        for(var i = 0; i < vm.rooms.length; i++){
            // TODO: determine visibility here based on whether a room is available
            

            if( vm.bookingData.people > vm.rooms[i].capacity){
                

                vm.rooms[i].visible = false;
                min = vm.rooms[i+1];

            }
            
            else if (min.capacity == vm.rooms[i].capacity){
                vm.bookingData.roomSelected =min;
                vm.rooms[i].visible = true;    
                    
            }
            else{
                vm.rooms[i].visible=false;
            }
            
        }
        
    }
	
	vm.roomsDontWork= function(people){
        var min = vm.rooms[0];
		var people = vm.bookingData.people * 2;

        // for(var j = 0; j < vm.rooms.length; j++){
        //     vm.rooms[j].visible = false;
        // }

        
        for(var i = 0; i < vm.rooms.length; i++){
            // TODO: determine visibility here based on whether a room is available
            

            if( people > vm.rooms[i].capacity){
                

                vm.rooms[i].visible = false;
                min = vm.rooms[i+1];

            }
            
            else if (min.capacity == vm.rooms[i].capacity){
                vm.bookingData.roomSelected =min;
                vm.rooms[i].visible = true;    
                    
            }
            else{
                vm.rooms[i].visible=false;
            }
            
        }
        
    }    

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
		
    Booking.user($routeParams.user_id)
        .success(function(data){
            //console.log(data);
            //console.log(err);
            // when all the bookings come back, remove the processing variable
            vm.processing= false;
				
				//bind the user that come back to vm.users
            vm.bookings=data;
			
        });
})


.controller ('bookingEditController', function($routeParams, Booking, Room){
    var vm = this;
	
    vm.type = 'edit';
    vm.complete = false;
    vm.btn = "Save Changes";
    vm.date = new Date();
	
    Booking.get($routeParams.booking_id)
    	.success(function(data){
            vm.bookingData = data;
            vm.user_id = vm.bookingData.createdBy;

            // Get all of the rooms to be displayed
            Room.all()
                .success(function(data){
                    vm.processing=false;
                    vm.rooms=data;

                    // traverse all the rooms and determine visibility of each room in the view
                    for(var i = 0; i < vm.rooms.length; i++){
                        // Match the room id with the schema room id
                        // and assign the room name to the view
                        if(vm.rooms[i]._id == vm.bookingData.inRoom){
                            vm.bookingData.roomSelected = vm.rooms[i];
                        }

                        // TODO: determine visibility here based on whether a room is available
                        vm.rooms[i].visible = true;
                    }
                    vm.message = data.message;
                });
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
    Booking.get($routeParams.booking_id)
        .success(function(data){
        	vm.bookingData = data;
        	vm.user_id = vm.bookingData.createdBy;
        	
            var date = new Date();
            var startDate = new Date(data.date + ' ' + data.start);
            if(Math.abs(startDate - date) <= 1000 * 60 * 60 * 4){
                vm.warningDelete = true;
            }    
            vm.deleteBooking = function(){
                Booking.delete($routeParams.booking_id)
                    .success(function(data){
                        vm.deleted = true;
                    });
            };
        });
});


