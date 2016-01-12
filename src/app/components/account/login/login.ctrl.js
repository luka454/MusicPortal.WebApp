(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('LoginCtrl', loginCtrl);
		
	/**@ngInject */
	function loginCtrl($scope, accountService, toastr, $state, $timeout){
		
		init();
		
		
		$scope.login = function(){
		
			
			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
				$scope.rForm.username.$setTouched();
				$scope.rForm.password.$setTouched();
				return;
			};
			
			accountService.login($scope.loginModel).then(function(){
				
				toastr.success("Login succesful.");
				
				$timeout(function(){
					$state.go('home');
				}, 1500);
			}, function(response){
				
				if(response.data.error_description)
					toastr.error(response.data.error_description, 'Login failed.');
				else
					toastr.error('Login failed.');
				
			});
			
		};
		
		
		function init(){
			$scope.loginModel = {
				username : "",
				password : ""
			};
		}
		
	}
	
})();