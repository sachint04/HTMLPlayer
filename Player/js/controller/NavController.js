define([
		"jquery", 
		"x2js", 
		'controller/CourseController',
		"model/Constants",
		"util/ResourceLoader",
		'util/EventDispatcher',
		'component/Accordion',
		],
	function($, X2JS, CourseController, Constants, ResourceLoader, EventDispatcher,Accordion) {
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
        this.oLecturePlan.addEventListener('SECTION_SELECTED', this.handleAccEvents)
		var aData 				= this.jsonXMLData.Data.showAll.Chap;
        this.oLecturePlan.init(this.panel.find('.lecture-container'), {}, aData, 'Board');
        
        this.oTutorials			= new Accordion();
        this.oTutorials.addEventListener('BOARD_SELECTED', this.handleAccEvents)
        this.oTutorials.addEventListener('SECTION_SELECTED', this.handleAccEvents)
		aData 				= this.jsonXMLData.Data.showAll.Tutorials;
        this.oTutorials.init(this.panel.find('.tutorials-container'), {}, aData, 'TUT');
		
		this.addEventHandlers();
		this.panel.find('.tab.tab-lecture-plan').trigger('click');
	}
	
	NavController.prototype.handleAccEvents = function(e){
		var oAcc = e.target;
		switch(e.type ){
			case 'BOARD_SELECTED' :
			this.selectedComponent 	= e.target,
			this.showBoardContent();
			break;
			case 'SECTION_SELECTED' :
				//alert(e.sectionid);
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
		var $activeCat  = this.panel.find('.cat-btn.active');
		if($activeCat.length > 0){
			var $fistElem = $activeCat.eq(0);
			$fistElem.trigger('click');
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
				this.panel.find('.cat-btn.'+ p_sType).addClass('disabled').removeClass('active selected');
			}else{
				this.panel.find('.cat-btn').addClass('disabled').removeClass('active selected');
			}
		}
	};
		
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
		var $target = $(e.target), 
		sID 		= $target.attr('id'),
		sType		= sID.split('btn')[1],
		sCat 		= sID.split('btn')[1],
		oTarget 	= this.selectedComponent.getPageByType(sCat);
		this.panel.find('.cat-btn').removeClass('selected');
		$target.addClass('selected');
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
		}else if(sID == 'tut'){
			this.selectedComponent = this.oTutorials;
			sType 		= 'Tutorials';			
		}else{
			
		}
		var nBoard = this.selectedComponent.getChapCount();
		var nPage = this.selectedComponent.getTotalPageCount()

		this.panel.find('.total-time').html(this.selectedComponent.getTotalClockTime())

		
		var str = '<span class="left">Total'+ sType+':'+ nBoard+'</span><span class="right">Total Topics:'+nPage +'</span>';
		this.panel.find('.comp-details').html(str);
		$target.addClass('selected');
	}
	
	NavController.prototype.loadPage = function(p_oData){
		var sFile 		= p_oData._FileName,
		nTotalFrames	= p_oData._TotalFrame,
		sType			= p_oData._Type;
		
		if(CourseController){
        	 this.selectedComponent.setSelectedPage(p_oData);
        	CourseController.loadPage(sFile);
			//alert('board click next file name = '+ this.getNextPage()._FileName+ ' | Board name  = '+ this.getBoardName()+' | sType = ' +this.getPageType());	
		}
		
	}		

	NavController.prototype.getPageList = function(p_oData){
		var result = null;
		if(this.selectedComponent){
			result  = this.selectedComponent.getPageList();	
		}
		return result;
	};

	NavController.prototype.hasPreviousPage = function(p_oData){
		var result = null;
		if(this.selectedComponent){
			result = (this.selectedComponent.getSelectedPageIndex() > 0 )
		}
		return result;
	}
	NavController.prototype.hasNextPage = function(p_oData){
		var result = null;
		if(this.selectedComponent){
			result = (this.selectedComponent.getSelectedPageIndex() < this.selectedComponent.getTotalPageCount() - 1 )
		}
		return result;
	}
	NavController.prototype.getPreviousPage = function(){
		var result = null;
		if(this.hasPreviousPage()){
			result = this.selectedComponent.getPageList()[this.selectedComponent.getSelectedPageIndex() - 1];
		}
		return result;
	}
	NavController.prototype.getNextPage = function(){
		var result = null;
		if(this.hasNextPage()){
			result = this.selectedComponent.getPageList()[this.selectedComponent.getSelectedPageIndex() +1];
		}
		return result;
	}
	NavController.prototype.loadNext = function(){
		var oTarget  = this.getNextPage();
		if(oTarget ){
			this.loadPage(oTarget);	
		}
	}
	NavController.prototype.loadPrevious = function(){
		var oTarget  = this.getPreviousPage();
		if(oTarget ){
			this.loadPage(oTarget);	
		}
	}
	NavController.prototype.getBoardName = function(){
		var result = null;
		if(this.selectedComponent){
			result = this.selectedComponent.getBoardName();
		}
		return	result;
	}
	NavController.prototype.getPageType = function(){
		var result = null;
		if(this.selectedComponent){
			result = this.selectedComponent.getCurrentPage()._Type;
		}
		return	result;
	}
	
	NavController.prototype.destroy = function(){
		this.panel = null;
    };
	
	if(__instance == null){
		__instance = new NavController();
	}
	
	return __instance;
});