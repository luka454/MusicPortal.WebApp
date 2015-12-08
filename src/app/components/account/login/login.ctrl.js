(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('LoginCtrl', loginCtrl);
		
	/**@ngInject */
	function loginCtrl($scope, accountService, toastr){
		
		init();
		
		
		$scope.login = function(){
		
			
			/*if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
				return;
			}*/
			
			accountService.login($scope.loginModel).then(function(){
				alert("Login succesful.");
				init();	
			}, function(response){
				alert(response.message);
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