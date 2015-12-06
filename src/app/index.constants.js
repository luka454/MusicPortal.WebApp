/* global toastr:false, moment:false */
(function () {
  'use strict';
  
  //3rd party projects added to Angular... nice idea ;)
   
  angular
    .module('mp')
    .constant('toastr', toastr)
    .constant('moment', moment);
    
})();
