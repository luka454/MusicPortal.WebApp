(function(){
    "use strict"
    
    angular
        .module('mp.songs')
        .service('songService', songsService);
        
    /** @ngInject */
    function songsService($http, $q, serverName){
        
        this.searchByQuery = function(songname){
            return  $http.get(serverName + "/api/song/searchByQuery?searchQuery=" + songname)
        }
        
        this.heart = function(songid){
            
        }
        
        this.unheart = function(songid){
            
        }
    }
})();