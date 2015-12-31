(function(){
	"use strict";
	
	angular
		.module('mp.account')
			.config(routeConfig);
	
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
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            });
	   	$httpProvider.interceptors.push('authInterceptor');
      	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

	}
})()