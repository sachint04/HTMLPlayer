define([

], function(){
    'use trict';

    function SwiffyController(){
        this.oAudioPanel = null;
        this.oSwiffyComponent = null;
		
		return this;
    }

    SwiffyController.prototype.registerSwiffy = function(p_oSwiffyComponent){
        this.oSwiffyComponent = p_oSwiffyComponent;
        register.call(this);
    };
    SwiffyController.prototype.registerAudioPanel = function(p_oAudioPanel){
        this.oAudioPanel = p_oAudioPanel;
        register.call(this);
    };
	SwiffyController.prototype.autoPlay = function(){
		if(this.oAudioPanel && this.oSwiffyComponent){
			this.oAudioPanel.play();
		}
    };
    SwiffyController.prototype.destroy = function(){
        try{
            this.oAudioPanel.destroy();
            this.oSwiffyComponent.destroy();
        }catch(e){}
        this.oAudioPanel = null;
        this.oSwiffyComponent = null;
    };

    function register(){
        if(this.oAudioPanel && this.oSwiffyComponent){
            this.oAudioPanel.listenTo(this.oSwiffyComponent);
            this.oSwiffyComponent.registerAudioPanel(this.oAudioPanel);
        }
    }

    return SwiffyController;
})
