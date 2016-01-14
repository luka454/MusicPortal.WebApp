(function(){
    "use strict";
    
    angular
        .module('mp.playlists')
        .service('playlistService', playlistsService);
        
    /** @ngInject */
    function playlistsService($http, $q, $modal, serverName){
        
        this.getPlaylists = function(full){ //if full is true it will get playlists with songs
            if(full){
                return $http.get(serverName + "/api/playlists/full");
            } else {
                return $http.get(serverName + "/api/playlists");
            }
        };
        
        this.makeNew = function(playlistName){
            return $http.post(serverName + "/api/playlists/add", {title:playlistName});
        };
        
        this.openSelectPlaylist = function(){
            var modalInstance = $modal.open({
                templateUrl: 'app/components/playlists/selectPlyModal.tmpl.html',
                controller: 'SelectPlyModalCtrl',
                size:'lg'
            });
            
            return modalInstance;
        };
        
        this.addSongToPlaylist = function(playlistId, songId){
            return $http.post(serverName + "/api/playlists/song", 
                {
                    playlist_id : playlistId,
                    song_id : songId
                });
        };
        
        this.deletePlaylist = function(playlistId){
            return $http.get(serverName + "/api/playlists/" + playlistId + "/delete");
        }
    }
})();