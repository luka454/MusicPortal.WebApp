(function(){
	"use strict";
	
	angular
		.module('mp.account')
		.service('accountService', ['$http', 'localStorageService', 'serverName', accountService]);
		
	/** @ngInject */
	function accountService($http, localStorageService, serverName){
			
		var currentUser = { username: "", email: "", password: "", id: "", IsLoggedIn: false };
  

        this.Login = function (loginModel) {

            var deferred = $q.defer();

            $http({
                url: 'http://' + serverName + '/Token',
                method: "POST",
                data: 'grant_type=password&username=' + loginModel.username + '&password=' + loginModel.password
            }).then(function (response) {
                localStorageService.set('authorizationData', { token: response.data.access_token, username: response.data.userName, email: response.data.email, id: response.data.id});
                setCurrentUser(response.data);
                deferred.resolve(currentUser);
            }, 
            function (response) {
                localStorageService.set('authorizationData', { token: "", username: "" });
                currentUser.IsLoggedIn = false;
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.Logout = function () {
            localStorageService.set('authorizationData', { token: "", username: "" });
            currentUser.IsLoggedIn = false;
        };
        this.Register = function (registerModel) { 
            var deferred = $q.defer();

            $http({
                url: 'http://' + serverName + '/api/Account/Register',
                method: "POST",
                data: 'email=' + registerModel.email + '&password=' + registerModel.password + '&confirmPassword=' + registerModel.confirmPassword
            }).then(function (response) {
                 deferred.resolve(response);
            },
            function (response) {
                localStorageService.set('authorizationData', { token: "", username: "" });
                currentUser.IsLoggedIn = false;
                deferred.reject(response);
            });

            return deferred.promise;
        };
        this.getCurrentUser = function () {
            var data = localStorageService.get('authorizationData');
            if (currentUser.Id == "" && data.token != "")
            {
                setCurrentUser(data);
            }
            return currentUser;
        };
        var setCurrentUser = function (loginModel) {
            currentUser.Username = loginModel.userName;
            currentUser.Email = loginModel.email;
            currentUser.Id = loginModel.id;
            currentUser.IsLoggedIn = true;
        }
    }]);
		};
	}
})();