
(function(){
	"use strict";
	
	angular
		.module('mp')
		.controller('HomeCtrl', homeCtrl);
		
		/** @ngInject */
		function homeCtrl($scope, PlayerService){
			
			$scope.songs = [
				{
					title : "Zemlja",
					author : "Ekatarina Velika",
					link : "/assets/01_Ekatarina_Velika_-_Zemlja.mp3"
				},
				{
					title : "Voda",
					author : "Ekatarina Velika",
					link : "/assets/05 Ekatarina Velika - Voda.mp3"
				},
				{
					title : "Prvi i posljednji dan",
					author : "Ekatarina Velika",
					link : "/assets/06 Ekatarina Velika - Prvi I Poslednji Dan.mp3"
				},
				{
					title : "Ljudi iz gradova",
					author : "Ekatarina Velika",
					link : "/assets/07 Ekatarina Velika - Ljudi Iz Gradova.mp3"
				}
			];
			
			PlayerService.setPlaylist($scope.songs);
			PlayerService.play(2);
		}
})();