
(function(){
	"use strict";
	
	angular
		.module('mp')
		.controller('HomeCtrl', homeCtrl);
		
		/** @ngInject */
		function homeCtrl($scope, PlayerService, accountService, $state, songService, toastr){
			
			$scope.songs = [];

            $scope.search = { 
                searchStr : ""
            }
            
    		$scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
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
                
                songService.searchByQuery($scope.search.searchStr).then(function(response){
                    angular.copy(response.data, $scope.songs);
                    
                }, function(response){
                    toastr.error(response.data.MessageDetail,"Error while serching.");
                });   
            }
            
			PlayerService.setPlaylist($scope.songs);
			PlayerService.stop();

		}
})();