// start our angular module and inject userServices
angular.module('userCtrl', ['userService'])


// ====
// ----
// userController
// ----
// This controller provides the functionality of the user's profile page.
// ====
.controller('userController', function($routeParams, User) {

    var vm = this;

    vm.processing = true;


    // ====
    // function to populate the page with the user's information.
    // ====
    User.get($routeParams.user_id)
        .success(function(data){
            vm.userData= data;

        });

})


.controller('userDeleteController', function($routeParams, User) {

    var vm = this;

    vm.deleted = false;
	
    // function to delete a user
    vm.deleteUser = function() {
        User.delete($routeParams.user_id)
            .success(function(data){
                vm.deleted = true;
            });
    };
})




// ====
// ----
// userCreateController
// ----
// This controller covers the registration process.
// ====
.controller('userCreateController', function(User) {

     var vm = this;

    // variable to hide/show elements of the view
    // differentiates between create or edit pages
     vm.type = 'create';


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
.controller('userEditController', function($routeParams, User) {
    
    var vm = this;

    // variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'edit';

    User.get($routeParams.user_id)
    	.success(function(data){
    		vm.userData= data;

    	});


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


				//bind the message from API to vm.message
				vm.message=data.message;	
			});
	};
    
});
