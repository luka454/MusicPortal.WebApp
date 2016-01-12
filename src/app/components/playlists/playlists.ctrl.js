(function(){
	"use strict";
	
	angular
		.module('mp.playlists')
		.controller('PlaylistsCtrl', playlistsCtrl);
		
		/** @ngInject */
		function playlistsCtrl($scope, $state, playlistService, accountService, PlayerService, toastr){
			
            $scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            };
             
            $scope.go = function(state, params){
                $state.go(state, params);
            };
            
            if($scope.isLoggedIn()){
                $scope.playlists = [];
                
                playlistService.getPlaylists(true).then(function (response){
                    angular.copy(response.data, $scope.playlists);
                }, function (response){
                    toastr.error(response.statusText, "Error");
                });
                
                $scope.playPlaylist = function(index){
                    if(!$scope.playlists[index] || $scope.playlists[index].songs.length === 0){
                        return;
                    }
                    
                    PlayerService.setPlaylist($scope.playlists[index].songs);
                };
                
                $scope.newPlaylist = { title: "", locked : false };
                
                $scope.addKey = function(keyEvent) {
                    
                    if (keyEvent.which === 13){
                        $scope.add();    
                    }
                };
                
                $scope.add = function(){
                    if(!$scope.newPlaylist.title){
                        return;
                    }
                    
                    if($scope.newPlaylist.locked){
                        toastr.error("There is already request for new playlist!");
                        return;
                    }
                    
                    $scope.newPlaylist.locked = true;
                    
                    playlistService.makeNew($scope.newPlaylist.title).then(function(response){
                        $scope.playlists.splice(0, 0, angular.copy(response.data));
                        
                        $scope.newPlaylist.locked = false;
                        $scope.newPlaylist.title = "";
                        toastr.success("Playlist successfully added.");
                    }, function(response){
                        toastr.error(response.data.MessageDetail,"Error while adding new playlist.");
                        
                        $scope.newPlaylist.locked = false;
                    });   
                };
            }
		}
})();