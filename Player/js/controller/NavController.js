define([
		"jquery", 
		"x2js", 
		"model/Constants",
		"util/ResourceLoader",
		'util/EventDispatcher',
		'component/Accordion',
		],
	function($, X2JS, Constants, ResourceLoader, EventDispatcher,Accordion) {
	'use strict';
	var  __instance; 
	var NavController = function() {
		EventDispatcher.call(this);
		this.panel = null;
		this.oLecturePlan;
		this.oTutorials;
		this.oSearch;
		this.jsonXMLData = null;
		this.handleAccEvents  = this.handleAccEvents.bind(this);
	};

	NavController.prototype = Object.create(EventDispatcher.prototype);
	NavController.prototype.constructor = NavController;
	
	
	NavController.prototype.intialize = function(p_$elem) {
		this.panel 		= p_$elem;
		var sXml 		= 	Constants.getTOCXML();
		var oLoader 	= new ResourceLoader();
		oLoader.loadResource({"xml": sXml}, this, this.onResourceLoaded)
	};
	
    NavController.prototype.onResourceLoaded = function(data, oLoader ){
        var sXmlData    = data.xml,
        oAccordion 		= new Accordion(),
        oX2JS = new X2JS();
        this.jsonXMLData = oX2JS.xml2json(sXmlData);
		oLoader.destroy();
		this.createUI();
    }
    
	NavController.prototype.createUI = function(){
        this.oLecturePlan		= new Accordion();
        this.oLecturePlan.addEventListener('BOARD_SELECTED', this.handleAccEvents)
		var aData 				= this.jsonXMLData.Data.showAll.Chap;
        this.oLecturePlan.init(this.panel.find('.lecture-container'), {}, aData, 'Board');
        
        this.oTutorials			= new Accordion();
        this.oTutorials.addEventListener('BOARD_SELECTED', this.handleAccEvents)
		aData 				= this.jsonXMLData.Data.showAll.Tutorials;
        this.oTutorials.init(this.panel.find('.tutorials-container'), {}, aData, 'TUT');
		
		this.addEventHandlers();
		this.panel.find('tab.lecture-container').trigger('click');
	}
	
	NavController.prototype.handleAccEvents = function(e){
		var oAcc = e.target,
		oBoard 	= e.board;
		alert('oBoard._BoardName - '+ oBoard._BoardName);
	};
	
	NavController.prototype.addEventHandlers = function(){
		var oScope = this;
		this.panel.find('.tab').click(function(e){
			oScope.onTabClicked(e);
		})
		
		this.panel.find('.cat-btn').click(function(e){
			if($(e.target).hasClass('disabled') || $(e.target).hasClass('selected')){
				return;
			}
			oScope.onCatSelected(e);
		})
	};
	NavController.prototype.onCatSelected = function(e){
		
		
	};
	NavController.prototype.onTabClicked = function(e){
		var $target = $(e.currentTarget),
		sID 		= $target.attr('id');
		if($target.hasClass('selected'))return;
		
		this.panel.find('.acc-container').removeClass('selected').addClass('hide')
		this.panel.find('#'+ sID+'_acc_container').removeClass('hide');
	}
	
	
	
	NavController.prototype.destroy = function(){
		this.panel = null;
    };
	
	if(__instance == null){
		__instance = new NavController();
	}
	
	return __instance;
});