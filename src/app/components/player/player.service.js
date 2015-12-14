/* global angular */
(function(){
	"use strict"
	
	angular
		.module("mp.player")
		.service("PlayerService", playerService);
		
	/** @ngInject */
	function playerService(SoundManager, $log, $rootScope){
		
		var _self = this;
		//dohvatiti stream s soundclouda: http://api.soundcloud.com/tracks/236859400/stream?client_id=f4a709cdf488dc78cf418eb25711c8fa
		var playing = false;
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
		}
		
		this.setPlaylist = function setPlaylist(newPlaylist){
			_self.stop();
			clearBuffer();
			
			angular.copy(newPlaylist, playlist);
			
			var first = true;
		
			for(var i = 0; i < playlist.length; i++){
				if(!playlist[i]) //skip if element doesn't exist
					continue;
				
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
					playing = true;
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
		}
		
		this.getCurrentSong = function getCurrentSong(){
			return currentSong;
		}
		
		this.getCurrentSongIndex = function (){
			return _smCurrentSound;
		}
		
		this.getPlaylist = function getPlaylist(){
			return playlist;
		}
		
		this.resume = function resume(){
			
			if(_smCurrentSound < 0){
				$log.err("There is no current song to resume.");
				return;
			}
			
			_smSoundBuffer[_smCurrentSound].resume();
			playing = true;
		}
		
		this.pause = function pause(){
			
			if(_smCurrentSound < 0){
				$log.err("There is no current song to pause.");
				return;
			}
			
			_smSoundBuffer[_smCurrentSound].pause();
			playing = false;
		}
		
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
				_self.resume();
				return;
			} 
			
			_self.stop();
			
			_smCurrentSound = index;
			_smSoundBuffer[_smCurrentSound].play();
			
			angular.copy(playlist[index], currentSong);
			
			playing = true;
		}
		
		/**
		 * @description It stop playing music
		 * */
		this.stop = function stop(){
			if(_smCurrentSound >= 0) //There is current song. (if it's -1 that means that there isn't current song)
				_smSoundBuffer[_smCurrentSound].stop();
			playing = false;
		}
		
		/**
		 * @description Depending on 'loop' 
		 * */
		var finishedClb = function(){
			
			if(loop == "song"){
				_smSoundBuffer[_smCurrentSound].play();
				return;
			}
			
			
			var next = null;
			
			playing = false;
			
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
			
			
		}
		
	}
})();