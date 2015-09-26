define([
		"jquery",  
		'controller/view/AbstractPage',
		],
	function($, AbstractPage) {
	'use strict';
	var Page = function(p_$pageHolder, p_cssData, p_domView, p_xmlData) {
		AbstractPage.call(this);
		this.panel = null;
		this.showSolution = this.showSolution.bind(this);
	};

	Page.prototype = Object.create(AbstractPage.prototype);
	Page.prototype.constructor = Page;
	
	/*	
	Page.prototype.setContent = function() {
		
		var data = this.jsonXMLData.data.text;
		for (var i = 0; i < data.length; i++) {
			var oText = data[i];
			if (oText._id && oText._id != undefined) {
				this.$view.find("#" + oText._id).html(oText.__cdata);
			} else if (this.jsonXMLoText._class && this.jsonXMLoText._class != undefined) {
				this.$view.find("." + oText._id).html(oText.__cdata);
			};
		};
		
	};
	*/
	Page.prototype.init = function() {
		
		this.panel = this.aComponents[0].component;
		this.panel.addEventListener("SHOW_SOLUTION_CLICKED", this.showSolution);
	};
	
	Page.prototype.showSolution = function() {
		this.$view.addClass("show-result");
	};
	
	Page.prototype.destroy = function(){
		this.panel = null;
		this.showSolution = null;ß
        AbstractPage.prototype.destroy();
    };
	
	return Page;
});