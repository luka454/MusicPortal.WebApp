(function() {
  'use strict';

  angular
    .module('mp')
    .directive('mpPlayer', sidebar);

  /** @ngInject 
   * @author Luka
   */
  function sidebar() {
    var directive = {
      //replace: true,
      restrict: 'E',
      templateUrl: 'app/components/player/player.tmpl.html',
      scope: { },
      controller: ['$scope', 'PlayerService',PlayerCtrl]
    };

    return directive;

    /** @ngInject */
    function PlayerCtrl($scope, PlayerService) {
    
        $scope.songs = PlayerService.getPlaylist();
        $scope.currentSong = PlayerService.getCurrentSong();
        
        $scope.expanded = false;
        
        $scope.toggleExpand = function(){
            $scope.expanded = !$scope.expanded;
        };
        
        $scope.isPlaying = function (index){
            return PlayerService.getCurrentSongIndex() == index;
        };
        
        $scope.play = function (index){
            PlayerService.play(index);
        };
        
        $scope.resume = function(){
            PlayerService.resume();
        };
        
        $scope.pause = function(){
            PlayerService.pause();
        };
        
        $scope.status = function(){
            return PlayerService.getPlayingStatus();
        };
        
        $scope.next = function(){
            PlayerService.next();
        };
        
        $scope.previous = function(){
            PlayerService.previous();
        };
    }
  }

})();
