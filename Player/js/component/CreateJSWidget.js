define([
    'jquery',
    'nosleep',
	'createjs',
	'model/Constants',
    'component/AbstractComponent',
    'component/AudioPanel',
    'core/AudioManager',
    'util/MessageLogger'
], function ($, NoSleep, CreateJs, Constants, AbstractComponent, AudioPanel, AudioManager, Logger) {

    function CreateJSWidget() {
        //console.log('CreateJSWidget.CONSTRUCTOR() | '+Constants);
        AbstractComponent.call(this);

        // define the class properties
		this.oCreateJS;
		this.stage;
		this.canvas;
		this.oNoSleep = new NoSleep();
		this.bWakeLockEnabled = false;
		this.oAudioPanel;
		this.jsonSwiffy;
		this.nSwiffyReadyInterval;
		this.aSwiffyFrameMap;
		this.bAudioListenersAdded;
		this.sLastPlayedAudio;
		this.nPositionUpdate = null;
		this.bAudioComplete;
		//** NOT_STARTED | IN_PROGRESS | PAUSED | COMPLETED
		this.bPlaying;

		this.bCueAudioComplete = true;
		this.bCueAnimComplete = true;
		this.bAnimationComplete;
		// Stores the info of the seeked position when in pause state; for playing the next time
		this.oSeekInfo;
		// Stores the info of the event dispatched at "ANIMATION_CUE_END" when the player is seeked in a paused state
		this.oCueCompleteEventInfo;

		this.handleAudioPanelEvents = handleAudioPanelEvents.bind(this);
		this.handleSwiffyAPIEvents = handleSwiffyAPIEvents.bind(this);

        return this;
    }

    CreateJSWidget.prototype								= Object.create(AbstractComponent.prototype);
    CreateJSWidget.prototype.constructor					= CreateJSWidget;

    CreateJSWidget.prototype.getComponentConfig			= function () {
        return {};
    };
    CreateJSWidget.prototype.init						= function (p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('CreateJSWidget.init() | '+p_sID+' : '+JSON.stringify(p_oConfig)+' : '/*+p_$xmlComponent.text()*/);
        // Initialize any class properties / variables as required
        var oScope = this,
			sSounds = p_oConfig._soundID.split(' ').join('');
		if(sSounds === ''){
			p_oConfig.soundID = [];
			p_oConfig.audioAvailable = false;
			this.dispatchEvent('AUDIO_ADDED', {type: 'AUDIO_ADDED', target: this, audioAvailable:false});
		}else{
			p_oConfig.soundID = sSounds.split(',');
			p_oConfig.audioAvailable = true;
			this.dispatchEvent('AUDIO_ADDED', {type: 'AUDIO_ADDED', target: this, audioAvailable:true});
		}
        //console.log('CreateJSWidget.init() | p_oConfig.soundID = '+p_oConfig.soundID.length);
		
		/*require([
            'libs/runtime_formatted_7.0.3'
        ], function(Component) {
			// Call to the super calss
	        AbstractComponent.prototype.init.call(oScope, p_sID, p_oConfig, p_$xmlComponent);
        });*/
		
		/*var oScope = this,
			sFile = 'content/' + Constants.getCurrentPageName() + '/page.js';
		$.getScript(sFile).done(function(script, textStatus){
			initCreateJS.call(oScope, script);
			// ** Call to the super calss
			AbstractComponent.prototype.init.call(oScope, p_sID, p_oConfig, p_$xmlComponent);
		}).fail(function(jqxhr, settings, exception){
			console.log( "Triggered ajaxError handler. trying after again..."  );
		});*/
		AbstractComponent.prototype.init.call(oScope, p_sID, p_oConfig, p_$xmlComponent);
    };
	/*function initCreateJS(p_sScript){
		var canvas = oScope.$component.find("canvas")[0],
			lib = animate(lib = lib||{}, images = images||{}, createjs = createjs||{});
		
		this.oCreateJS = new lib.ui();
		
		var stage = new createjs.Stage(canvas);
		stage.addChild(oScope.oCreateJS);
		stage.update();
		
		createjs.Ticker.setFPS(20);
		createjs.Ticker.addEventListener("tick", stage);
	}*/
    // Create Runtime assets / set pointers to DOM objects. Populate required class Properties
    CreateJSWidget.prototype.createComponent				= function () {
        //console.log('CreateJSWidget.createComponent() | '+this.$component.filter('#'+this.getComponentID())[0]);
		if(this.oCreateJS !== null && this.oCreateJS != undefined ){
			this.oCreateJS.removeAllEventListeners();
			this.stage.enableDOMEvents(false);
			createjs.Ticker.removeAllEventListeners();
			createjs.Ticker.reset();
            // ** Destroy Swiffy Object if its already present
    		//this.oCreateJS.destroy();
    		this.oCreateJS = null;
			window.animate 		= null;
    	}
		
		var oScope = this,
			sFile = 'content/' + Constants.getCurrentPageName() + '/page.js';
			
		$.getScript(sFile).done(function(script, textStatus){
			oScope.canvas = oScope.$component.find("canvas")[0];
			if(oScope.getConfig()._publishedBy === 'AnimateCC'){
				// ** CreateJs output with Animate CC
				var lib = animate(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
				oScope.oCreateJS = new lib[Constants.getCurrentPageName()]();
			}else if(oScope.getConfig()._publishedBy === 'FlashCS6'){
				// ** CreateJs output with Flash CS6
				var lib = animate(lib = lib||{}, images = images||{}, createjs = createjs||{});
				oScope.oCreateJS = new lib.ui();
			}
			
			
			oScope.stage = new createjs.Stage(oScope.canvas);
			oScope.stage.addChild(oScope.oCreateJS);
			oScope.stage.update();
			
			createjs.Ticker.setFPS(20);
			createjs.Ticker.addEventListener("tick", oScope.stage);
			// ** Call to the super calss
			AbstractComponent.prototype.createComponent.call(oScope);
		}).fail(function(jqxhr, settings, exception){
			console.log( "Triggered ajaxError handler. trying after again..."  );
		});
		
		//AbstractComponent.prototype.createComponent.call(oScope);
    };
    CreateJSWidget.prototype.addAriaRoles					= function () {
        //console.log('CreateJSWidget.addAriaRoles() | ');
    };
    CreateJSWidget.prototype.bindHandlers					= function () {
        //console.log('CreateJSWidget.bindHandlers() | ');
    };
    CreateJSWidget.prototype.initialize					= function () {
        //console.log('CreateJSWidget.initialize() | '+this+' : Swiffy ID = '+this.getComponentID());
        //this.jsonSwiffy = JSON.parse(this.$xmlData.__cdata);
        this.initiateSwiffy();
        //this.bAudioListenersAdded = true;
		//this.dispatchComponentLoadedEvent();
		//this.oCreateJS.play();
    }; 
	CreateJSWidget.prototype.isAudioAvailable				= function () {
        //console.log('CreateJSWidget.isAudioAvailable() | '+this+' : Audio Available = '+this.getConfig().audioAvailable);
        return this.getConfig().audioAvailable;
    };

    CreateJSWidget.prototype.initiateSwiffy					= function () {
		//console.log('CreateJSWidget.initiateSwiffy() | Swiffy Obj = '+this.oCreateJS+ ' : Frame Count = '+ this.jsonSwiffy.frameCount+' : Swiffy ID = '+this.getComponentID());
    	/*if(this.oCreateJS !== null && this.oCreateJS != undefined ){
			this.oCreateJS.removeAllEventListeners();
			this.stage.enableDOMEvents(false);
			createjs.Ticker.removeAllEventListeners();
			createjs.Ticker.reset();
            // ** Destroy Swiffy Object if its already present
    		//this.oCreateJS.destroy();
    		this.oCreateJS = null;
			window.animate 		= null;
    	}*/
		
    	this.bPlaying = false;
        this.bAnimationComplete = false;
        if(this.oCreateJS.totalFrames > 0){
            // ** Re-initialize the Swiffy Object
            /*this.oCreateJS    = new swiffy.Stage(this.$component.filter('#'+this.getComponentID())[0], this.jsonSwiffy, {});
            this.oCreateJS.setBackground(null);
            this.oCreateJS.start();
            // ** Check for the Swiffy API to be ready
            var oScope = this;
            this.nSwiffyReadyInterval = null;
            this.nSwiffyReadyInterval = setInterval(function(){
                if(oScope.oCreateJS != null/* && oScope.oCreateJS.addedToStage*//*){
                    clearInterval(oScope.nSwiffyReadyInterval);
                    //console.log('CreateJSWidget.initiateSwiffy() | API loaded');
					setTimeout(function(){
						onSwiffyAPILoaded.call(oScope);
					}, 0);
                }
            }, 100);*/
			onSwiffyAPILoaded.call(this);
        }else{
            // ** Initialize the Swiffy Object
            /*this.oCreateJS    = new swiffy.Stage(this.$component.filter('#'+this.getComponentID())[0], this.jsonSwiffy, {});
            this.oCreateJS.setBackground(null);
            this.oCreateJS.start();*/

            this.dispatchComponentLoadedEvent();
        }
    };

    function onSwiffyAPILoaded(){
        //console.log('CreateJSWidget.onSwiffyAPILoaded() | ');
        addSwiffyAPIListeners.call(this);
		this.aSwiffyFrameMap = [];
		if(this.oCreateJS.aFrameMap !== undefined){
			this.aSwiffyFrameMap = this.oCreateJS.aFrameMap.slice(0);
		}
        this.dispatchComponentLoadedEvent();
    }



    // Audio Panel Listeners
    CreateJSWidget.prototype.registerAudioPanel                = function(p_oAudioPanel){
        this.oAudioPanel = p_oAudioPanel;
        removeAudioPanelListeners.call(this);
        addAudioPanelListeners.call(this);
    };
    CreateJSWidget.prototype.listenTo                         = function(p_oAudioPanel){
        if(p_oAudioPanel instanceof AudioPanel.constructor){
            this.oAudioPanel = p_oAudioPanel;
            removeAudioPanelListeners.call(this);
            addAudioPanelListeners.call(this);
            return;
        }
        removeAudioPanelListeners.call(this);
    };
    function addAudioPanelListeners(){
        if(this.oAudioPanel === null && this.oAudioPanel === undefined){return;}
        this.oAudioPanel.addEventListener("PLAY", this.handleAudioPanelEvents);
        this.oAudioPanel.addEventListener("PAUSE", this.handleAudioPanelEvents);
        this.oAudioPanel.addEventListener("STOP", this.handleAudioPanelEvents);
        this.oAudioPanel.addEventListener("REPLAY", this.handleAudioPanelEvents);
        this.oAudioPanel.addEventListener("PLAYHEAD_SEEK_START", this.handleAudioPanelEvents);
        this.oAudioPanel.addEventListener("PLAYHEAD_SEEK_END", this.handleAudioPanelEvents);
        AudioManager.addEventListener('AUDIO_FINISH', this.handleAudioPanelEvents);
    }
    function removeAudioPanelListeners(){
        if(this.oAudioPanel === null && this.oAudioPanel === undefined){return;}
        this.oAudioPanel.removeEventListener("PLAY", this.handleAudioPanelEvents);
        this.oAudioPanel.removeEventListener("PAUSE", this.handleAudioPanelEvents);
        this.oAudioPanel.removeEventListener("STOP", this.handleAudioPanelEvents);
        this.oAudioPanel.removeEventListener("REPLAY", this.handleAudioPanelEvents);
		this.oAudioPanel.removeEventListener("PLAYHEAD_SEEK_START", this.handleAudioPanelEvents);
        this.oAudioPanel.removeEventListener("PLAYHEAD_SEEK_END", this.handleAudioPanelEvents);
        AudioManager.removeEventListener('AUDIO_FINISH', this.handleAudioPanelEvents);
    }
    function handleAudioPanelEvents(e){
        var sEventType = e.type;
        //console.log('CreateJSWidget.handleAudioPanelEvents() |'/*+' Swiffy ID = '+this.getComponentID()*/+'\n\tEventType = '+sEventType);
        switch(sEventType){
            case 'PLAY':
				addSwiffyAPIListeners.call(this);
                this.play();
                break;
            case 'PAUSE':
				addSwiffyAPIListeners.call(this);
                this.pause();
                break;
            case 'STOP':
                this.oCreateJS.gotoAndStop(1);
                AudioManager.clearLastPlayedAudio();
                removePositionUpdateInterval.call(this);
                break;
            case 'REPLAY':
				addSwiffyAPIListeners.call(this);
                this.replay();
                break;
            case 'PLAYHEAD_SEEK_START':
				addSwiffyAPIListeners.call(this);
                removePositionUpdateInterval.call(this);
                this.oCreateJS.stop();
                AudioManager.pauseAudio();
                break;
            case 'PLAYHEAD_SEEK_END':
                calculatePosition.call(this, e);
                //addPositionUpdateInterval.call(this);
                break;
            case 'AUDIO_FINISH':
                this.bCueAudioComplete = true;
                e.data = e.data || {};
                e.data.label = AudioManager.getPlayingSoundID();
                checkAndPlayNextCue.call(this, e);
                break;
        }
    }
    function calculatePosition(e){
        var nCurrentPlayheadPosition = (e.playheadPosition === 0) ? 0.03 : e.playheadPosition,
            /*
             * PlayHead Position    - 100           - nCurrentPlayheadPosition
             * Swiffy Frames        - total frames  - ?
             */
            nActualFramePosition = this.oCreateJS.totalFrames * nCurrentPlayheadPosition / 100,
            nSwiffyGoToFrame = Math.round(nActualFramePosition),
            aSwiffyFrameMapInfo = findMapIndex.call(this, this.aSwiffyFrameMap, nSwiffyGoToFrame),

            nStartFrame = aSwiffyFrameMapInfo[0][0],
            nEndFrame = aSwiffyFrameMapInfo[0][1],
            sCurrentLabel = aSwiffyFrameMapInfo[0][2],

            nTotalFrames = nEndFrame - nStartFrame,
            nCurrentFrame = (nActualFramePosition < nStartFrame) ? 0 : (nActualFramePosition - nStartFrame),
            /*nAnimationDuration = (nCurrentFrame / 20) * 1000,*/
            nAnimationDuration = ((nEndFrame - nStartFrame) / 20) * 1000,
            oSound = AudioManager.getSoundByID(sCurrentLabel),
            nSoundDuration = (nSwiffyGoToFrame < nStartFrame) ? 0 : oSound.duration,
            nPercentPlayed = (nSwiffyGoToFrame - nStartFrame) * 100 / (nEndFrame - nStartFrame),
            nSoundPosition = nSoundDuration * nPercentPlayed / 100,
            oScope = this;
        /*
         * 1 Sec      nTotalFrames
         * 1            20
         * ?            500
         */
        /*
         * If the seekbar is dragged to a position between the animation "start label"
         * & the "end label"
         */
        AudioManager.stop();
        if(this.bPlaying){
            // Check and play the audio from a specific position
            //console.log('\tnSoundDuration = '+nSoundDuration+' : nAnimationDuration = '+nAnimationDuration);
            if(nPercentPlayed < 100){
                AudioManager.playAudio(sCurrentLabel, nSoundPosition);
                this.bCueAnimComplete = false;
                this.bCueAudioComplete = false;
            }else{
                this.bCueAnimComplete = true;
                this.bCueAudioComplete = true;
            }
            /*
            if(nSoundDuration > nAnimationDuration){
                            AudioManager.playAudio(sCurrentLabel, nAnimationDuration);
                            this.bCueAnimComplete = true;
                            this.bCueAudioComplete = false;
                        }else if(nSoundDuration < nAnimationDuration){
                            //AudioManager.clearLastPlayedAudio();
                            this.bCueAnimComplete = false;
                            this.bCueAudioComplete = true;
                        }else{
                            //AudioManager.clearLastPlayedAudio();
                            this.bCueAnimComplete = true;
                            this.bCueAudioComplete = true;
                        }*/

            // Play the swiffy animation from the specific frame
            var bStoppedFlag = (nSwiffyGoToFrame === nEndFrame) ? true : false;
            this.oCreateJS.bStopped = bStoppedFlag;
            // Handle Edge Case: If Both Audio & Animation have finished playing PLUS its the End Frame of the Cue Animation
            if(this.bCueAnimComplete && this.bCueAudioComplete && bStoppedFlag){
                this.oCreateJS.gotoAndPlay(nSwiffyGoToFrame + 1);
            }else{
            // Play the swiffy animation from the specific frame
                this.oCreateJS.gotoAndPlay(nSwiffyGoToFrame);
            }
            // Add the interval for updating the seek bar
            addPositionUpdateInterval.call(this);
        }else{
            if(nPercentPlayed < 100){
                // Store the audio info, to play when the play button is clicked
                this.oSeekInfo = {
                    audio: sCurrentLabel,
                    position: nAnimationDuration
                };
                this.bCueAnimComplete = false;
                this.bCueAudioComplete = false;
            }else{
                this.bCueAnimComplete = true;
                this.bCueAudioComplete = true;
            }
            /*
            if(nSoundDuration > nAnimationDuration){
                            // Store the audio info, to play when the play button is clicked
                            this.oSeekInfo = {
                                audio: sCurrentLabel,
                                position: nAnimationDuration
                            };
                            this.bCueAnimComplete = true;
                            this.bCueAudioComplete = false;
                        }else if(nSoundDuration < nAnimationDuration){
                            //AudioManager.clearLastPlayedAudio();
                            this.bCueAnimComplete = false;
                            this.bCueAudioComplete = true;
                        }else{
                            //AudioManager.clearLastPlayedAudio();
                            this.bCueAnimComplete = true;
                            this.bCueAudioComplete = true;
                        }*/

            // Move the swiffy animation to the specific frame
            this.oCreateJS.gotoAndStop(nSwiffyGoToFrame);
        }
        /*
         * If its the last frame of flash animation
         */
        if(nSwiffyGoToFrame === this.oCreateJS.totalFrames){
            removePositionUpdateInterval.call(this);
            this.bAnimationComplete = true;
            this.oCreateJS.bStopped = false;
            this.oCreateJS.gotoAndStop(nSwiffyGoToFrame);
            AudioManager.clearLastPlayedAudio();
            dispatchCustomEvent.call(this, "ANIMATION_COMPLETE");
            return;
        }else{
            this.bAnimationComplete = false;
        }
        /*
        console.log('CreateJSWidget.handleAudioPanelEvents() | \n\tplayheadPosition = '+nCurrentPlayheadPosition+
                                                            '\n\tnSwiffyGoToFrame = '+nSwiffyGoToFrame+
                                                            '\n\tnStartFrame = '+nStartFrame+
                                                            '\n\tnEndFrame = '+nEndFrame+
                                                            '\n\tsCurrentLabel = '+sCurrentLabel+
                                                            '\n\tnSoundDuration = '+nSoundDuration+
                                                            '\n\tnAnimationDuration = '+nAnimationDuration);
        */
    }
    function findMapIndex(aMap, nSwiffyGoToFrame){
        var aSwiffyFrameMap = this.aSwiffyFrameMap.slice(0);
        while(aSwiffyFrameMap.length > 1){
            aSwiffyFrameMap = findSwiffyIndexFromMap.call(this, aSwiffyFrameMap, nSwiffyGoToFrame);
        }
        //console.log('findMapIndex() | '+aSwiffyFrameMap);
        return aSwiffyFrameMap;
    }
    function findSwiffyIndexFromMap(aMap, nSwiffyGoToFrame){
        //console.log('findSwiffyIndexFromMap()');
        var index = Math.round(aMap.length / 2),
            min = aMap[index][0],
            max = aMap[index][1];
        //console.log('\tMin = '+min+' : Max = '+max);
        if(nSwiffyGoToFrame < min){
            // Search to the left
            return aMap.splice(0, index);
        }
        if(nSwiffyGoToFrame > max){
            // Search to the right
            return aMap.splice(index, aMap.length);
        }
        if(nSwiffyGoToFrame >= min && nSwiffyGoToFrame <= max){
            //console.log(min+' ### RANGE FOUND ### '+max);
            return aMap.splice(index, index);
        }
    }

    // Swiffy Listeners
    function addSwiffyAPIListeners(){
		if(!this.oCreateJS.hasEventListener("ANIMATION_START")){
			this.oCreateJS.addEventListener("ANIMATION_START", this.handleSwiffyAPIEvents);
		}
		if(!this.oCreateJS.hasEventListener("ANIMATION_CUE_START")){
			this.oCreateJS.addEventListener("ANIMATION_CUE_START", this.handleSwiffyAPIEvents);
		}
		if(!this.oCreateJS.hasEventListener("ANIMATION_CUE_END")){
			this.oCreateJS.addEventListener("ANIMATION_CUE_END", this.handleSwiffyAPIEvents);
		}
		if(!this.oCreateJS.hasEventListener("ANIMATION_COMPLETE")){
			this.oCreateJS.addEventListener("ANIMATION_COMPLETE", this.handleSwiffyAPIEvents);
		}
    }
    function removeSwiffyAPIListeners(){
		if(this.oCreateJS.hasEventListener("ANIMATION_START")){
			this.oCreateJS.removeEventListener("ANIMATION_START", this.handleSwiffyAPIEvents);
		}
		if(this.oCreateJS.hasEventListener("ANIMATION_CUE_START")){
			this.oCreateJS.removeEventListener("ANIMATION_CUE_START", this.handleSwiffyAPIEvents);
		}
		if(this.oCreateJS.hasEventListener("ANIMATION_CUE_END")){
			this.oCreateJS.removeEventListener("ANIMATION_CUE_END", this.handleSwiffyAPIEvents);
		}
		if(this.oCreateJS.hasEventListener("ANIMATION_COMPLETE")){
			this.oCreateJS.removeEventListener("ANIMATION_COMPLETE", this.handleSwiffyAPIEvents);
		}
    }
    function handleSwiffyAPIEvents(e){
        var sEventType = e.data.type;
        //console.log("CreateJSWidget.handleSwiffyAPIEvents() | \n\tsEventType = "+sEventType+'\n\t'+JSON.stringify(e));
        switch(sEventType){
            case 'ANIMATION_START':
                this.bAnimationComplete = false;
                break;
            case 'ANIMATION_CUE_START':
                this.bCueAnimComplete = false;
                this.bCueAudioComplete = false;
                if(this.bPlaying){
                    AudioManager.playAudio(e.data.label, 0);
                }
                break;
            case 'ANIMATION_CUE_END':
                this.bCueAnimComplete = true;
                //this.oCueCompleteEventInfo = e;
                if(this.bPlaying){
                    checkAndPlayNextCue.call(this, e);
                }
                break;
            case 'ANIMATION_COMPLETE':
                removePositionUpdateInterval.call(this);
                this.bAnimationComplete = true;
                this.oCreateJS.bStopped = false;
                this.bPlaying = false;
                dispatchCustomEvent.call(this, "ANIMATION_COMPLETE");
                break;
        }
    };

    function checkAndPlayNextCue(e){
        //console.log('Swiffy.checkAndPlayNextCue() | \n\tbCueAnimComplete = '+this.bCueAnimComplete+'\n\tbCueAudioComplete = '+this.bCueAudioComplete/*+' : Playing Sound ID = '+(e.target.currentLabel || e.soundID)*/);
        if(this.bCueAnimComplete && this.bCueAudioComplete){
            this.oCreateJS.play();
            //var sCurrentPlayingSoundID = e.data.label;
            /*
            var sCurrentPlayingSoundID = e.target.currentLabel || e.soundID,
                            bIsLastAudio = isLastAudio.call(this, sCurrentPlayingSoundID);

                        if(!bIsLastAudio){
                            this.oCreateJS.play();
                            AudioManager.playAudio(getNextAudio.call(this, sCurrentPlayingSoundID));
                            return true;
                        }*/
            return true;
        }
        //this.oCueCompleteEventInfo = null;
        return false;
   }

    function isLastAudio(p_sSoundID){
        var nSoundIndex = getAudioIndex.call(this, p_sSoundID),
            bIsLastAudio = (nSoundIndex === (this.getConfig().soundID.length-1)) ? true : false;

        return bIsLastAudio;
    }
    function getAudioIndex(p_sSoundID){
        return this.getConfig().soundID.indexOf(p_sSoundID);
    }
    function getNextAudio(p_sSoundID){
        return this.getConfig().soundID[this.getConfig().soundID.indexOf(p_sSoundID) + 1];
    }

    function addPositionUpdateInterval(){
        var oScope = this;
		if(this.nPositionUpdate === null){
			this.nPositionUpdate = setInterval(function(e){
				onPositionUpdate.call(oScope, e);
			}, 100);
			enableNoSleep.call(this, true);
		}
    }
    function removePositionUpdateInterval(){
        clearInterval(this.nPositionUpdate);
		this.nPositionUpdate = null;
		enableNoSleep.call(this, false);
    }
    function onPositionUpdate(e){
        //console.log("CreateJSWidget.onPositionUpdate() | "+this.oCreateJS.currentFrame+' : totalFrames = '+this.oCreateJS.totalFrames);
        dispatchCustomEvent.call(this, "ANIMATION_POSITION_UPDATE");
        if(this.oCreateJS.currentFrame === this.oCreateJS.totalFrames){
            this.bAnimationComplete = true;
            removePositionUpdateInterval.call(this);
        }
    }
    function dispatchCustomEvent(p_sEventName){
        this.dispatchEvent(p_sEventName, {
            type:p_sEventName,
            target:this,
            currentFrame:this.oCreateJS.currentFrame,
            totalFrames:this.oCreateJS.totalFrames
        });
    }
	
	function enableNoSleep(p_bEnable){
		if(p_bEnable === this.bWakeLockEnabled){return;}
		
		if (p_bEnable) {
			this.oNoSleep.enable(); // keep the screen on!
			this.bWakeLockEnabled = p_bEnable;
		} else {
			this.oNoSleep.disable(); // let the screen turn off.
			this.bWakeLockEnabled = p_bEnable;
		}
	}
	
    // Swiffy Widget API
    CreateJSWidget.prototype.play                         = function(e){
        //console.log('Swiffy.play() | \n\tbStopped = '+this.oCreateJS.bStopped+'\n\tbAnimationComplete = '+this.bAnimationComplete+'\n\toCueCompleteEventInfo = '+this.oCueCompleteEventInfo+'\n\tEQUALS = '+(!this.oCreateJS.bStopped || this.bAnimationComplete || this.oCueCompleteEventInfo));
        if(this.bAnimationComplete){
            this.replay();
            return;
        }
        //console.log('Swiffy.play() | bPlaying = '+this.bPlaying);
        if(!this.bPlaying/*!this.oCreateJS.bStopped || this.bAnimationComplete || this.oCueCompleteEventInfo*/){
            /*
            if(this.oCueCompleteEventInfo){
                            checkAndPlayNextCue.call(this, this.oCueCompleteEventInfo);
                        }*/
            var bPlayed = checkAndPlayNextCue.call(this, this.oCueCompleteEventInfo);
            if(!bPlayed){
                if(!this.bCueAnimComplete){
                    // ** Play the animation if its not complete
                    this.oCreateJS.play();
                }
                if(!this.bCueAudioComplete && this.oSeekInfo && this.oSeekInfo.audio && this.oSeekInfo.position){
                    // ** Handle seeking while animation paused. Play the audio that's evaluated while seeking
                    AudioManager.playAudio(this.oSeekInfo.audio, this.oSeekInfo.position);
                    this.oSeekInfo = null;
                }else if(!this.bCueAudioComplete){
                    // ** Play any audio that was paused
                    AudioManager.playAudio();
                }
            }
            this.bPlaying = true;
            this.bAnimationComplete = false;
            //console.log('Swiffy.play() | AM Completed = '+AudioManager.isCompleted()+' : SeekInfo = '+JSON.stringify(this.oSeekInfo));
            /*
            if(!AudioManager.isCompleted() || this.oSeekInfo){
                            if(this.oSeekInfo && this.oSeekInfo.audio && this.oSeekInfo.position){
                                // Handle seeking while animation paused. Play the audio that's evaluated while seeking
                                AudioManager.playAudio(this.oSeekInfo.audio, this.oSeekInfo.position);
                                this.oSeekInfo = null;
                            }else{
                                // ** Play any audio that was paused
                                AudioManager.playAudio();
                            }
                        }*/

            addPositionUpdateInterval.call(this);

            dispatchCustomEvent.call(this, "ANIMATION_PLAY");
        }
    };
    CreateJSWidget.prototype.pause                        = function(){
        //console.log('Swiffy.pause() | bPlaying = '+this.bPlaying);
        if(this.bPlaying/*!this.oCreateJS.bStopped*/){
            this.bPlaying = false;
            this.oCreateJS.stop();
            AudioManager.pauseAudio();
            removePositionUpdateInterval.call(this);
            dispatchCustomEvent.call(this, "ANIMATION_PAUSE");
        }
    };

    CreateJSWidget.prototype.replay                       = function(){
        //console.log('Swiffy.replay() | bPlaying = '+this.bPlaying);
        this.stop();
        this.bPlaying = true;
        this.oCreateJS.gotoAndPlay('start');
        addPositionUpdateInterval.call(this);
        dispatchCustomEvent.call(this, "ANIMATION_REPLAY");
    };
    CreateJSWidget.prototype.stop                         = function(){
        this.bPlaying = false;
        this.bAnimationComplete = true;
        this.bCueAudioComplete = true;
        this.bCueAnimComplete = true;
        this.oSeekInfo = null;
        removePositionUpdateInterval.call(this);

        this.oCreateJS.stop();
        this.oCreateJS.gotoAndStop(1);

        AudioManager.stop();
        AudioManager.clearLastPlayedAudio();

        dispatchCustomEvent.call(this, "ANIMATION_STOPPED");
    };
    CreateJSWidget.prototype.complete                     = function(){
        this.bPlaying = false;
        this.bAnimationComplete = true;
        removePositionUpdateInterval.call(this);

        this.oCreateJS.stop();
        this.oCreateJS.gotoAndStop(1);

        AudioManager.stop();
        AudioManager.clearLastPlayedAudio();

        dispatchCustomEvent.call(this, "ANIMATION_COMPLETED");
    };


    CreateJSWidget.prototype.isComplete                   = function(e){
        //console.log('CreateJSWidget.isAnimationComplete() | bAnimationComplete = '+this.bAnimationComplete+' : bAudioComplete = '+this.bAudioComplete+' : '+(this.bAnimationComplete && this.bAudioComplete))
        return (this.bAnimationComplete && this.bAudioComplete);
    };
    CreateJSWidget.prototype.isPlaying                    = function(e){
        return this.bPlaying;
    };

    CreateJSWidget.prototype.invalidate						= function () {
		this.oCreateJS.stop();
		AudioManager.stop();
		removePositionUpdateInterval.call(this);
		removeSwiffyAPIListeners.call(this);
		removeAudioPanelListeners.call(this);
	};
    CreateJSWidget.prototype.destroy						= function () {
    	//console.log('CreateJSWidget.destroy() | ');
    	// Stop any on-going animations
    	removePositionUpdateInterval.call(this);
		removeSwiffyAPIListeners.call(this);
		removeAudioPanelListeners.call(this);
		//this.stop();
		this.bPlaying = false;
        this.bAnimationComplete = true;
        this.bCueAudioComplete = true;
        this.bCueAnimComplete = true;
        this.oSeekInfo = null;

		// ** Destroy Swiffy Object if its already present
		createjs.Ticker.removeAllEventListeners();
		createjs.Ticker.reset();
        this.oCreateJS.stop();
        this.oCreateJS.gotoAndStop(1);
		this.oCreateJS.removeAllEventListeners();
		this.oCreateJS.destroy();
		this.stage.enableDOMEvents(false);
		this.oCreateJS = null;
		this.stage = null;
		this.canvas = null;
		window.animate = null;

        AudioManager.stop();
        //AudioManager.clearLastPlayedAudio();
		

		
		this.oCreateJS = null;
		this.oNoSleep = null;
		this.bWakeLockEnabled = null;
		this.oAudioPanel = null;
		this.jsonSwiffy = null;
		this.nSwiffyReadyInterval = null;
		this.aSwiffyFrameMap = null;
		this.bAudioListenersAdded = null;
		this.sLastPlayedAudio = null;
		this.nPositionUpdate = null;
		this.bAudioComplete = null;
		this.bPlaying = null;

		this.bCueAudioComplete = null;
		this.bCueAnimComplete = null;
		this.bAnimationComplete = null;
		this.oSeekInfo = null;
		this.oCueCompleteEventInfo = null;

		this.handleAudioPanelEvents = null;
		this.handleSwiffyAPIEvents = null;

		this.prototype		= null;

        AbstractComponent.prototype.destroy.call(this);
    };
    CreateJSWidget.prototype.toString						= function () {
        return 'component/CreateJSWidget';
    };

    return CreateJSWidget;
});