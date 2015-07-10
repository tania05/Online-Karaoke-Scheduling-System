// ====
// Email: purplefoxcontact@gmail.com
// Pass: Seng2993
// contactController
// ----
// This controller handles the contact form.
// ====
    // ====
    // function to handle the submition of the contact form.
    // ====

angular.module('contactCtrl', ['userService'])

	.controller('contactController', function(User) {

		var vm = this;

		vm.sendMail = function() {
			vm.message = '';
			vm.processing = true;

			User.contact(vm.userData)
				.success(function(data) {
                	vm.processing = false;
					vm.message = data.message;
					vm.userData = '';				

            });
            
    };

});
