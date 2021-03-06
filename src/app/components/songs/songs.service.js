(function(){
    "use strict";
    
    angular
        .module('mp.songs')
        .service('songService', songsService);
        
    /** @ngInject */
    function songsService($http, $q, serverName){
        
        this.searchByQuery = function(songname){
            return  $http.get(serverName + "/api/song/search?query=" + songname);
        };
        
        this.heart = function(songid){
            return $http.post(serverName + "/api/song/" + songid + "/heart");
        };
        
        this.unheart = function(songid){
            return $http.post(serverName + "/api/song/" + songid + "/unheart");
        };
        
        this.getFlow = function(){
            return  $http.get(serverName + "/api/ai/flow");
        }
        
        this.noticePlay = function(songid){
            return $http.get(serverName + "/api/song/" + songid + "/play");
        }
    }
})();