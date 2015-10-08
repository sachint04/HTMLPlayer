define([
		"jquery",  
		'util/EventDispatcher',
		],
	function($, EventDispatcher) {
	'use strict';
	var QuizController = function() {
		EventDispatcher.call(this);
		this.panel = null;
		this.showSolution = this.showSolution.bind(this);
	};

	QuizController.prototype = Object.create(EventDispatcher.prototype);
	QuizController.prototype.constructor = QuizController;
	
	
	QuizController.prototype.registerQuizPanel = function(p_oComponent) {
		this.panel = p_oComponent;
		this.panel.addEventListener("SHOW_SOLUTION_CLICKED", this.showSolution);
	};
	
	QuizController.prototype.showSolution = function() {
		$('.mcq-container').addClass("show-result");
	};
	
	QuizController.prototype.destroy = function(){
		this.panel = null;
		this.showSolution = null;
    };
	
	return QuizController;
});