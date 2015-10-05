define([
    'jqueryui',
    'component/SwiffyWidget',
    /*'component/uicomponent/AbstractUIComponent',*/
    'component/AbstractComponent',
    /*'core/PopupManager',*/
    'core/AudioManager',
    'util/StringUtil',
    'util/LoaderUtil',
    'util/MessageLogger'
], function(jqueryui, SwiffyWidget, AbstractComponent/*AbstractUIComponent, PopupManager*/, AudioManager, StringUtil, LoaderUtil, Logger) {
    //var __instanceAudioPanel;

    function AudioPanel() {
        //console.log('AudioPanel.CONSTRUCTOR() ');
        AbstractComponent.call(this);

        this.$playBtn;
        this.$pauseBtn;
        this.$replayBtn;
        this.$stopBtn;
        this.$muteBtn;
        this.$unmuteBtn;
        this.$transcriptBtn;

        this.$playheadSlider;
        this.$volumeSlider;

        this.nVolumeLevel;

        this.oEventDS	= {
				play		: 'PLAY',
				pause		: 'PAUSE',
				replay		: 'REPLAY',
				stop		: 'STOP',
				mute		: 'MUTE',
				unmute		: 'UNMUTE',
				transcript	: 'SHOW_AUDIO_TRANSCRIPT',
				playheadSeek: {
				    start	: 'PLAYHEAD_SEEK_START',
				    end     : 'PLAYHEAD_SEEK_END'
				},
				volumeSeek	: 'SEEK_VOLUME',
        };

        this.showAudioControls = this.showAudioControls.bind(this),
        this.updateStates = this.updateStates.bind(this);
        //this.handleSwiffyAnimationUpdates = this.handleSwiffyAnimationUpdates.bind(this);
		this.popupEventHandler = this.popupEventHandler.bind(this);

        this.oSwiffyAnimRef;

        return this;
    }

    AudioPanel.prototype									= Object.create(AbstractComponent.prototype);
    AudioPanel.prototype.constructor						= AudioPanel;

    AudioPanel.prototype.listenTo                           = function(p_oSwiffyWidget){
        console.log("AudioPanel.listenTo() | "/*+(p_oSwiffyWidget instanceof SwiffyWidget)*/);
        if(p_oSwiffyWidget.toString().indexOf('SwiffyWidget') > -1){
            removeAudioManagerListeners.call(this);
            this.oSwiffyAnimRef = p_oSwiffyWidget;
            addSwiffyListeners.call(this);
            return true;
        }
        removeSwiffyListeners.call(this);
        this.oSwiffyAnimRef = null;
        addAudioManagerListeners.call(this);
        return false;
    };

    function addAudioManagerListeners(){
        //AudioManager.addEventListener('AUDIO_ADDED', this.showAudioControls);
        //AudioManager.addEventListener('AUDIO_LIST_CLEARED', this.showAudioControls);

        AudioManager.addEventListener('AUDIO_PLAY', this.updateStates);
        AudioManager.addEventListener('AUDIO_PAUSE', this.updateStates);
        AudioManager.addEventListener('AUDIO_RESUME', this.updateStates);
        AudioManager.addEventListener('AUDIO_POSITION_UPDATE', this.updateStates);
        AudioManager.addEventListener('AUDIO_STOPPED', this.updateStates);
        AudioManager.addEventListener('AUDIO_FINISH', this.updateStates);

        /*
        AudioManager.addEventListener('AUDIO_VOULME_UPDATE', this.updateStates);
        AudioManager.addEventListener('AUDIO_MUTE', this.updateStates);
        AudioManager.addEventListener('AUDIO_UNMUTE', this.updateStates);*/
    };
    function removeAudioManagerListeners(){
        //AudioManager.removeEventListener('AUDIO_ADDED', this.showAudioControls);
        //AudioManager.removeEventListener('AUDIO_LIST_CLEARED', this.showAudioControls);

        AudioManager.removeEventListener('AUDIO_PLAY', this.updateStates);
        AudioManager.removeEventListener('AUDIO_PAUSE', this.updateStates);
        AudioManager.removeEventListener('AUDIO_RESUME', this.updateStates);
        AudioManager.removeEventListener('AUDIO_POSITION_UPDATE', this.updateStates);
        AudioManager.removeEventListener('AUDIO_STOPPED', this.updateStates);
        AudioManager.removeEventListener('AUDIO_FINISH', this.updateStates);

        /*
        AudioManager.removeEventListener('AUDIO_VOULME_UPDATE', this.updateStates);
        AudioManager.removeEventListener('AUDIO_MUTE', this.updateStates);
        AudioManager.removeEventListener('AUDIO_UNMUTE', this.updateStates);*/
    };

    function addSwiffyListeners(){
        console.log("AudioPanel.addSwiffyListeners() | ");
        if(this.oSwiffyAnimRef){
            this.oSwiffyAnimRef.addEventListener('ANIMATION_PLAY', this.updateStates);
            this.oSwiffyAnimRef.addEventListener('ANIMATION_PAUSE', this.updateStates);
            this.oSwiffyAnimRef.addEventListener('ANIMATION_RESUME', this.updateStates);
            this.oSwiffyAnimRef.addEventListener("ANIMATION_POSITION_UPDATE", this.updateStates);
            this.oSwiffyAnimRef.addEventListener('ANIMATION_STOPPED', this.updateStates);
            this.oSwiffyAnimRef.addEventListener('ANIMATION_COMPLETE', this.updateStates);
        }
    }
    function removeSwiffyListeners(){
        //console.log("AudioPanel.removeSwiffyListeners() | ");
        if(this.oSwiffyAnimRef){
            this.oSwiffyAnimRef.removeEventListener('ANIMATION_PLAY', this.updateStates);
            this.oSwiffyAnimRef.removeEventListener('ANIMATION_PAUSE', this.updateStates);
            this.oSwiffyAnimRef.removeEventListener('ANIMATION_RESUME', this.updateStates);
            this.oSwiffyAnimRef.removeEventListener("ANIMATION_POSITION_UPDATE", this.updateStates);
            this.oSwiffyAnimRef.removeEventListener('ANIMATION_STOPPED', this.updateStates);
            this.oSwiffyAnimRef.removeEventListener('ANIMATION_COMPLETE', this.updateStates);
        }
    }

    function handleSwiffyAnimationUpdates(e){
        //console.log("AudioPanel.handleSwiffyAnimationUpdates() | Type = "+e.type+" : Target = "+e.target);
        var sEventType = e.type;
        switch(sEventType){
            case 'ANIMATION_PLAY':

                break;
            case 'ANIMATION_PAUSE':

                break;
            case 'ANIMATION_RESUME':

                break;
            case 'ANIMATION_POSITION_UPDATE':
                /*
                 * jQueryUI slider      = ?                 - 100
                 * Flash Current Frame  = e.currentFrame    - e.totalFrames
                 */
                var val = e.currentFrame * 100 / e.totalFrames;
                //console.log('Flash Position = '+e.currentFrame+' : '+e.totalFrames+' : '+val);
                this.$playheadSlider.slider("value", val);
                break;
            case 'ANIMATION_STOPPED':

                break;
            case 'ANIMATION_COMPLETE':
                this.enable(this.$stopBtn, false);
                this.$playBtn.removeClass('hide');
                this.$pauseBtn.addClass('hide');
                this.$playheadSlider.slider("value", 0);
                break;
        }
    }

    AudioPanel.prototype.getComponentConfig					= function() {
		//console.log('AudioPanel.getComponentConfig() | ');
		return {
			/*TODO: Implement any default configurations*/
		};
	};
    AudioPanel.prototype.init								= function(p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('AudioPanel.init() | p_sID = ' + p_sID + ' : p_oConfig = ' + JSON.stringify(p_oConfig)+' : p_$xmlComponent = '+p_$xmlComponent[0]);

		AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
    };
    AudioPanel.prototype.createComponent					= function(){
		console.log('AudioPanel.createComponent() | '+this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view);
	    var oScope = this;
	    LoaderUtil.loadResource([this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view], function(data){
	        onViewLoaded.call(oScope, data);
	    })
	};
	function onViewLoaded(data){
        this.$component.append(data[0]);
        if(this.$xmlData.item){
            if(this.$xmlData.item.length === undefined){
                this.$xmlData.item = [this.$xmlData.item];
            }
            var aItems = this.$xmlData.item,
                i;

            for(i=0; i<aItems.length; i++){
                this.bindHandlers(aItems[i]);
            }
        }

        this.initialize();
        this.dispatchComponentLoadedEvent();
	}
	AudioPanel.prototype.addAriaRoles						= function(p_sType, p_$elem, p_sText, xmlNode, p_bAvailable){
		//console.log('AudioPanel.addAriaRoles() | ');
		if (p_sType === 'button') {
            p_$elem.attr({
            	'aria-role': 'button',
                'role': 'button',
                'data-available': p_bAvailable,
                'aria-labelledby': p_sText/*,
				'aria-hidden': 'true'*/
            });
        }
	};
	AudioPanel.prototype.bindHandlers						= function(p_oItem){
		var oItem = p_oItem,
            sItemId = oItem._id,
            sItemType = oItem._type.toUpperCase(),
            bItemAvailable = StringUtil.sanitizeValue(oItem._available),
            $elem = this.$component.find('#'+sItemId);
		//console.log('AudioPanel.bindHandlers() | '+ sItemType+ ' | sItemId = '+sItemId);
        if(!bItemAvailable){
            $elem.addClass('hide');
        }
		var oScope	= this,
			sEventToDispatch;

		if(sItemType === 'BUTTON'){
			if(sItemId.indexOf('play') > -1 && sItemId.indexOf('replay') === -1){this.$playBtn = $elem; sEventToDispatch = this.oEventDS.play;}
			if(sItemId.indexOf('pause') > -1){this.$pauseBtn = $elem; sEventToDispatch = this.oEventDS.pause;}
			if(sItemId.indexOf('replay') > -1){this.$replayBtn = $elem; sEventToDispatch = this.oEventDS.replay;}
			if(sItemId.indexOf('stop') > -1){this.$stopBtn = $elem; sEventToDispatch = this.oEventDS.stop;}
			if(sItemId.indexOf('mute') > -1 && sItemId.indexOf('unmute') < 0){this.$muteBtn = $elem; sEventToDispatch = this.oEventDS.mute;}
			if(sItemId.indexOf('unmute') > -1){this.$unmuteBtn = $elem; sEventToDispatch = this.oEventDS.unmute;}
			if(sItemId.indexOf('transcript') > -1){this.$transcriptBtn = $elem; sEventToDispatch = this.oEventDS.transcript;}

			$elem.on('click', function(e) {
	            oScope.handleUIEvents(e, this, sEventToDispatch);
	        });
		}

		if(sItemType === 'SLIDER'){
			if(sItemId.indexOf('playhead_seek') > -1){
			    this.$playheadSlider = $elem;
			    //this.$sliderTrack = $elem.find('.ui-slider-range');
			    sEventToDispatch = this.oEventDS.playheadSeek;
		    }
			if(sItemId.indexOf('volume_seek') > -1){
			    this.$volumeSlider = $elem;
			    //this.$sliderTrack = $elem.find('.ui-slider-range');
			    sEventToDispatch = this.oEventDS.volumeSeek;
		    }

			var oScope				= this,
				bSeekingAvailable	= StringUtil.sanitizeValue(oItem._seeking, false),
				sDirection			= StringUtil.sanitizeValue(oItem._direction, 'horizontal'),
				// set up the slider options for the jQuery UI slider
				sliderOptions	= {
					value			: 0,
					step			: 1,
					orientation		: sDirection,
					range			: 'min',
					min				: 0,
					max				: 100
				};

			if(bSeekingAvailable){
				sliderOptions.start	= function(e, ui){
					oScope.handleUIEvents(e, this, sEventToDispatch.start);
				};
				sliderOptions.stop	= function(e, ui){
					oScope.handleUIEvents(e, this, sEventToDispatch.end);
				};

				/*sliderOptions.change		= function(e, ui){
					oScope.handleUIEvents(e, this, sEventToDispatch.end);
				};*/
			}else{
				sliderOptions.start			= function(e, ui){
					/* Stop the drag event for the slider */
					oScope.preventDefaults(e);
				};
			}

			// init the jQuery UI slider
			$elem.slider(sliderOptions);

			if(!bSeekingAvailable){
				$elem.css('cursor', 'default');
				$elem.find('.ui-slider-range').on('mousedown', function(e){
					oScope.preventDefaults(e);
				}).on('touchstart', function(e){
					oScope.preventDefaults(e);
				});
				$elem.find('.ui-slider-handle').on('mousedown', function(e){
					oScope.preventDefaults(e);
				}).on('touchstart', function(e){
					oScope.preventDefaults(e);
				});
				$elem.on('mousedown', function(e){
					oScope.preventDefaults(e);
				}).on('touchstart', function(e){
					oScope.preventDefaults(e);
				});
			}
		}
	};
	AudioPanel.prototype.initialize							= function(p_sType, p_sID, p_$elem, xmlNode){
		//console.log('AudioPanel.initialize() | ');
		this.$pauseBtn.addClass('hide');
		//this.$unmuteBtn.addClass('hide');
	};

	AudioPanel.prototype.handleUIEvents						= function(p_oEvent, p_domBtn, p_sEventToDispatch) {
		console.log('AudioPanel.handleUIEvents() | p_sEventToDispatch = '+p_sEventToDispatch/*+' : '+p_oEvent.type+' : Target = '+p_oEvent.target+' : Curr Target = '+p_oEvent.currentTarget*/);
		if(p_oEvent.type !== 'slidechange' && p_oEvent.type !== 'slidestart' && p_oEvent.type !== 'slideend'){
	        p_oEvent.preventDefault();
	        p_domBtn.blur();
        }
		if (!$(p_domBtn).hasClass('inactive') && !$(p_domBtn).hasClass('disabled')) {
            if (p_sEventToDispatch) {
                var e = {};
	        	switch(p_sEventToDispatch){
					case 'PLAY':
					case 'PAUSE':{
					    /* We just dispatch an Event Here as The UI Component doesn't know which audio to play*/
				        break;
					}
					case 'STOP':{
                        AudioManager.stop();
                        if(this.oSwiffyAnimRef){this.oSwiffyAnimRef.stop();}
						break;
					}
					case 'MUTE':{
						// ** Internally store the volume in a variable
                        this.nVolumeLevel = AudioManager.getVolume();
                        // DOES NOT work on iPad, hence used "setVolume"
                        AudioManager.mute(true);
                        AudioManager.setVolume(0);
				        break;
					}
					case 'UNMUTE':{
						// DOES NOT work on iPad, hence used "setVolume"
                        AudioManager.mute(false);
                        AudioManager.setVolume(this.nVolumeLevel);
				        break;
					}
					case 'PLAYHEAD_SEEK_START':{
					    if(this.oSwiffyAnimRef){
                            /*if(!this.oSwiffyAnimRef.isPlaying()){
                                this.preventDefaults(p_oEvent);
                                return;
                            }*/
                        }else{
                            if (AudioManager.isCompleted()) {
                                this.preventDefaults(p_oEvent);
                                return;
                            }
                        }
				        break;
					}
					case 'PLAYHEAD_SEEK_END':{
						if(this.oSwiffyAnimRef){
							//if(!this.oSwiffyAnimRef.isPlaying()){
								//this.preventDefaults(p_oEvent);
								//return;
							//}
						}else{
							if (AudioManager.isCompleted()) {
								this.preventDefaults(p_oEvent);
								return;
							}
						}
				        var nPlayheadPosition = this.$playheadSlider.slider('value');
				        e.playheadPosition = nPlayheadPosition;
				        break;
					}
					case 'SEEK_VOLUME':{
						var nVolume = this.$volumeSlider.slider('value');
                        //console.log('Volume Val = '+nVolume);
                        AudioManager.setVolume(nVolume);//Valid Range between 0 - 100
                        e.volume = nVolume;
				        break;
					}
					case 'SHOW_AUDIO_TRANSCRIPT':{
						this.openPopup('transcript', 'Transcript', AudioManager.getTranscript(), this.$transcriptBtn);
				        break;
					}
				}
                $.extend(e, {type: p_sEventToDispatch, target: this});
                this.dispatchEvent(p_sEventToDispatch, e);
            }
            return true;
        }
        return false;
    };

	AudioPanel.prototype.updateStates						= function(e) {
		var sEventType = e.type;
		/*if(this.oSwiffyAnimRef !== undefined && this.oSwiffyAnimRef !== null && (sEventType === 'AUDIO_FINISH' || sEventType === 'AUDIO_POSITION_UPDATE')){
		    //** The Position will be mapped to the flash timeline
            return;
		}*/
		if(sEventType !== 'AUDIO_POSITION_UPDATE'){
			//console.log('AudioPanel.updateStates() | Event Type = '+sEventType+' AM Playing = '+AudioManager.isPlaying()+' : AM Complete = '+AudioManager.isCompleted());
		}
        console.log('AudioPanel.updateStates() | Event Type = '+sEventType);
		switch(sEventType){
			case 'AUDIO_PLAY':
			case 'AUDIO_PAUSE':
			case 'AUDIO_RESUME':

			case 'ANIMATION_PLAY':
			case 'ANIMATION_PAUSE':
			case 'ANIMATION_RESUME':
                this.enable(this.$stopBtn, true);
                if(this.oSwiffyAnimRef){
                    if(this.oSwiffyAnimRef.isPlaying()){
                        this.$playBtn.addClass('hide');
                        this.$pauseBtn.removeClass('hide');
                    }else{
                        this.$playBtn.removeClass('hide');
                        this.$pauseBtn.addClass('hide');
                    }
                }else{
                    if (AudioManager.isPlaying()) {
                        this.$playBtn.addClass('hide');
                        this.$pauseBtn.removeClass('hide');
                    } else {
                        this.$playBtn.removeClass('hide');
                        this.$pauseBtn.addClass('hide');
                    }
                }
		        break;
			case 'AUDIO_POSITION_UPDATE':
                /*
                 * jQueryUI slider  = ?             - 100
                 * Audio Position   = e.position    - AudioManager.getDuration()
                 */
                var val = e.position * 100 / AudioManager.getDuration();
                //console.log('Audio Position = '+e.position+' : '+AudioManager.getDuration()+' : '+val);
                this.$playheadSlider.slider("value", val);
		        break;
		    case 'ANIMATION_POSITION_UPDATE':
                /*
                 * jQueryUI slider      = ?                 - 100
                 * Flash Current Frame  = e.currentFrame    - e.totalFrames
                 */
                var val = e.currentFrame * 100 / e.totalFrames;
                //console.log('Flash Position = '+e.currentFrame+' : '+e.totalFrames+' : '+val);
                this.$playheadSlider.slider("value", val);
                break;
			case 'AUDIO_STOPPED':
			case 'ANIMATION_STOPPED':
                this.enable(this.$stopBtn, false);
                this.$playBtn.removeClass('hide');
                this.$pauseBtn.addClass('hide');
                this.$playheadSlider.slider( "value", 0 );
		        break;
			case 'AUDIO_FINISH':
			case 'ANIMATION_COMPLETE':
                this.enable(this.$stopBtn, false);
                this.$playBtn.removeClass('hide');
                this.$pauseBtn.addClass('hide');
                this.$playheadSlider.slider("value", 0);
		        break;
			case 'AUDIO_MUTE':
				this.$muteBtn.addClass('hide');
                this.$unmuteBtn.removeClass('hide');
		        break;
			case 'AUDIO_UNMUTE':
				this.$muteBtn.removeClass('hide');
                this.$unmuteBtn.addClass('hide');
		        break;
			case 'AUDIO_VOULME_UPDATE':
				/* TODO: This implementation will only be required if the volume is updated by some other element from some other page through code */
                /*
                 * jQueryUI slider  = ?                         - 100
                 * Audio Volume     = AudioManager.getVolume()  - 100
                 */
                //var val = AudioManager.getVolume();
                //console.log('Audio Position = '+val);
                //this.$volumeSlider.slider("value", val);
		        break;
		}
    };

    function playClick(){
        console.log('AudioPanel.playClick() | \n\tAM Playing = '+AudioManager.isPlaying());
        this.enable(this.$stopBtn, true);
        //if (AudioManager.isPlaying() && (this.oSwiffyAnimRef && !this.oSwiffyAnimRef.isPlaying() && !this.oSwiffyAnimRef.isComplete())) {
            this.$playBtn.addClass('hide');
            this.$pauseBtn.removeClass('hide');
        //}
    }
    function pauseClick(){
        console.log('AudioPanel.pauseClick() | ');
        /* We just dispatch an Event Here as The UI Component doesn't know which audio to play*/
        this.enable(this.$stopBtn, true);
        this.$playBtn.removeClass('hide');
        this.$pauseBtn.addClass('hide');
    }
    function stopClick(){
        console.log('AudioPanel.stopClick() | ');
        AudioManager.stop();
        if(this.oSwiffyAnimRef){this.oSwiffyAnimRef.stop();}

        this.enable(this.$stopBtn, false);
        this.$playBtn.removeClass('hide');
        this.$pauseBtn.addClass('hide');
        this.$playheadSlider.slider( "value", 0 );
    }
    function muteClick(p_bMute){
        console.log('AudioPanel.muteClick() | ');
        if(p_bMute){
            // ** Internally store the volume in a variable
            this.nVolumeLevel = AudioManager.getVolume();
            // DOES NOT work on iPad, hence used "setVolume"
            AudioManager.mute(true);
            AudioManager.setVolume(0);

            this.$muteBtn.addClass('hide');
            this.$unmuteBtn.removeClass('hide');
        }else{
            // DOES NOT work on iPad, hence used "setVolume"
            AudioManager.mute(false);
            AudioManager.setVolume(this.nVolumeLevel);

            this.$muteBtn.removeClass('hide');
            this.$unmuteBtn.addClass('hide');
        }
    }
    function seekAnimation(e){
        /* TODO: Audio seeking implementation */
    }
    function seekAudio(){
        var nVolume = this.$volumeSlider.slider('value');
        //console.log('Volume Val = '+nVolume);
        AudioManager.setVolume(nVolume);//Valid Range between 0 - 100
    }

    function audioPositionUpdate(e){
        console.log('AudioPanel.audioPositionUpdate() | ');
        /*
         * jQueryUI slider  = ?             - 100
         * Audio Position   = e.position    - AudioManager.getDuration()
         */
        var val = e.position * 100 / AudioManager.getDuration();
        //console.log('Audio Position = '+e.position+' : '+AudioManager.getDuration()+' : '+val);
        this.$playheadSlider.slider("value", val);
    }
    function audioVolumeUpdate(e){
        console.log('AudioPanel.audioVolumeUpdate() | ');
        /* TODO: This implementation will only be required if the volume is updated by some other element from some other page through code */
        /*
         * jQueryUI slider  = ?                         - 100
         * Audio Volume     = AudioManager.getVolume()  - 100
         */
        //var val = AudioManager.getVolume();
        //console.log('Audio Position = '+val);
        //this.$volumeSlider.slider("value", val);
    }

    // ** Public Methods
    AudioPanel.prototype.play                               = function(){
        playClick.call(this)
    };
    AudioPanel.prototype.pause                              = function(){
        pauseClick.call(this)
    };
    AudioPanel.prototype.stop                               = function(){
        stopClick.call(this);
    };
    AudioPanel.prototype.mute                               = function(p_bMute){
        muteClick.call(this, p_bMute);
    };
    AudioPanel.prototype.setVolume                          = function(p_nVol){
        AudioManager.setVolume(p_nVol);
    };
    AudioPanel.prototype.getVolume                          = function(){
        return AudioManager.getVolume();
    };

	AudioPanel.prototype.showAudioControls					= function(e) {
        //console.log('AudioPanel.showAudioControls() | Panel Hidden = ' + this.$audioPanel.hasClass('hide') + ' : Event Type = ' + e.type);
        //this.$audioPanel.stop();
        if (e.type == 'AUDIO_ADDED') {
            this.$transcriptBtn.addClass('in');
            this.$audioBtn.addClass('in');
            this.$transcriptBtn.removeClass('out');
            this.$audioBtn.removeClass('out');
        } else {
            $("#ios_play").addClass("hide");
            this.$transcriptBtn.removeClass('in');
            this.$audioBtn.removeClass('in');
            this.$transcriptBtn.addClass('out');
            this.$audioBtn.addClass('out');

        }
    };
	AudioPanel.prototype.enableAudioControls				= function(p_bEnable) {
        if (p_bEnable) {
            this.$playBtn.removeClass('disabled');
            this.$pauseBtn.removeClass('disabled');
        } else {
            this.$playBtn.addClass('disabled');
            this.$pauseBtn.addClass('disabled');
        }
    };
    AudioPanel.prototype.enable								= function(p_$btn, p_bEnable){
		/* TODO: Enable / Disable Audio buttons and sliders */
    };
    AudioPanel.prototype.addClass							= function(p_sClassName){
		this.$component.addClass(p_sClassName);
		this.$component.children().each(function(i, elem){
			var $elem = $(this),
				bAvailable = StringUtil.sanitizeValue($elem.attr('data-available'));
			if(bAvailable){$(this).addClass(p_sClassName);}
		});
		this.updateStates({type:"AUDIO_PLAY"});
		return this.$component;
	};
	AudioPanel.prototype.removeClass							= function(p_sClassName){
		this.$component.removeClass(p_sClassName);
		this.$component.children().each(function(i, elem){
			var $elem = $(this),
				bAvailable = StringUtil.sanitizeValue($elem.attr('data-available'));
			if(bAvailable){$(this).removeClass(p_sClassName);}
		});
		this.updateStates({type:"AUDIO_PLAY"});
		return this.$component;
	};

    AudioPanel.prototype.openPopup						= function(p_sPopupID, p_sTitle, p_sContent, p_$returnFocusTo, p_sClassesToAdd, p_fCallback, p_aArgs) {
        console.log('AudioPanel.openPopup() | '+p_sPopupID, p_sTitle, p_sContent, p_$returnFocusTo, p_sClassesToAdd);
        oPopup = PopupManager.openPopup(p_sPopupID, {txt_title: p_sTitle, txt_content: p_sContent}, p_$returnFocusTo, p_sClassesToAdd);
        oPopup.addEventListener('POPUP_CLOSE', this.popupEventHandler);
        oPopup.addEventListener('POPUP_EVENT', this.popupEventHandler);
        if (p_fCallback) {
            oPopup.setCallback(this, p_fCallback, p_aArgs);
        }
        return oPopup;
    };
    AudioPanel.prototype.closePopup					= function(p_sPopupID) {
        //console.log('AudioPanel.closePopup() | '+p_sPopupID);
        return true;
    };

    AudioPanel.prototype.popupEventHandler				= function(e) {
        var sEventType = e.type,
            oPopup = e.target,
            sPopupID = oPopup.getID();
        //console.log('AudioPanel.popupEventHandler() | Event Type = '+sEventType+' : Popup ID = '+sPopupID+' : Event Src = '+e.eventSrc);

        if (sEventType === 'POPUP_EVENT' || sEventType === 'POPUP_CLOSE') {
            oPopup.removeEventListener('POPUP_CLOSE', this.popupEventHandler);
            oPopup.removeEventListener('POPUP_EVENT', this.popupEventHandler);
            if (sEventType === 'POPUP_EVENT') {
                PopupManager.closePopup(sPopupID);
            }
            $(window).focus();
        }
    };

	AudioPanel.prototype.preventDefaults					= function(e){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
	};
    AudioPanel.prototype.destroy							= function() {
		this.popupEventHandler	= null;
		this.prototype			= null;

		AbstractComponent.prototype.destroy.call(this);
    };
    AudioPanel.prototype.toString							= function() {
		return 'component/AudioPanel';
	};

    /*if(!__instanceAudioPanel){
        __instanceAudioPanel = new AudioPanel();
        //console.log('^^^^^^^^^^^^ AUDIO PANEL INSTANCE ^^^^^^^^^^^^^^ '+__instanceAudioPanel);
    }

    return __instanceAudioPanel;*/
    return AudioPanel;
});