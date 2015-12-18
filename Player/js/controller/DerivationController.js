define([
	'controller/SwiffyController',
	'model/Constants',
	'util/LoaderUtil'
], function(SwiffyController, Constants, LoaderUtil){
    'use trict';

    function DerivationController(p_oAbstractPageReference){
        SwiffyController.call(this);
		this.oRefToCourseController  = null;
		this.oDerivationPanel = null;
		this.handelDerivationPanelClickEvents = handelDerivationPanelClickEvents.bind(this);
        var oScope = this;
        if(this.oRefToCourseController === null){
			require([
				'controller/CourseController'
			], function(CourseController){
				oScope.oRefToCourseController = CourseController;
			});
		}
		this.showDerivationPanel = showDerivationPanel.bind(this);
		p_oAbstractPageReference.addEventListener('PAGE_LOADED', this.showDerivationPanel);
		return this;
    }
	
	DerivationController.prototype									= Object.create(SwiffyController.prototype);
    DerivationController.prototype.constructor						= DerivationController;

    DerivationController.prototype.registerSwiffy = function(p_oSwiffyComponent){
        SwiffyController.prototype.registerSwiffy.call(this, p_oSwiffyComponent);
    };
    DerivationController.prototype.registerAudioPanel = function(p_oAudioPanel){
        SwiffyController.prototype.registerAudioPanel.call(this, p_oAudioPanel);
    };
	DerivationController.prototype.registerDerivationPanel = function(p_oDerivationPanel){
		this.oDerivationPanel = p_oDerivationPanel;
		this.oDerivationPanel.show(false);
		// Add listeners for swapping the pages
		this.oDerivationPanel.addEventListener('DERIVATION_PANEL_BUTTON_CLICK', this.handelDerivationPanelClickEvents);
    };
	
	function handelDerivationPanelClickEvents(e){
		var oScope = this,
			sButtonId = $(e.button).attr('id'),
			sCurrentPageName = Constants.getCurrentPageName(),
			sDerivationPageName = getDerivationFileName.call(this, sCurrentPageName),
			sCurrentPageType = Constants.getCurrentPageType(),
			sUnderstandingConcept = sDerivationPageName + '_KS',
			sAssumptions = sDerivationPageName + '_AS',
			sBeginDerivation = sDerivationPageName + '_BD',
			sAtAGlance = sDerivationPageName + '_FD',
			bDrawClonePage = true/*(this.oAudioPanel !== null || this.oSwiffyComponent !== null)*/;
		//console.log('DerivationController.handelDerivationPanelClickEvents() | '+sButtonId);
		if(sButtonId === 'btn_understand_concept'){
			if(sCurrentPageName === sUnderstandingConcept){return;}
			this.oRefToCourseController.loadPage(sUnderstandingConcept, sCurrentPageType, bDrawClonePage);
		}
		if(sButtonId === 'btn_assumptions'){
			if(sCurrentPageName === sAssumptions){return;}
			this.oRefToCourseController.loadPage(sAssumptions, sCurrentPageType, bDrawClonePage);
		}
		if(sButtonId === 'btn_begin_derivation'){
			if(sCurrentPageName === sBeginDerivation){return;}
			this.oRefToCourseController.loadPage(sBeginDerivation, sCurrentPageType, bDrawClonePage);
		}
		if(sButtonId === 'btn_at_a_glance'){
			if(sCurrentPageName === sAtAGlance){return;}
			this.oRefToCourseController.loadPage(sAtAGlance, sCurrentPageType, bDrawClonePage);
		}
	}
	
	function getDerivationFileName(p_sCurrentPageName){
		var sCurrentPageName = p_sCurrentPageName,
			nKSIndex = sCurrentPageName.lastIndexOf('_KS'),
			nASIndex = sCurrentPageName.lastIndexOf('_AS'),
			nBDIndex = sCurrentPageName.lastIndexOf('_BD'),
			nFDIndex = sCurrentPageName.lastIndexOf('_FD');
		if(
			(nKSIndex > -1 && nKSIndex === (sCurrentPageName.length-3)) || 
			(nASIndex > -1 && nASIndex === (sCurrentPageName.length-3)) ||
			(nBDIndex > -1 && nBDIndex === (sCurrentPageName.length-3)) ||
			(nFDIndex > -1 && nFDIndex === (sCurrentPageName.length-3))
		){
			sCurrentPageName = sCurrentPageName.substring(0, sCurrentPageName.length-3);
		}
		return sCurrentPageName;
	}
	
	function getSelectedButton(){
		var sCurrentPageName = Constants.getCurrentPageName(),
			nKSIndex = sCurrentPageName.lastIndexOf('_KS'),
			nASIndex = sCurrentPageName.lastIndexOf('_AS'),
			nBDIndex = sCurrentPageName.lastIndexOf('_BD'),
			nFDIndex = sCurrentPageName.lastIndexOf('_FD');
		if((nKSIndex > -1 && nKSIndex === (sCurrentPageName.length-3))){
			return 'btn_understand_concept';
		}
		if((nASIndex > -1 && nASIndex === (sCurrentPageName.length-3))){
			return 'btn_assumptions';
		}
		if((nBDIndex > -1 && nBDIndex === (sCurrentPageName.length-3))){
			return 'btn_begin_derivation';
		}
		if((nFDIndex > -1 && nFDIndex === (sCurrentPageName.length-3))){
			return 'btn_at_a_glance';
		}
	}
	
    DerivationController.prototype.destroy = function(){
        this.oDerivationPanel.destroy();
		this.oDerivationPanel = null;
		this.handelDerivationPanelClickEvents = null;
		SwiffyController.prototype.destroy.call(this);
    };

    function showDerivationPanel(e){
		e.currentTarget.removeEventListener('PAGE_LOADED', this.showDerivationPanel);
        //if(this.oAudioPanel && this.oSwiffyComponent && this.oDerivationPanel){
			this.oDerivationPanel.setSelected(getSelectedButton.call(this), true);
			this.oDerivationPanel.show(true);
        //}
    }

    return DerivationController;
});