(function(){
	"use strict";
	
	angular
		.module('mp.account')
			.config(routeConfig);
	
	/** @ngInject */	
	function routeConfig($stateProvider) {
		$stateProvider
			.state('register', {
				url: '/register',
				templateUrl: 'app/components/account/register.tmpl.html',
				controller: 'RegisterCtrl'
			});
	}
})()