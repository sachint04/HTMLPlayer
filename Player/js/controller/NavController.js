define([
	"jquery", 
	"x2js", 
	'controller/CourseController',
	"model/Constants",
	"util/ResourceLoader",
	'util/EventDispatcher',
	'component/Accordion',
	'component/Search'
], function($, X2JS, CourseController, Constants, ResourceLoader, EventDispatcher, Accordion, Search) {
	'use strict';
	var  __instance; 
	var NavController = function() {
		EventDispatcher.call(this);
		this.panel = null;
		this.footer = null;
		this.oLecturePlan;
		this.oTutorials;
		this.oSearch;
		this.jsonXMLData = null;
		this.selectedComponent = null;
		this.handleAccEvents  = this.handleAccEvents.bind(this);
	};

	NavController.prototype = Object.create(EventDispatcher.prototype);
	NavController.prototype.constructor = NavController;
	
	
	NavController.prototype.intialize = function(p_$elem, p_$header, p_$footer) {
		this.panel 		= p_$elem;
		this.header		= p_$header;
		this.footer		= p_$footer;
		
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
		
		this.oSearch		= new Search();
        this.oSearch.addEventListener('BOARD_SELECTED', this.handleAccEvents)
		var aData 				= this.jsonXMLData.Data.showAll.Chap;
        this.oSearch.init(this.panel.find('.search-container'), {}, aData, 'Board');
		
        this.initFooter();
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
			sID 	= $target.attr('id'),
			sType	= '',
			str;
		if($target.hasClass('selected'))return;
		this.panel.find('.tabs .tab').removeClass('selected');
		this.panel.find('.acc-container').addClass('hide')
		this.panel.find('#'+ sID+'_acc_container').removeClass('hide');
		if(sID == 'lec'){	
			this.selectedComponent = this.oLecturePlan;
			sType 		= 'Lectures';
			str = '<span class="left">Total'+ sType+':'+ nBoard+'</span><span class="right">Total Topics:'+nPage +'</span>';
		}else if(sID == 'tut'){
			this.selectedComponent = this.oTutorials;
			sType 		= 'Tutorials';
			
		}else{
			//this.selectedComponent = this.oSearch;
		}
		if(sID == 'lec' || sID == 'tut'){
			var nBoard = this.selectedComponent.getChapCount();
			var nPage = this.selectedComponent.getTotalPageCount();
			str = '<span class="left">Total'+ sType+':'+ nBoard+'</span><span class="right">Total Topics:'+nPage +'</span>';
			this.panel.find('.comp-details').removeClass('hide').html(str);
		}else{
			//str = '<span class="left search-panel-container"><input id="input_search"/></span><span class="left"><button id="btn_search"></button></span>';
			this.panel.find('.comp-details').addClass('hide');
		}

		this.panel.find('.total-time').html(this.selectedComponent.getTotalClockTime())
		
		$target.addClass('selected');
	}
	
	NavController.prototype.loadPage = function(p_oData){
		var sFile 		= p_oData._FileName,
		nTotalFrames	= p_oData._TotalFrame,
		sType			= p_oData._Type;
		
		if(CourseController){
        	 this.selectedComponent.setSelectedPage(p_oData);
        	CourseController.loadPage(sFile, sType);
			//alert('board click next file name = '+ this.getNextPage()._FileName+ ' | Board name  = '+ this.getBoardName()+' | sType = ' +this.getPageType());	
		}
		
		this.updateFooterState(p_oData);
		this.updateHeaderState(p_oData);
		
	}		
	
	
	NavController.prototype.initFooter = function() {
		var oScope 		= this;
		if(this.footer.find("#btnPrev").length == 0){
			console.error('ERROR! "btnPrev" not found in Sub Nav panel')
		}
		if(this.footer.find("#btnNext").length == 0){
			console.error('ERROR! "btnNext" not found in Sub Nav panel')
		}
		
		this.$next = this.footer.find("#btnNext");
		this.$prev = this.footer.find("#btnPrev");
		
		this.$next.click(function(e){
			if(e.preventDefult){
				e.preventDefult();
			}
			//if($(this).hasClass("disabled"))return;
//			var oData =	oScope.loadNext();
			if(oScope.selectedComponent){
				oScope.selectedComponent.selectBoard("next");				
			}
			
//			if(oData)oScope.updatePanelState(oData);			
		});
		this.$prev.click(function(e){
			if(e.preventDefult){
				e.preventDefult();
			}
			//if($(this).hasClass("disabled"))return;
			//var oData = oScope.loadPrevious();
			if(oScope.selectedComponent){
				oScope.selectedComponent.selectBoard("prev");
			}
//			if(oData)oScope.updatePanelState(oData);			
		});
	};
	
	NavController.prototype.updatePanelState = function(p_oData){
		this.selectedComponent.setSelectedPage(p_oData)
	}
	NavController.prototype.updateHeaderState = function(p_oData){
		this.header.find('.title').html(this.getBoardName());
		this.header.find('.type').html(p_oData._Type);
	}
	NavController.prototype.updateFooterState = function(){
		if(this.hasPreviousPage()){
			this.footer.find("#btnPrev").removeClass('disabled');	
		}else{
			this.footer.find("#btnPrev").addClass('disabled');				
		};
			
		if(this.hasNextPage()){
			this.footer.find("#btnNext").removeClass('disabled');				
		}else{
			this.footer.find("#btnNext").removeClass('disabled');							
		};	
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
		return oTarget; 
	}
	NavController.prototype.loadPrevious = function(){
		var oTarget  = this.getPreviousPage();
		if(oTarget ){
			this.loadPage(oTarget);	
		}
		return oTarget; 
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
		this.header = null;
		this.footer = null;
    };
	
	if(__instance == null){
		__instance = new NavController();
	}
	
	return __instance;
});