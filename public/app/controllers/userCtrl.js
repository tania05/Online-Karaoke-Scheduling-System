// start our angular module and inject userServices
angular.module('userCtrl', ['userService'])


// ====
// ----
// userController
// ----
// This controller provides the functionality of the user's profile page.
// ====
.controller('userController', function(User) { //temporarily removed parameter 'User'

    var vm = this;

    vm.processing = true;


    // ====
    // function to populate the page with the user's information.
    // ====
	User.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});
	

/*
    // function to delete a user
    vm.deleteUser = function(id) {
        
        //accepts the user id as a parameter
        User.delete(id)
            .success(function(data) {
                // if delete was successful, send to homepage.
                $location.path('/');
            });
    };

*/

})




// ====
// ----
// userCreateController
// ----
// This controller covers the registration process.
// ====
.controller('userCreateController', function() { //temporarily removed parameter 'User'

     var vm = this;

    // variable to hide/show elements of the view
    // differentiates between create or edit pages
     vm.type = 'create';

	vm.message = 'A message';

    // ====
    // function to create a user
    // ====
    vm.saveUser = function() {
        vm.processing = true;
        vm.message = '';

        // use the create function in the userService
        User.create(vm.userData)
            .success(function(data) {
                vm.processing = false;
                vm.userData = {};
                vm.message = data.message;
            });
            
    };  

})
    

// ====
// ----
// userEditController
// ----
// This controller cover the edit user info process. See pages 196-200
// ====
.controller('userEditController', function($routeParams, User) { //temporarily removed parameters '$routeParams', 'User'
    
    var vm = this;

    // variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'edit';

    User.get($routeParams.user_id)
    	.success(function(data){
    		vm.userData= data;

    	})


    	// function to save the user
    	vm.saveUser = function(){
    		vm.processing=true;
    		vm.message='';

    		//call the userService function to update
    		User.update($routeParams.user_id, vm.userData)
    			.success(function(data) {
    				vm.processing= false;

    				//clear the form
    				vm.userData= {};


    				//pind the message from API to vm.message
    				vm.message=data.message;	
    			})
    	}
    
});

/*    
    // get the user data for the user you want to edit
    // $routeParams is the way we grab data from the URL
    User.get($routeParams.user_id)
        .success(function(data) {
            vm.userData = data;
        });

    // function to save the user
    vm.saveUser = function() {
        vm.message = '';

        // all the userService function to update
        User.update($routeParams.user_id, vm.userData)
            .success(function(data) {
                
                //clear the form
                vm.userData {};

                // bind the message from our API to vm.message
                vm.message = data.message;
            });
    };

*/


// ====
// ----
// userResetPWController
// ----
// This controller covers the password reset process.
// ====
    // ====
    // functions to handle the process of reseting a password.
    // ====
