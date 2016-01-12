/* global angular */
(function(){
	"use strict";
	
	angular
		.module("mp.player")
		.service("PlayerService", playerService);
		
	/** @ngInject */
	function playerService(SoundManager, $log, $rootScope){
		
		var _self = this;
		//dohvatiti stream s soundclouda: http://api.soundcloud.com/tracks/236859400/stream?client_id=f4a709cdf488dc78cf418eb25711c8fa
		var playingStatus = "stoped";
		var loop = "all";
		var currentSong = { emptyObject : true };
		var playlist = [];
		
		var _smSoundBuffer = [];
		var _smCurrentSound = -1;
		
		var clearBuffer = function clearBuffer(){
			angular.forEach(_smSoundBuffer, function(sound){
				console.log('destrojing sound: ' + sound.id);
				
				SoundManager.destroySound(sound.id);
			});
			angular.copy([], _smSoundBuffer);
			_smCurrentSound = -1;
		};
		
        this.playOne = function(song){
            for(var i = 0; i < playlist.length; i++){
            	if(!playlist[i]){ //skip if element doesn't exist
					continue;
                }
			
                if(playlist[i].id == song.id){
                    this.play(i);
                    return;
                }
            }
            
            
             
            playlist.splice(0, 0, song);
            this.setPlaylist(playlist); 
        };
        
		this.setPlaylist = function setPlaylist(newPlaylist){
			_self.stop();
			clearBuffer();
			
            if(playlist != newPlaylist){
			    angular.copy(newPlaylist, playlist);
            }
            
			var first = true;
			for(var i = 0; i < playlist.length; i++){
				if(!playlist[i]){ //skip if element doesn't exist
					continue;
                }
				
				if(first){ //play if it's first element
					_smSoundBuffer.push(SoundManager.createSound(
						{
							'id' : i,
							'url' : playlist[i].link,
							'autoLoad' : true,
							'autoPlay' : true,
							'onfinish': finishedClb
						}
					));
					
					_smCurrentSound = i;
					playingStatus = "playing";
					first = false;
					angular.copy(playlist[i], currentSong);
				} else {
					_smSoundBuffer.push(SoundManager.createSound(
						{
							'id' : i,
							'url' : playlist[i].link,
							'autoLoad' : true,
							'autoPlay' : false,
							'onfinish': finishedClb
						}
					));	
				}	
			}
		};
		
		this.getCurrentSong = function getCurrentSong(){
			return currentSong;
		};
		
		this.getCurrentSongIndex = function (){
			return _smCurrentSound;
		};
		
		this.getPlaylist = function getPlaylist(){
			return playlist;
		};
		
		this.getPlayingStatus = function(){
			return playingStatus;
		};
		
		this.resume = function resume(){
			
			if(_smCurrentSound < 0){
				$log.err("There is no current song to resume.");
				return;
			}
			
			_smSoundBuffer[_smCurrentSound].resume();
			playingStatus = "playing";
		};
		
		this.pause = function pause(){
			
			if(_smCurrentSound < 0){
				$log.err("There is no current song to pause.");
				return;
			}
			
			_smSoundBuffer[_smCurrentSound].pause();
			playingStatus = "paused";
		};
		
		/**
		 * @description It start playing music. 
		 * If you request to play song that is current song it will just resume it. 
		 * If not it will stop current song, start new and set new as current.
		 * !important call this within digest cicle or call $apply yourself
		 * */
		this.play = function play(index){
			
			if(!_smSoundBuffer[index]){
				throw Error("Invalid index");
			}
			
			if(_smCurrentSound == index){
				if(playingStatus == "playing"){ //do nothing if already playing
					return;
				} else if(playingStatus == "paused"){
					_self.resume();	
				} else { //playingStatus == "stoped"
					_smSoundBuffer[_smCurrentSound].play();
					playingStatus = "playing";
				}
				return;
			} 
			
			_self.stop();
			
			_smCurrentSound = index;
			_smSoundBuffer[_smCurrentSound].play();
			
			angular.copy(playlist[index], currentSong);
			
			playingStatus = "playing";
		};
		
		/**
		 * @description It stop playing music
		 * */
		this.stop = function stop(){
			if(_smCurrentSound >= 0){ //There is current song. (if it's -1 that means that there isn't current song)
				_smSoundBuffer[_smCurrentSound].stop();
            }
			playingStatus = "stoped";
		};
		
		this.next = function next(){
			var next = null;
			
			for(var i = _smCurrentSound + 1; i < _smSoundBuffer.length; i++){
				if(_smSoundBuffer[i]){
					next = i;
					break;
				}
			}
			
			if(next != null){ //there is next
				_self.play(next);
				return;
			}
			
			var first = null;
			for(var i = 0; i < _smSoundBuffer.length; i++){
				if(_smSoundBuffer[i]){
					first = i;
					break;
				}
			}
			
			if(first !== null){ //first song exists (list isn't empty)
				_self.play(first);	
			}
	
		};
		
		this.previous = function previous(){
			var prev = null;
			for(var i = _smCurrentSound - 1; i >= 0; i--){
				if(_smSoundBuffer[i]){
					prev = i;
					break;
				}
			}
			
			if(prev != null){ //there is previous song
				_self.play(prev);
				return;
			}
			
			var last = null;
			for(var i = _smSoundBuffer.length - 1; i > _smCurrentSound; i--){
				if(_smSoundBuffer[i]){
					last = i;
					break;
				}
			}
			
			if(last != null){
				_self.play(last); 
			}
		};
		/**
		 * @description Depending on 'loop' 
		 * */
		var finishedClb = function(){
			
			if(loop == "song"){
				_smSoundBuffer[_smCurrentSound].play();
				return;
			}
			
			
			var next = null;
			
			playingStatus = "stoped";
			
			for(var i = _smCurrentSound + 1; i < _smSoundBuffer.length; i++){
				if(_smSoundBuffer[i]){
					next = i;
					break;
				}
			}
			
			if(next === null){ //there is no next song
				
				if(loop === "all"){ //start from begining
					var first = null;
					for(var i = 0; i < _smSoundBuffer.length; i++){
						if(_smSoundBuffer[i]){
							first = i;
							break;
						}
					}
					
					if(first !== null){ //first song exists (list isn't empty)
						$rootScope.$apply(function(){
							_self.play(first);	
						});
					}
				} else {
					$rootScope.$apply(function(){
						angular.copy({emptyObject : true}, currentSong);	
					});
				}
			} else { //there is next song
				$rootScope.$apply(function(){
					_self.play(next);	
				});
			}
		};
		
	}
})();