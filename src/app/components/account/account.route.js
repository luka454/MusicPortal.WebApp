(function(){
	"use strict";
	
	angular
		.module('mp.account')
			.config(['$stateProvider', '$httpProvider', routeConfig]);
	
	/** @ngInject */	
	function routeConfig($stateProvider, $httpProvider) {
		$stateProvider
			.state('login', {
                        url: '/login',
                        controller: 'LoginCtrl',
                        templateUrl: 'app/components/account/login/login.tmpl.html'
                    })
			.state('register', {
				url: '/register',
				templateUrl: 'app/components/account/register/register.tmpl.html',
				controller: 'RegisterCtrl'
			})
			.state('login', {
				url: '/login', 
				templateUrl: 'app/components/account/login.tmpl.html',
				controller: 'LoginCtrl'
			});
	   	$httpProvider.interceptors.push('authInterceptor');
      	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

	}
})()