define([
	'controller/SwiffyController',
	'model/Constants',
	'util/LoaderUtil'
], function(SwiffyController, Constants, LoaderUtil){
    'use trict';

    function ApplicationController(p_oAbstractPageReference){
        SwiffyController.call(this);
		this.oRefToCourseController  = null;
		this.oApplicationPanel = null;
		this.handelApplicationPanelClickEvents = handelApplicationPanelClickEvents.bind(this);
        var oScope = this;
        if(this.oRefToCourseController === null){
			require([
				'controller/CourseController'
			], function(CourseController){
				oScope.oRefToCourseController = CourseController;
			});
		}
		this.showApplicationPanel = showApplicationPanel.bind(this);
		p_oAbstractPageReference.addEventListener('PAGE_LOADED', this.showApplicationPanel);
		return this;
    }
	
	ApplicationController.prototype									= Object.create(SwiffyController.prototype);
    ApplicationController.prototype.constructor						= ApplicationController;

    ApplicationController.prototype.registerSwiffy = function(p_oSwiffyComponent){
        SwiffyController.prototype.registerSwiffy.call(this, p_oSwiffyComponent);
    };
    ApplicationController.prototype.registerAudioPanel = function(p_oAudioPanel){
        SwiffyController.prototype.registerAudioPanel.call(this, p_oAudioPanel);
    };
	ApplicationController.prototype.registerApplicationPanel = function(p_oApplicationPanel){
		this.oApplicationPanel = p_oApplicationPanel;
		this.oApplicationPanel.show(false);
		// Add listeners for swapping the pages
		this.oApplicationPanel.addEventListener('APPLICATION_PANEL_BUTTON_CLICK', this.handelApplicationPanelClickEvents);
    };
	ApplicationController.prototype.registerApplicationPanelStatic = function(p_oApplicationPanelStatic){
		this.oApplicationPanel = p_oApplicationPanelStatic;
		this.oApplicationPanel.show(false);
    };
	
	function handelApplicationPanelClickEvents(e){
		var oScope = this,
			sButtonId = $(e.button).attr('id'),
			sCurrentPageName = Constants.getCurrentPageName(),
			sApplicationPageName = getApplicationFileName.call(this, sCurrentPageName),
			sCurrentPageType = Constants.getCurrentPageType(),
			sTutoral = sApplicationPageName,
			sFormulae = sApplicationPageName + '_FO',
			sSolution = sApplicationPageName + '_FS',
			bDrawClonePage = true/*(this.oAudioPanel !== null || this.oSwiffyComponent !== null)*/;
		//console.log('ApplicationController.handelApplicationPanelClickEvents() | '+sButtonId);
		if(sButtonId === 'btn_see_tutorial'){
			if(sCurrentPageName === sTutoral){return;}
			this.oRefToCourseController.loadPage(sTutoral, sCurrentPageType, bDrawClonePage);
		}
		if(sButtonId === 'btn_see_formulae'){
			if(sCurrentPageName === sFormulae){return;}
			this.oRefToCourseController.loadPage(sFormulae, sCurrentPageType, bDrawClonePage);
		}
		if(sButtonId === 'btn_see_solution'){
			if(sCurrentPageName === sSolution){return;}
			this.oRefToCourseController.loadPage(sSolution, sCurrentPageType, bDrawClonePage);
		}
	}
	
	function getApplicationFileName(p_sCurrentPageName){
		var sCurrentPageName = p_sCurrentPageName,
			nFOIndex = sCurrentPageName.lastIndexOf('_FO'),
			nFSIndex = sCurrentPageName.lastIndexOf('_FS');
		if(
			(nFOIndex > -1 && nFOIndex === (sCurrentPageName.length-3)) || 
			(nFSIndex > -1 && nFSIndex === (sCurrentPageName.length-3))
		){
			sCurrentPageName = sCurrentPageName.substring(0, sCurrentPageName.length-3);
		}
		return sCurrentPageName;
	}
	
	function getSelectedButton(){
		var sCurrentPageName = Constants.getCurrentPageName(),
			nFOIndex = sCurrentPageName.lastIndexOf('_FO'),
			nFSIndex = sCurrentPageName.lastIndexOf('_FS');
		if((nFOIndex > -1 && nFOIndex === (sCurrentPageName.length-3))){
			return 'btn_see_formulae';
		}
		if((nFSIndex > -1 && nFSIndex === (sCurrentPageName.length-3))){
			return 'btn_see_solution';
		}
		return 'btn_see_tutorial';
	}
	
    ApplicationController.prototype.destroy = function(){
		try{
			this.oApplicationPanel.destroy();
		}catch(e){};
		this.oApplicationPanel = null;
		this.handelApplicationPanelClickEvents = null;
		SwiffyController.prototype.destroy.call(this);
    };

    function showApplicationPanel(e){
		e.currentTarget.removeEventListener('PAGE_LOADED', this.showApplicationPanel);
        //if(this.oAudioPanel && this.oSwiffyComponent && this.oApplicationPanel){
			try{
				this.oApplicationPanel.setSelected(getSelectedButton.call(this), true);
			}catch(e){}
			this.oApplicationPanel.show(true);
        //}
    }

    return ApplicationController;
});