(function(){
	"use strict";
	
	angular
		.module('mp.songs')
			.config(routeConfig);
	
	/** @ngInject */	
	function routeConfig($stateProvider) {
		$stateProvider
			.state('songs', {
                url: '/songs',
                abstract: true,
                templateUrl: 'app/components/songs/songs.tmpl.html'
            })
			.state('songs.add', {
                url: '/add',
                templateUrl: 'app/components/songs/songs.add.tmpl.html',
                controller: 'AddSongCtrl'
            });
	}
})();