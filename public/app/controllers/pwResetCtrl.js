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
    vm.message = 'Password reset link sent!';

		vm.sendToken = function() {
			
			User.createToken(vm.userData)
						.success(function(data) {
                vm.processing = false;
                vm.userData = {};
                vm.message = data.message;
            });
            
    };


})
