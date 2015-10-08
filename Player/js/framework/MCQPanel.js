define([
	'jquery',
	'framework/EventDispatcher'
	],function($,EventDispatcher){
		
		var MCQPanel = function(){
			EventDispatcher.call(this);
			this.$btnShowSolution = null;
			return this;
		}
		
		MCQPanel.prototype						= Object.create(EventDispatcher.prototype);
		MCQPanel.prototype.constructor			= MCQPanel;
		
		MCQPanel.prototype.init =function($view){
			var oScope = this;
			this.$btnShowSolution = $view.find('#btnShowSolution');
			if(this.$btnShowSolution.length == 0 ){
				
				alert(' Error! Show Solution button not found in View. ')
				return;
				
			}
			
			this.$btnShowSolution.click(function(){
				oScope.dispatchEvent('SHOW_SOLUTION_CLICKED', {type: 'SHOW_SOLUTION_CLICKED' ,target:$(this)});
			});	
		} 
		
		return MCQPanel;
	}
)
