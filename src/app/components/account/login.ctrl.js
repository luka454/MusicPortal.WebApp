(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('LoginCtrl', loginCtrl);
		
	/**@ngInject */
	function loginCtrl($scope, accountService, toastr){
		
		init();
		
		$scope.login = function(){
			
			
			if($scope.rForm.$invalid){
				toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
				return;
			}
			
			//TODO: connect with account service
			toastr.success("Congratulation ;) Now implement real login", "Successful login");
		};
		
		
		function init(){
			$scope.loginVM = {
				username : "",
				password : ""
			};
		}
	}
	
})();