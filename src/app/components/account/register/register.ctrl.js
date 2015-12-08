(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('RegisterCtrl', registerCtrl);
		
	/**@ngInject */
	function registerCtrl($scope, accountService, toastr, $state, $timeout){
		
		init();
		
		$scope.errors = [];
		
		$scope.register = function(){
			
			angular.copy([], $scope.errors);
				
			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' );
				$scope.rForm.username.$setTouched();
				$scope.rForm.email.$setTouched();
				$scope.rForm.password.$setTouched();
				$scope.rForm.confirmPassword.$setTouched();
				
				return;
			}
			
			accountService.register($scope.newUser).then(function(){
				toastr.success("Succesful registration.");
				
				$timeout(function(){
					$state.go('login');
				}, 1500);
				
			}, function(response){
				
				if(response.data.ModelState[""]){
					angular.copy(response.data.ModelState[""], $scope.errors);
					toastr.error("Registratioin error");
				}
				else 
					toastr.error(response.statusText, "Registratioin error");
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