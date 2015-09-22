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
		this.bAudioListenersAdded;
		this.sLastPlayedAudio;
		this.nPositionUpdate;
		this.bAudioComplete;
		//** NOT_STARTED | IN_PROGRESS | PAUSED | COMPLETED
		this.bPlaying;

		this.bCueAudioComplete;
		this.bCueAnimComplete;
		this.bAnimationComplete;
		// Stores the info of the seeked position when in pause state; for playing the next time
		this.oSeekInfo;
		// Stores the info of the event dispatched at "ANIMATION_CUE_END" when the player is seeked in a paused state
		this.oCueCompleteEventInfo;

		this.handleAudioPanelEvents = handleAudioPanelEvents.bind(this);

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
        var oScope = this;
        p_oConfig.soundID = p_oConfig._soundID.split(' ').join('').split(',');
        //console.log('SwiffyWidget.init() | p_oConfig.soundID = '+p_oConfig.soundID);
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
        console.log('SwiffyWidget.initialize() | '+this+' : Swiffy ID = '+this.getComponentID());
        this.jsonSwiffy = JSON.parse(this.$xmlData.__cdata);
        this.initiateSwiffy();
        this.bAudioListenersAdded = true;
    };

    SwiffyWidget.prototype.initiateSwiffy					= function () {
		console.log('SwiffyWidget.initiateSwiffy() | Swiffy Obj = '+this.oSwiffy+ ' : Frame Count = '+ this.jsonSwiffy.frameCount+' : Swiffy ID = '+this.getComponentID());
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
                if(oScope.oSwiffy.api != null){
                    clearInterval(oScope.nSwiffyReadyInterval);
                    console.log('SwiffyWidget.initiateSwiffy() | API loaded');
                    onSwiffyAPILoaded.call(oScope);

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
        var oScope = this;
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
        var oScope = this;
        this.oAudioPanel.removeEventListener("UPDATE", function(e){
            handleAudioPanelEvents.call(oScope, e);
        });
        AudioManager.removeEventListener('AUDIO_FINISH', function(e){
            handleAudioPanelEvents.call(oScope, e);
        });
        /*
        this.oAudioPanel.removeEventListener("PLAY", function(e){
            handleAudioPanelEvents.call(oScope, e);
        });
        this.oAudioPanel.removeEventListener("PAUSE", function(e){
            handleAudioPanelEvents.call(oScope, e);
        });
        this.oAudioPanel.removeEventListener("STOP", function(e){
            handleAudioPanelEvents.call(oScope, e);
        });
        this.oAudioPanel.removeEventListener("REPLAY", function(e){
            handleAudioPanelEvents.call(oScope, e);
        });
        this.oAudioPanel.removeEventListener("SEEK_ANIMATION", function(e){
            handleAudioPanelEvents.call(oScope, e);
        });*/
    }
    function handleAudioPanelEvents(e){
        var sEventType = e.type;
        console.log('SwiffyWidget.handleAudioPanelEvents() |'/*+' Swiffy ID = '+this.getComponentID()*/+' : sEventType = '+sEventType);
        switch(sEventType){
            case 'PLAY':
                this.play();
                break;
            case 'PAUSE':
                this.pause();
                break;
            case 'STOP':
                this.oSwiffy.api.gotoAndStop(1);
                AudioManager.clearLastPlayedAudio();
                removePositionUpdateInterval.call(this);
                break;
            case 'REPLAY':
                this.replay();
                break;
            case 'PLAYHEAD_SEEK_START':
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
            nSwiffyGoToFrame = Math.round(this.oSwiffy.api.totalFrames * nCurrentPlayheadPosition / 100),
            aInfo = findMapIndex.call(this, this.oSwiffy.api.aFrameMap.slice(0), nSwiffyGoToFrame),
            nStartFrame = aInfo[0][0],
            nEndFrame = aInfo[0][1],
            sCurrentLabel = aInfo[0][2],

            nTotalFrames = nEndFrame - nStartFrame,
            nCurrentFrame = nSwiffyGoToFrame - nStartFrame,
            nAnimationDuration = (nCurrentFrame / 20) * 1000,
            oSound = AudioManager.getSoundByID(sCurrentLabel),
            nSoundDuration = oSound.duration,
            oScope = this;
        /*
         * 1 Sec      nTotalFrames
         * 1            20
         * ?            500
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
        if(nSwiffyGoToFrame !== nEndFrame){
            this.oSwiffy.api.bStopped = false;
        }
        if(this.bPlaying){
            this.oSwiffy.api.gotoAndPlay(nSwiffyGoToFrame);
        }else{
            this.oSwiffy.api.gotoAndStop(nSwiffyGoToFrame);
        }
        console.log('\tnSoundDuration = '+nSoundDuration+' : nAnimationDuration = '+nAnimationDuration);
        if(nSoundDuration > nAnimationDuration){
            console.log('\tbPlaying = '+this.bPlaying);
            if(this.bPlaying){
                AudioManager.playAudio(sCurrentLabel, nAnimationDuration);
            }else{
                this.oSeekInfo = {
                    audio:sCurrentLabel,
                    position: nAnimationDuration
                };
            }
        }else{
            this.bCueAudioComplete = true;
        }
        /*
                                                                        */
        console.log('SwiffyWidget.handleAudioPanelEvents() | \n\tplayheadPosition = '+nCurrentPlayheadPosition+
                                                                        '\n\tnSwiffyGoToFrame = '+nSwiffyGoToFrame+
                                                                        '\n\tnStartFrame = '+nStartFrame+
                                                                        '\n\tnEndFrame = '+nEndFrame+
                                                                        '\n\tsCurrentLabel = '+sCurrentLabel+
                                                                        '\n\tnSoundDuration = '+nSoundDuration+
                                                                        '\n\tnAnimationDuration = '+nAnimationDuration);

    }
    function findMapIndex(aMap, nSwiffyGoToFrame){
        var a = aMap;
        while(a.length > 1){
            a = temp.call(this, a, nSwiffyGoToFrame);
        }
        console.log('findMapIndex() | '+a);
        return a;
    }
    function temp(aMap, nSwiffyGoToFrame){
        //console.log('temp()');
        var index = Math.round(aMap.length / 2),
            min = aMap[index][0],
            max = aMap[index][1];
        //console.log(min+' ### '+max);
        if(nSwiffyGoToFrame < min){
            // Search to the left
            //temp.call(this, aMap.splice(0, index), nSwiffyGoToFrame);
            return aMap.splice(0, index);
        }
        if(nSwiffyGoToFrame > max){
            // Search to the right
            //temp.call(this, aMap.splice(index, aMap.length), nSwiffyGoToFrame);
            return aMap.splice(index, aMap.length);
        }
        if(nSwiffyGoToFrame >= min && nSwiffyGoToFrame <= max){
           //console.log(min+' ### RANGE FOUND ### '+max);
           return aMap.splice(index, index);
        }
    }

    // Swiffy Listeners
    function addSwiffyAPIListeners(){
        var oScope = this;
        this.oSwiffy.api.addEventListener("ANIMATION_START", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
        this.oSwiffy.api.addEventListener("ANIMATION_CUE_START", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
        this.oSwiffy.api.addEventListener("ANIMATION_CUE_END", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
        this.oSwiffy.api.addEventListener("ANIMATION_COMPLETE", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
    }
    function removeSwiffyAPIListeners(){
        var oScope = this;
        this.oSwiffy.api.removeEventListener("ANIMATION_START", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
        this.oSwiffy.api.removeEventListener("ANIMATION_CUE_START", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
        this.oSwiffy.api.removeEventListener("ANIMATION_CUE_END", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
        this.oSwiffy.api.removeEventListener("ANIMATION_COMPLETE", function(e){
            handleSwiffyAPIEvents.call(oScope, e);
        });
    }
    function handleSwiffyAPIEvents(e){
        //console.log("SwiffyWidget.handleSwiffyAPIEvents() | "+JSON.stringify(e));
        var sEventType = e.data.type;
        console.log("SwiffyWidget.handleSwiffyAPIEvents() | sEventType = "+sEventType+'\n\t'+JSON.stringify(e));
        switch(sEventType){
            case 'ANIMATION_START':
                this.bAnimationComplete = false;
                break;
            case 'ANIMATION_CUE_START':
                this.bCueAnimComplete = false;
                this.bCueAudioComplete = false;
                if(this.bPlaying){
                    AudioManager.playAudio(e.data.label);
                }
                break;
            case 'ANIMATION_CUE_END':
                this.bCueAnimComplete = true;
                this.oCueCompleteEventInfo = e;
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
        console.log('Swiffy.checkAndPlayNextCue() | bCueAnimComplete = '+this.bCueAnimComplete+' : bCueAudioComplete = '+this.bCueAudioComplete);
        if(this.bCueAnimComplete && this.bCueAudioComplete){
            //var sCurrentPlayingSoundID = e.data.label;
            var sCurrentPlayingSoundID = e.target.currentLabel,
                bIsLastAudio = isLastAudio.call(this, sCurrentPlayingSoundID);

            if(!bIsLastAudio){
                this.oSwiffy.api.play();
                AudioManager.playAudio(getNextAudio.call(this, sCurrentPlayingSoundID));
                return true;
            }
        }
        this.oCueCompleteEventInfo = null;
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
        this.nPositionUpdate = setInterval(function(e){
            onPositionUpdate.call(oScope, e);
        }, 100);
    }
    function removePositionUpdateInterval(){
        clearInterval(this.nPositionUpdate);
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
        console.log('Swiffy.play() | bStopped = '+this.oSwiffy.api.bStopped+' : bAnimationComplete = '+this.bAnimationComplete+' : oCueCompleteEventInfo = '+this.oCueCompleteEventInfo+' : '+(!this.oSwiffy.api.bStopped || this.bAnimationComplete || this.oCueCompleteEventInfo));
        if(!this.oSwiffy.api.bStopped || this.bAnimationComplete || this.oCueCompleteEventInfo){
            if(this.bAnimationComplete){
                this.replay();
                return;
            }
            if(this.oCueCompleteEventInfo){
                checkAndPlayNextCue.call(this, this.oCueCompleteEventInfo);
            }
            this.bPlaying = true;
            this.bAnimationComplete = false;
            this.oSwiffy.api.play();
            console.log('Swiffy.play() | AM Completed = '+AudioManager.isCompleted()+' : SeekInfo = '+JSON.stringify(this.oSeekInfo));
            if(!AudioManager.isCompleted() || this.oSeekInfo){
                if(this.oSeekInfo && this.oSeekInfo.audio && this.oSeekInfo.position){
                    // Handle seeking while animation paused. Play the audio that's evaluated while seeking
                    AudioManager.playAudio(this.oSeekInfo.audio, this.oSeekInfo.position);
                    this.oSeekInfo = null;
                }else{
                    // ** Play any audio that was paused
                    AudioManager.playAudio();
                }
            }
            addPositionUpdateInterval.call(this);

            dispatchCustomEvent.call(this, "ANIMATION_PLAY");
        }
    };
    SwiffyWidget.prototype.pause                        = function(){
        if(!this.oSwiffy.api.bStopped){
            this.bPlaying = false;
            this.oSwiffy.api.stop();
            AudioManager.pauseAudio();
            removePositionUpdateInterval.call(this);
            dispatchCustomEvent.call(this, "ANIMATION_PAUSE");
        }
    };

    SwiffyWidget.prototype.replay                       = function(){
        this.bPlaying = true;
        this.bAnimationComplete = false;
        this.oSwiffy.api.gotoAndPlay('start');
        addPositionUpdateInterval.call(this);
        dispatchCustomEvent.call(this, "ANIMATION_REPLAY");
    };
    SwiffyWidget.prototype.stop                         = function(){
        this.bPlaying = false;
        this.bAnimationComplete = true;
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

    SwiffyWidget.prototype.destroy						= function () {
    	//console.log('SwiffyWidget.destroy() | ');
    	// Stop any on-going animations
    	removePositionUpdateInterval.call(this);
		removeSwiffyAPIListeners.call(this);
		removeAudioPanelListeners.call(this);

		this.oSwiffy.destroy();
		this.oSwiffy = null;

		this.jsonSwiffy = null;
		this.nSwiffyReadyInterval = null;
		this.bAudioListenersAdded = null;

		this.prototype		= null;

        AbstractComponent.prototype.destroy.call(this);
    };
    SwiffyWidget.prototype.toString						= function () {
        return 'component/SwiffyWidget';
    };

    return SwiffyWidget;
});
