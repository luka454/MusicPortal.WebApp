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
      templateUrl: '/app/components/songs/song-item.tmpl.html',
      scope: { 
          song : '='
      },
      controller: songDirective
    };

    return directive;

    /** @ngInject */
    function songDirective($scope, songService) {
        $scope.heartToggle = function(){
            //TODO call songService
            if(!$scope.song.hearted){
                songService.heart($scope.song.id);
            } else {
                songService.unheart($scope.song.id);
            }
            $scope.song.hearted = !$scope.song.hearted; 
            
        }
    }
  }

})();
