// start our angular module and inject userServices
angular.module('userCtrl', ['userService', 'ui.bootstrap.showErrors', 'authService'])


// ====
// ----
// userController
// ----
// This controller provides the functionality of the user's profile page.
// ====
.controller('userController', function($routeParams, User) {

    var vm = this;

    vm.processing = true;

    if($routeParams == null){
        vm.id = "null";
    } else {
        vm.id = $routeParams.user_id;        
    }

    // ====
    // function to populate the page with the user's information.
    // ====
    User.get(vm.id)
        .success(function(data){
            vm.userData= data;

        });

})


.controller('userDeleteController', function($routeParams, User, Auth, Booking) {

    var vm = this;

    vm.deleted = false;


    User.get($routeParams.user_id)
        .success(function(data){
            vm.username = data.username;
            vm.userID = data._id;
        });

	
    // function to delete a user
    vm.deleteUser = function() {

        //first delete all bookings created by user to be deleted
        Booking.deleteAll(vm.userID)
            .success(function(){

                //then delete the user
                User.delete($routeParams.user_id)
                    .success(function(data){
                        vm.deleted = true;
                    });
            });
    };
})


.directive('showErrors', function() {
    return {
          restrict: 'A',
          require: '^form',
          link: function (scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl   = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box
            var inputName = inputNgEl.attr('name');
            
            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function() {
              el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });
            
            scope.$watch(function() {
              return scope.showErrorsCheckValidity;
            }, function(newVal, oldVal) {
              if (!newVal) { return; }
              el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });
          }
        }
})

// ====
// ----
// userCreateController
// ----
// This controller covers the registration process.
// ====
.controller('userCreateController', function($scope, User, Auth) {

     var vm = this;

    // variable to hide/show elements of the view
    // differentiates between create or edit pages
     vm.type = 'create';
     vm.complete = false;
     vm.invalidUserName = false;

    Auth.getUser()
        .then(function(data) {
            vm.isAdmin = data.data.isAdmin;
        });

    // ====
    // function to create a user
    // ====
    vm.saveUser = function() {
        vm.processing = true;
        vm.message = '';

        vm.showErrorsCheckValidity = true;

        // if the input is not valid, do not save the user
        // FOR SOME REASON $valid CAUSES ERRORS
        // if(vm.userForm.$valid){

            // use the create function in the userService
            User.create(vm.userData)
                .success(function(data) {
                    vm.processing = false;
                    vm.message = data.message;
                    if(data.success == true){
                        vm.complete = true;
                        vm.userData = {};
                    }
                    else{
                        vm.complete = false;
                        vm.invalidUserName = true;
                    }
                });
        //}
        //else {
        //     alert("There are invalid fields");
        //}
            
    };  

})
    

// ====
// ----
// userEditController
// ----
// This controller cover the edit user info process. See pages 196-200
// ====
.controller('userEditController', function($routeParams, User, Auth) {
    
    var vm = this;

    // variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'edit';
    vm.complete = false;
    vm.id = $routeParams.user_id;

    User.get($routeParams.user_id)
    	.success(function(data){
    		vm.userData= data;

    	});

	Auth.getUser()
            .then(function(data) {
                vm.isAdmin = data.data.isAdmin;
            });

	// function to save the user
	vm.saveUser = function(){
		vm.processing=true;
		vm.message='';

		//call the userService function to update
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing= false;
                vm.complete = true;
				//clear the form
				vm.userData= {};


				//bind the message from API to vm.message
				vm.message=data.message;	
			});
	};
    
});
