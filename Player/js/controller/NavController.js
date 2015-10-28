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
		this.selectedComponent = null;
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
		this.panel.removeClass('hide');
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
		this.panel.find('.tab.tab-lecture-plan').trigger('click');
	}
	
	NavController.prototype.handleAccEvents = function(e){
		var oAcc = e.target,
		oBoard 	= e.board;
		switch(e.type ){
			case 'BOARD_SELECTED' :
			this.selectedComponent 	= e.target,
			this.showBoardContent();
			break;
		}
	};
	
	NavController.prototype.showBoardContent = function(){
		var aType = this.selectedComponent.getPageTypeList();
		if(aType && aType.length != undefined ){
			this.enableCatButtons(false);
			for (var i=0; i < aType.length; i++) {
				this.enableCatButtons(true, aType[i].toLowerCase());
			};
		}
		if(this.panel.find('.cat-btn.active').length > 0){
			this.panel.find('.cat-btn.active').eq(0).trigger('click');
			return;
		}
		var aPage = this.selectedComponent.getPageList()
		this.loadPage(aPage[0]);
	};
	
	NavController.prototype.enableCatButtons = function(p_bFlag, p_sType){
		if(p_bFlag){
			if(p_sType && p_sType != undefined){
				this.panel.find('.cat-btn.'+ p_sType).removeClass('disabled').addClass('active');
			}else{
				this.panel.find('.cat-btn').removeClass('disabled').addClass('active');
			}
		}else{
			
			if(p_sType && p_sType != undefined){
				this.panel.find('.cat-btn.'+ p_sType).addClass('disabled').removeClass('active');
			}else{
				this.panel.find('.cat-btn').addClass('disabled').removeClass('active');
			}
		}
	}
		
	NavController.prototype.getCurrentPageList = function(){
		return this.selectedComponent.getPageList();
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
		var sID 	= $(e.target).attr('id'),
		sType		= sID.split('btn')[1],
		sCat 		= sID.split('btn')[1],
		oTarget 	= this.selectedComponent.getPageByType(sCat);
		
		this.loadPage(oTarget)		
	};
	NavController.prototype.onTabClicked = function(e){
		var $target = $(e.currentTarget),
		sID 		= $target.attr('id');
		if($target.hasClass('selected'))return;
		this.panel.find('.tabs .tab').removeClass('selected');
		this.panel.find('.acc-container').addClass('hide')
		this.panel.find('#'+ sID+'_acc_container').removeClass('hide');
		var sType = '';
		if(sID == 'lec'){	
			this.selectedComponent = this.oLecturePlan;
			sType 		= 'Lectures';
		}else if(sID == 'lec'){
			this.selectedComponent = this.oTutorials;
			sType 		= 'Turials';			
		}else{
			
		}
		var nBoard = this.selectedComponent.getChapCount();
		var nPage = this.selectedComponent.getTotalPageCount()
		
		var str = '<span class="left">Total'+ sType+':'+ nBoard+'</span><span class="right">Total Topics:'+nPage +'</span>';
		this.panel.find('.comp-details').html(str);
		$target.addClass('selected');
	}
	
	NavController.prototype.loadPage = function(p_oData){
		var sFile 		= p_oData._FileName,
		nTotalFrames	= p_oData._TotalFrame,
		sType			= p_oData._Type;
	
	
	alert('board click sFile = '+ sFile+ ' | nTotalFrames = '+ nTotalFrames+' | sType = ' +sType);	
			
		
	}

	
	NavController.prototype.destroy = function(){
		this.panel = null;
    };
	
	if(__instance == null){
		__instance = new NavController();
	}
	
	return __instance;
});