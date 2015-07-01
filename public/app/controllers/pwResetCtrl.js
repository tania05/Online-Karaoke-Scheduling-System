// ====
// Email for the site: PurpleFoxPassReset@gmail.com
// Password for email: Seng2993
// ----
// pwResetController
// ----
// This controller handles the process of reseting a password.
// ====

angular.module('pwResetCtrl', ['userService'])

.controller('pwResetForgotController', function(User) {

		var vm = this;
   
		vm.sendToken = function() {
			
			vm.err = '';
			vm.success = '';
			vm.processing = true;

			User.createToken(vm.userData)
						.success(function(data) {
                vm.processing = false;

                if (data.success)
									vm.success = data.message;
								else
									vm.err = data.message;
                
            });
            
    };


})

.controller('pwResetController', function(User) {
		var vm = this;
		
		vm.err = '';
		vm.success = false;

		User.get($routeParams.token)
    	.success(function(data){
    		if (data.success)
					vm.success = true;
				else
					vm.err = data.message; 
    	});
})
