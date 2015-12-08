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
      templateUrl: '/app/components/navbar/navbar.tmpl.html',
      scope: { },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, moment) {
      $scope.links = [
       { title:'Home', state:'home'},
       { title: 'Register', state:'register'},
       { title: 'Login', state:'login'}
      ];
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
