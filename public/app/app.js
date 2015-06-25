angular.module('karaokeApp', ['routerRoutes'])

// create the controller and inject Angular's 
// this will be the controller for the ENTIRE site
.controller('mainController', function() {

	var vm = this;

	var url = window.location.pathname;
    	// create a bigMessage variable to display in our view
    	vm.message = "Print Message";

})



// WILL EVENTUALLY SPLIT INTO SEPARATE CONTROLLERS



// home page specific controller
.controller('homeController', function() {

	var vm = this;

	vm.message = 'This is the home page!';
});