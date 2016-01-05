(function(){
	"use strict";
	
	angular
		.module('mp.playlists')
			.config(routeConfig);
	
	/** @ngInject */	
	function routeConfig($stateProvider) {
		$stateProvider
			.state('playlists', {
                url: '/playlists',
                templateUrl: 'app/components/playlists/playlists.tmpl.html', 
                controller: 'PlaylistsCtrl'
            });
	}
})();