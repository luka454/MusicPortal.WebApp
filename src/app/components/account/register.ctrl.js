(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('RegisterCtrl', registerCtrl);
		
	/**@ngInject */
	function registerCtrl($scope, accountService){
		
		init();
		
		$scope.register = function(){
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