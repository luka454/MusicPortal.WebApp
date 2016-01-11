(function(){
	"use strict";
	
	angular
		.module('mp.playlists')
		.controller('SelectPlyModalCtrl', playlistsCtrl);
		
		/** @ngInject */
		function playlistsCtrl($scope, $state, playlistService, $modalInstance){
			$scope.playlists = [];
            
            playlistService.getPlaylists().then(function(response){
                angular.copy(response.data, $scope.playlists);
            });
            
            $scope.selectPlaylist = function(index){
                $modalInstance.close($scope.playlists[index]);
            }
            
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
		}
})();