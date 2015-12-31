(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.service('accountService', accountService);
		
	/** @ngInject */
	function accountService($http, localStorageService, serverName, $q){
			
		var currentUser = { username: null, token: null, isLoggedIn: false };
  

        this.login = function (loginModel) {

            var deferred = $q.defer();

            $http({
                url: serverName + '/Token',
                method: "POST",
                data: 'grant_type=password&username=' + loginModel.username + '&password=' + loginModel.password
            }).then(function (response) {
                var data = { token: response.data.access_token, username: response.data.userName};
                localStorageService.set('authorizationData', data);
                setCurrentUser(data);
                deferred.resolve(currentUser);
            }, 
            function (response) {
                localStorageService.set('authorizationData', { token: null, username: null });
                currentUser.IsLoggedIn = false;
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.logout = function () {
            localStorageService.set('authorizationData', { token: null, username: null });
            currentUser.username = null;
            currentUser.IsLoggedIn = false;
        };
        this.register = function (registerModel) { 
            var deferred = $q.defer();

            $http({
                url: serverName + '/api/Account/Register',
                method: "POST",
                data: registerModel
            }).then(function (response) {
                 deferred.resolve(response);
            },
            function (response) {
                localStorageService.set('authorizationData', { token: null, username: null });
                currentUser.IsLoggedIn = false;
                deferred.reject(response);
            });

            return deferred.promise;
        };
        this.getCurrentUser = function () {
            var data = localStorageService.get('authorizationData');
            
            if (data)
            {
                setCurrentUser(data);
            } else{
                setCurrentUser({token:null, username:null});   
            }
            return currentUser;
        };
        this.isLoggedIn = function(){
            var c_user = this.getCurrentUser();
            
            return !!c_user && !!c_user.token         
        }
        var setCurrentUser = function (loginModel) {
            currentUser.token = loginModel.token
            currentUser.username = loginModel.username;
        }
    }
})();