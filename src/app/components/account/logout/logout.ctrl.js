(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.controller('LogoutCtrl', loginCtrl);
		
	/**@ngInject */
	function loginCtrl($scope, accountService, toastr, $state, $timeout){
		
			
        accountService.logout();
            
        toastr.success("Log out succesful.");
        
        $timeout(function(){
            $state.go('home');
        }, 1500);
		
	}
	
})();