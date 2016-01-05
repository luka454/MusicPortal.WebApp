(function() {
  'use strict';

  angular
    .module('mp')
    .directive('spNavbar', acmeNavbar);

    /** @ngInject 
     * @author Luka
     */
    function acmeNavbar() {
        var directive = {
            replace: true,
            restrict: 'E',
            templateUrl: '/app/components/util/navbar/navbar.tmpl.html',
            scope: { },
            controller: NavbarController
        };

        return directive;

        /** @ngInject */
        function NavbarController($scope, accountService) {
            $scope.links = [
                { title:'Home', state:'home'},
                { title:'Playlists', state: 'playlists'}
            ];

            $scope.isLoggedIn = function(){
                return accountService.isLoggedIn();
            }
            
            $scope.getUser = function(){
                return accountService.getCurrentUser().username;
            }
        }
    }

})();
