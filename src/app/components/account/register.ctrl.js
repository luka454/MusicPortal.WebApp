(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('RegisterCtrl', registerCtrl);
		
	/**@ngInject */
	function registerCtrl($scope, accountService, toastr){
		
		init();
		
		/*$scope.rForm.passwordRepeated.$validators.confirm = function(modelValue, viewValue){
			return angular.equals(modelValue, $scope.newUser.password);
		}*/
		
		$scope.register = function(){
			
			/*if(!angular.equals($scope.passwordRepeated, $scope.password)){
				$scope.rForm.passwordRepeated.$setValidity('confirm', true);
			} else {
				$scope.rForm.passwordRepeated.$setValidity('confirm', false);
			} */
			
			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
				return;
			}
			
			accountService.register($scope.newUser).then(function(){
				alert("Registration succesful.");
				init();	
			}, function(response){
				alert(response.message);
			});
			
		};
		
		
		function init(){
			$scope.newUser = {
				username : "",
				password : "",
				passwordRepeated : "",
				email : ""
			};
		}
	}
	
})();