(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('RegisterCtrl', registerCtrl);
		
	/**@ngInject */
	function registerCtrl($scope, accountService, toastr, $state, $timeout){
		
		init();
		
		$scope.register = function(){
			
			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' );
				return;
			}
			
			accountService.register($scope.newUser).then(function(){
				toastr.succesful("Succesful registration.");
				
				$timeout(function(){
					$state.go('login');
				}, 1500);
				
			}, function(response){
				toastr.error(response.message, "Registratioin error");
			});
			
		};
		
		
		function init(){
			$scope.newUser = {
				username : "",
				password : "",
				confirmPassword : "",
				email : ""
			};
		}
	}
	
})();