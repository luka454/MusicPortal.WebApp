(function(){
	"use strict";
	
	angular
		.module('mp.playlists')
		.controller('PlaylistsCtrl', playlistsCtrl);
		
		/** @ngInject */
		function playlistsCtrl($scope, $state, playlistService, accountService, PlayerService, toastr){
			
            $scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            }
             
            $scope.go = function(state, params){
                $state.go(state, params)
            };
            
            if($scope.isLoggedIn()){
                $scope.playlists = []
                
                playlistService.getPlaylists(true).then(function (response){
                    angular.copy(response.data, $scope.playlists);
                }, function (response){
                    toastr.error(response.statusText, "Error");
                });
                
                $scope.playPlaylist = function(index){
                    if(!$scope.playlists[index] || $scope.playlists[index].songs.length === 0)
                        return;
                    
                    PlayerService.setPlaylist($scope.playlists[index].songs);
                }
            }
		}
})();