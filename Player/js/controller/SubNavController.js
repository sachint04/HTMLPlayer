define([
	"jquery", 
	"controller/NavController", 
	'util/EventDispatcher',
], function($, NavController, EventDispatcher) {
	'use strict';
	var  __instance; 
	var SubNavController = function() {
		EventDispatcher.call(this);
		this.panel = null;
		this.$next = null;
		this.$prev = null;
		this.loadNext 		= this.loadNext.bind(this);
		this.loadPrevious 	= this.loadPrevious.bind(this);
	};

	SubNavController.prototype = Object.create(EventDispatcher.prototype);
	SubNavController.prototype.constructor = SubNavController;
	
	
	SubNavController.prototype.intialize = function(p_$elem) {
		var oScope 		= this;
		this.panel 		= p_$elem;
		if(this.panel.find("#btnPrev").length == 0){
			console.error('ERROR! "btnPrev" not found in Sub Nav panel')
		}
		if(this.panel.find("#btnNext").length == 0){
			console.error('ERROR! "btnNext" not found in Sub Nav panel')
		}
		
		this.$next = this.panel.find("#btnNext");
		this.$prev = this.panel.find("#btnPrev");
		
		this.$next.click(function(e){
			if(e.preventDefult){
				e.preventDefult();
			}
			if($(this).hasClass("disabled"))return;
			oScope.loadNext();
		});
		this.$prev.click(function(e){
			if(e.preventDefult){
				e.preventDefult();
			}
			if($(this).hasClass("disabled"))return;
			oScope.loadPrevious();
		});
	};
	

	SubNavController.prototype.loadNext = function(){
		NavController.loadNext();	
	}
	SubNavController.prototype.loadPrevious = function(){
		NavController.loadPrevious();	
	}
	
	SubNavController.prototype.updateState = function(){
		if(NavController.hasPreviousPage()){
			this.$prev.removeClass('disabled');	
		}else{
			this.$prev.addClass('disabled');				
		};
			
		if(NavController.hasNextPage()){
			this.$prev.removeClass('disabled');				
		}else{
			this.$next.removeClass('disabled');							
		};	
	}
	
	SubNavController.prototype.destroy = function(){
		this.panel = null;
    };
	
	if(__instance == null){
		__instance = new SubNavController();
	}
	
	return __instance;
});