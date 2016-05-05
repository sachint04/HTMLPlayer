define([
    'component/AbstractComponent',
    'component/AudioPanel',
    'core/AudioManager',
    'util/MessageLogger'
], function (AbstractComponent, AudioPanel, AudioManager, Logger) {

    function SwiffyWidget() {
        //console.log('SwiffyWidget.CONSTRUCTOR() | ');
        AbstractComponent.call(this);

        // define the class properties
		this.oSwiffy;
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

    SwiffyWidget.prototype								= Object.create(AbstractComponent.prototype);
    SwiffyWidget.prototype.constructor					= SwiffyWidget;

    SwiffyWidget.prototype.getComponentConfig			= function () {
        return {};
    };
    SwiffyWidget.prototype.init							= function (p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('SwiffyWidget.init() | '+p_sID+' : '+JSON.stringify(p_oConfig)+' : '/*+p_$xmlComponent.text()*/);
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
        //console.log('SwiffyWidget.init() | p_oConfig.soundID = '+p_oConfig.soundID.length);
        require([
            'libs/runtime_formatted_7.0.3'
        ], function(Component) {
			// Call to the super calss
	        AbstractComponent.prototype.init.call(oScope, p_sID, p_oConfig, p_$xmlComponent);
        });
    };
    // Create Runtime assets / set pointers to DOM objects. Populate required class Properties
    SwiffyWidget.prototype.createComponent				= function () {
        //console.log('SwiffyWidget.createComponent() | '+this.$component.filter('#'+this.getComponentID())[0]);

        // Call to the super calss
        AbstractComponent.prototype.createComponent.call(this);
    };
    SwiffyWidget.prototype.addAriaRoles					= function () {
        //console.log('SwiffyWidget.addAriaRoles() | ');
    };
    SwiffyWidget.prototype.bindHandlers					= function () {
        //console.log('SwiffyWidget.bindHandlers() | ');
    };
    SwiffyWidget.prototype.initialize					= function () {
        //console.log('SwiffyWidget.initialize() | '+this+' : Swiffy ID = '+this.getComponentID());
        this.jsonSwiffy = JSON.parse(this.$xmlData.__cdata);
        this.initiateSwiffy();
        this.bAudioListenersAdded = true;
    }; 
	SwiffyWidget.prototype.isAudioAvailable				= function () {
        //console.log('SwiffyWidget.isAudioAvailable() | '+this+' : Audio Available = '+this.getConfig().audioAvailable);
        return this.getConfig().audioAvailable;
    };

    SwiffyWidget.prototype.initiateSwiffy					= function () {
		//console.log('SwiffyWidget.initiateSwiffy() | Swiffy Obj = '+this.oSwiffy+ ' : Frame Count = '+ this.jsonSwiffy.frameCount+' : Swiffy ID = '+this.getComponentID());
    	if(this.oSwiffy !== null && this.oSwiffy != undefined ){
    		this.oSwiffy.destroy();
    		this.oSwiffy = null;
    	}
    	this.bPlaying = false;
        this.bAnimationComplete = false;
        if(this.jsonSwiffy.frameCount > 1){
            // ** Destroy Swiffy Object if its already present
            // ** Re-initialize the Swiffy Object
            this.oSwiffy    = new swiffy.Stage(this.$component.filter('#'+this.getComponentID())[0], this.jsonSwiffy, {});
            this.oSwiffy.setBackground(null);
            this.oSwiffy.start();
            // ** Check for the Swiffy API to be ready
            var oScope = this;
            this.nSwiffyReadyInterval = null;
            this.nSwiffyReadyInterval = setInterval(function(){
                if(oScope.oSwiffy.api != null/* && oScope.oSwiffy.api.addedToStage*/){
                    clearInterval(oScope.nSwiffyReadyInterval);
                    //console.log('SwiffyWidget.initiateSwiffy() | API loaded');
					setTimeout(function(){
						onSwiffyAPILoaded.call(oScope);
					}, 0);
                }
            }, 100);
        }else{
            // ** Initialize the Swiffy Object
            this.oSwiffy    = new swiffy.Stage(this.$component.filter('#'+this.getComponentID())[0], this.jsonSwiffy, {});
            this.oSwiffy.setBackground(null);
            this.oSwiffy.start();

            this.dispatchComponentLoadedEvent();
        }
    };

    function onSwiffyAPILoaded(){
        //console.log('SwiffyWidget.onSwiffyAPILoaded() | ');
        addSwiffyAPIListeners.call(this);
		this.aSwiffyFrameMap = [];
		if(this.oSwiffy.api.aFrameMap !== undefined){
			this.aSwiffyFrameMap = this.oSwiffy.api.aFrameMap.slice(0);
		}
        this.dispatchComponentLoadedEvent();
    }



    // Audio Panel Listeners
    SwiffyWidget.prototype.registerAudioPanel                = function(p_oAudioPanel){
        this.oAudioPanel = p_oAudioPanel;
        removeAudioPanelListeners.call(this);
        addAudioPanelListeners.call(this);
    };
    SwiffyWidget.prototype.listenTo                         = function(p_oAudioPanel){
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
        //console.log('SwiffyWidget.handleAudioPanelEvents() |'/*+' Swiffy ID = '+this.getComponentID()*/+'\n\tEventType = '+sEventType);
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
                this.oSwiffy.api.gotoAndStop(1);
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
                this.oSwiffy.api.stop();
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
            nActualFramePosition = this.oSwiffy.api.totalFrames * nCurrentPlayheadPosition / 100,
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
            this.oSwiffy.api.bStopped = bStoppedFlag;
            // Handle Edge Case: If Both Audio & Animation have finished playing PLUS its the End Frame of the Cue Animation
            if(this.bCueAnimComplete && this.bCueAudioComplete && bStoppedFlag){
                this.oSwiffy.api.gotoAndPlay(nSwiffyGoToFrame + 1);
            }else{
            // Play the swiffy animation from the specific frame
                this.oSwiffy.api.gotoAndPlay(nSwiffyGoToFrame);
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
            this.oSwiffy.api.gotoAndStop(nSwiffyGoToFrame);
        }
        /*
         * If its the last frame of flash animation
         */
        if(nSwiffyGoToFrame === this.oSwiffy.api.totalFrames){
            removePositionUpdateInterval.call(this);
            this.bAnimationComplete = true;
            this.oSwiffy.api.bStopped = false;
            this.oSwiffy.api.gotoAndStop(nSwiffyGoToFrame);
            AudioManager.clearLastPlayedAudio();
            dispatchCustomEvent.call(this, "ANIMATION_COMPLETE");
            return;
        }else{
            this.bAnimationComplete = false;
        }
        /*
        console.log('SwiffyWidget.handleAudioPanelEvents() | \n\tplayheadPosition = '+nCurrentPlayheadPosition+
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
		if(!this.oSwiffy.api.hasEventListener("ANIMATION_START")){
			this.oSwiffy.api.addEventListener("ANIMATION_START", this.handleSwiffyAPIEvents);
		}
		if(!this.oSwiffy.api.hasEventListener("ANIMATION_CUE_START")){
			this.oSwiffy.api.addEventListener("ANIMATION_CUE_START", this.handleSwiffyAPIEvents);
		}
		if(!this.oSwiffy.api.hasEventListener("ANIMATION_CUE_END")){
			this.oSwiffy.api.addEventListener("ANIMATION_CUE_END", this.handleSwiffyAPIEvents);
		}
		if(!this.oSwiffy.api.hasEventListener("ANIMATION_COMPLETE")){
			this.oSwiffy.api.addEventListener("ANIMATION_COMPLETE", this.handleSwiffyAPIEvents);
		}
    }
    function removeSwiffyAPIListeners(){
		if(this.oSwiffy.api.hasEventListener("ANIMATION_START")){
			this.oSwiffy.api.removeEventListener("ANIMATION_START", this.handleSwiffyAPIEvents);
		}
		if(this.oSwiffy.api.hasEventListener("ANIMATION_CUE_START")){
			this.oSwiffy.api.removeEventListener("ANIMATION_CUE_START", this.handleSwiffyAPIEvents);
		}
		if(this.oSwiffy.api.hasEventListener("ANIMATION_CUE_END")){
			this.oSwiffy.api.removeEventListener("ANIMATION_CUE_END", this.handleSwiffyAPIEvents);
		}
		if(this.oSwiffy.api.hasEventListener("ANIMATION_COMPLETE")){
			this.oSwiffy.api.removeEventListener("ANIMATION_COMPLETE", this.handleSwiffyAPIEvents);
		}
    }
    function handleSwiffyAPIEvents(e){
        var sEventType = e.data.type;
        //console.log("SwiffyWidget.handleSwiffyAPIEvents() | \n\tsEventType = "+sEventType+'\n\t'+JSON.stringify(e));
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
                this.oSwiffy.api.bStopped = false;
                this.bPlaying = false;
                dispatchCustomEvent.call(this, "ANIMATION_COMPLETE");
                break;
        }
    };

    function checkAndPlayNextCue(e){
        //console.log('Swiffy.checkAndPlayNextCue() | \n\tbCueAnimComplete = '+this.bCueAnimComplete+'\n\tbCueAudioComplete = '+this.bCueAudioComplete/*+' : Playing Sound ID = '+(e.target.currentLabel || e.soundID)*/);
        if(this.bCueAnimComplete && this.bCueAudioComplete){
            this.oSwiffy.api.play();
            //var sCurrentPlayingSoundID = e.data.label;
            /*
            var sCurrentPlayingSoundID = e.target.currentLabel || e.soundID,
                            bIsLastAudio = isLastAudio.call(this, sCurrentPlayingSoundID);

                        if(!bIsLastAudio){
                            this.oSwiffy.api.play();
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
		}
    }
    function removePositionUpdateInterval(){
        clearInterval(this.nPositionUpdate);
		this.nPositionUpdate = null;
    }
    function onPositionUpdate(e){
        //console.log("SwiffyWidget.onPositionUpdate() | "+this.oSwiffy.api.currentFrame+' : totalFrames = '+this.oSwiffy.api.totalFrames);
        dispatchCustomEvent.call(this, "ANIMATION_POSITION_UPDATE");
        if(this.oSwiffy.api.currentFrame === this.oSwiffy.api.totalFrames){
            this.bAnimationComplete = true;
            removePositionUpdateInterval.call(this);
        }
    }
    function dispatchCustomEvent(p_sEventName){
        this.dispatchEvent(p_sEventName, {
            type:p_sEventName,
            target:this,
            currentFrame:this.oSwiffy.api.currentFrame,
            totalFrames:this.oSwiffy.api.totalFrames
        });
    }

    // Swiffy Widget API
    SwiffyWidget.prototype.play                         = function(e){
        //console.log('Swiffy.play() | \n\tbStopped = '+this.oSwiffy.api.bStopped+'\n\tbAnimationComplete = '+this.bAnimationComplete+'\n\toCueCompleteEventInfo = '+this.oCueCompleteEventInfo+'\n\tEQUALS = '+(!this.oSwiffy.api.bStopped || this.bAnimationComplete || this.oCueCompleteEventInfo));
        if(this.bAnimationComplete){
            this.replay();
            return;
        }
        //console.log('Swiffy.play() | bPlaying = '+this.bPlaying);
        if(!this.bPlaying/*!this.oSwiffy.api.bStopped || this.bAnimationComplete || this.oCueCompleteEventInfo*/){
            /*
            if(this.oCueCompleteEventInfo){
                            checkAndPlayNextCue.call(this, this.oCueCompleteEventInfo);
                        }*/
            var bPlayed = checkAndPlayNextCue.call(this, this.oCueCompleteEventInfo);
            if(!bPlayed){
                if(!this.bCueAnimComplete){
                    // ** Play the animation if its not complete
                    this.oSwiffy.api.play();
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
    SwiffyWidget.prototype.pause                        = function(){
        //console.log('Swiffy.pause() | bPlaying = '+this.bPlaying);
        if(this.bPlaying/*!this.oSwiffy.api.bStopped*/){
            this.bPlaying = false;
            this.oSwiffy.api.stop();
            AudioManager.pauseAudio();
            removePositionUpdateInterval.call(this);
            dispatchCustomEvent.call(this, "ANIMATION_PAUSE");
        }
    };

    SwiffyWidget.prototype.replay                       = function(){
        //console.log('Swiffy.replay() | bPlaying = '+this.bPlaying);
        this.stop();
        this.bPlaying = true;
        this.oSwiffy.api.gotoAndPlay('start');
        addPositionUpdateInterval.call(this);
        dispatchCustomEvent.call(this, "ANIMATION_REPLAY");
    };
    SwiffyWidget.prototype.stop                         = function(){
        this.bPlaying = false;
        this.bAnimationComplete = true;
        this.bCueAudioComplete = true;
        this.bCueAnimComplete = true;
        this.oSeekInfo = null;
        removePositionUpdateInterval.call(this);

        this.oSwiffy.api.stop();
        this.oSwiffy.api.gotoAndStop(1);

        AudioManager.stop();
        AudioManager.clearLastPlayedAudio();

        dispatchCustomEvent.call(this, "ANIMATION_STOPPED");
    };
    SwiffyWidget.prototype.complete                     = function(){
        this.bPlaying = false;
        this.bAnimationComplete = true;
        removePositionUpdateInterval.call(this);

        this.oSwiffy.api.stop();
        this.oSwiffy.api.gotoAndStop(1);

        AudioManager.stop();
        AudioManager.clearLastPlayedAudio();

        dispatchCustomEvent.call(this, "ANIMATION_COMPLETED");
    };


    SwiffyWidget.prototype.isComplete                   = function(e){
        //console.log('SwiffyWidget.isAnimationComplete() | bAnimationComplete = '+this.bAnimationComplete+' : bAudioComplete = '+this.bAudioComplete+' : '+(this.bAnimationComplete && this.bAudioComplete))
        return (this.bAnimationComplete && this.bAudioComplete);
    };
    SwiffyWidget.prototype.isPlaying                    = function(e){
        return this.bPlaying;
    };

    SwiffyWidget.prototype.invalidate						= function () {
		this.oSwiffy.api.stop();
		AudioManager.stop();
		removePositionUpdateInterval.call(this);
		removeSwiffyAPIListeners.call(this);
		removeAudioPanelListeners.call(this);
	};
    SwiffyWidget.prototype.destroy						= function () {
    	//console.log('SwiffyWidget.destroy() | ');
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

        this.oSwiffy.api.stop();
        this.oSwiffy.api.gotoAndStop(1);

        AudioManager.stop();
        //AudioManager.clearLastPlayedAudio();
		
		this.oSwiffy.destroy();

		
		this.oSwiffy = null;
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
    SwiffyWidget.prototype.toString						= function () {
        return 'component/SwiffyWidget';
    };

    return SwiffyWidget;
});