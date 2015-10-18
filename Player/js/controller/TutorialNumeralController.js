define([
		"jquery",  
		'util/EventDispatcher',
		],
	function($, EventDispatcher) {
	'use strict';
	var TutorialNumeralController = function() {
		EventDispatcher.call(this);
		this.panel = null;
		this.showFinalAnswer 	= this.showFinalAnswer.bind(this);
		this.showSteps 			= this.showSteps.bind(this);
	};

	TutorialNumeralController.prototype = Object.create(EventDispatcher.prototype);
	TutorialNumeralController.prototype.constructor = TutorialNumeralController;
	
	
	TutorialNumeralController.prototype.registerPanel = function(p_oComponent) {
		this.panel = p_oComponent;
		this.panel.addEventListener("SHOW_FINAL_ANSWER_CLICKED", this.showFinalAnswer);
		this.panel.addEventListener("SHOW_STEPS_CLICKED", this.showSteps);
		this.panel.addEventListener("SHOW_SOLUTION_CLICKED", this.hideAll);
	};
	
	TutorialNumeralController.prototype.hideAll = function() {
		$('.tut-num-container').find('#answer').hide();
		$('.tut-num-container').find('#steps').hide();
	};
	
	TutorialNumeralController.prototype.showFinalAnswer = function() {
		this.hideAll();
		$('.tut-num-container').find('#answer').fadeIn(500, function(){
			
		});
		$('.tut-num-container').find('#answer').scrollTop(0);
	};
	
	TutorialNumeralController.prototype.showSteps = function() {
		this.hideAll();
		$('.tut-num-container').find('#steps').fadeIn(500, function(){
			
		});
		$('.tut-num-container').find('#steps').scrollTop(0);
	};
	
	TutorialNumeralController.prototype.destroy = function(){
		this.panel = null;
		this.showSolution = null;
    };
	
	return TutorialNumeralController;
});