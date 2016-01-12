(function() {
  'use strict';

  angular
    .module('mp.songs')
    .directive('songItem', acmeNavbar);

  /** @ngInject 
   * @author Luka
   */
  function acmeNavbar() {
    var directive = {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/components/songs/song-item.tmpl.html',
      scope: { 
          song : '='
      },
      controller: ['$scope', 'songService', 'PlayerService', 
                    'playlistService', 'toastr','songDirective']
    };

    return directive;

    /** @ngInject */
    function songDirective($scope, songService, PlayerService, playlistService, toastr) {
        $scope.heartToggle = function($event){
            //TODO call songService
            if(!$scope.song.hearted){
                songService.heart($scope.song.id);
            } else {
                songService.unheart($scope.song.id);
            }
            $scope.song.hearted = !$scope.song.hearted; 
            
            $event.stopPropagation();
        };
        
        $scope.play = function($event){
            PlayerService.playOne($scope.song);
            
        };
        
        $scope.currentPlay = function(){
            return PlayerService.getCurrentSong().id == $scope.song.id;
        };
        
        $scope.addToPlaylist = function(){
            playlistService.openSelectPlaylist().result.then(function(data){
                playlistService.addSongToPlaylist(data.id, $scope.song.id).then(function(){
                    toastr.success("Successfully added song to playlist.");
                }, function(response){
                    toastr.error(response.data.Message,"Failed to add song to playlist.");
                });
            });
        };
        
        $scope.addEvent = function($event){
            $scope.addToPlaylist();
            $event.stopPropagation();
        };
    }
  }

})();
