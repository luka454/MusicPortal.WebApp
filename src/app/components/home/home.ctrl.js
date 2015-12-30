
(function(){
	"use strict";
	
	angular
		.module('mp')
		.controller('HomeCtrl', homeCtrl);
		
		/** @ngInject */
		function homeCtrl($scope, PlayerService, accountService, $state, songService){
			
			$scope.songs = [
				{
					title : "Zemlja",
					author : "Ekatarina Velika",
					link : "/assets/01_Ekatarina_Velika_-_Zemlja.mp3",
                    hearted: false
				},
				{
					title : "Voda",
					author : "Ekatarina Velika",
					link : "/assets/05 Ekatarina Velika - Voda.mp3",
                    hearted: false
				},
				{
					title : "Prvi i posljednji dan",
					author : "Ekatarina Velika",
					link : "/assets/06 Ekatarina Velika - Prvi I Poslednji Dan.mp3",
                    hearted: true
				},
				{
					title : "Ljudi iz gradova",
					author : "Ekatarina Velika",
					link : "/assets/07 Ekatarina Velika - Ljudi Iz Gradova.mp3",
                    hearted: false
				}
			];

            $scope.search = { 
                searchStr : ""
            }
            
    		$scope.isLoggedIn = function(){
                return accountService.getCurrentUser().isLoggedIn;
            }
            
            $scope.go = function(state, params){
                $state.go(state, params)
            }
            
            $scope.searchKey = function(keyEvent) {
                
                if (keyEvent.which === 13){
                    $scope.search();    
                }
            }
            
            $scope.search = function(){
                
                songService.searchByQuery($scope.search.searchStr).then(function(data){
                    alert('frc');
                }, function(data){
                    alert('nesto');
                });   
            }
            
			PlayerService.setPlaylist($scope.songs);
			PlayerService.stop();

		}
})();