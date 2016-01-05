(function(){
    "use strict";
    
    angular
        .module('mp.playlists')
        .service('playlistService', playlistsService);
        
    /** @ngInject */
    function playlistsService($http, $q, serverName){
        
        this.getPlaylists = function(full){ //if full is true it will get playlists with songs
            if(full){
                return $http.get(serverName + "/api/playlists/full");
            } else {
                return $http.get(serverName + "/api/playlists");
            }
        }
    }
})();