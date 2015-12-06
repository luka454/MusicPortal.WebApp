(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.service('accountService', accountService);
		
	/** @ngInject */
	function accountService($http){
		return {
			/**
			 * @param data.username
			 * @param data.password
			 * @param data.passwordRepeated
			 * @param data.email
			 */
			register : function(data){
				return $http.post('http://localhost:8080/user', data);
			}
		};
	}
})();