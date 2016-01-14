(function(){
	"use strict";
	
	angular
		.module('mp.authors')
			.config(routeConfig);
	
	/** @ngInject */	
	function routeConfig($stateProvider) {
		$stateProvider
			.state('authors', {
                url: '/authors/:id',
                controller: 'AuthorsCtrl',
                templateUrl: 'app/components/authors/authors.tmpl.html'
            });
	}
})();