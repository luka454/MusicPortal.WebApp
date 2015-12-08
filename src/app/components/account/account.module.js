(function(){
	"use strict";
	
	angular
		.module('mp.account',  ['LocalStorageModule', 'mp.urls'])
		.constant('toastr', toastr);
})();