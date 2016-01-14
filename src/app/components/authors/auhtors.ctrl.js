
(function(){
	"use strict";
	
	angular
		.module('mp.authors')
		.controller('AuthorsCtrl', homeCtrl);
		
		/** @ngInject */
		function homeCtrl($scope, $http, serverName,$stateParams, PlayerService, accountService, $state, toastr){
			
			
            $scope.author = {
                notloaded : true
            }
            
            var req = $http.get(serverName + "/api/authors/"+ $stateParams.id);
            
            req.then(
                function(response){
                    angular.copy(response.data, $scope.author);
                }, function(response){
                    
                    toastr.error(response.Message);
                    angular.copy({notfound:true}, $scope.author);
                }
            );
            
    		$scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            };
            
            $scope.go = function(state, params){
                $state.go(state, params)
            };
            
            $scope.playAll = function(){
                PlayerService.setPlaylist($scope.author.songs);
            }
		}
})();