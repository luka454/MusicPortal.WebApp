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
      templateUrl: '/app/components/player/player.tmpl.html',
      scope: { },
      controller: PlayerCtrl
    };

    return directive;

    /** @ngInject */
    function PlayerCtrl($scope, PlayerService) {
    
        $scope.songs = PlayerService.getPlaylist();
        $scope.currentSong = PlayerService.getCurrentSong();
        
        $scope.expanded = false;
        
        $scope.toggleExpand = function(){
            $scope.expanded = !$scope.expanded;
        }
        
        $scope.isPlaying = function (index){
            return PlayerService.getCurrentSongIndex() == index;
        }
        
        $scope.play = function (index){
            PlayerService.play(index);
        }
    }
  }

})();
