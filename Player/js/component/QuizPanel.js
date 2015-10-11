define([
	'jquery',
	'component/AbstractComponent',
	'util/EventDispatcher'
	],function($,AbstractComponent, EventDispatcher){
		
		var QuizPanel = function(){
			AbstractComponent.call(this);
			this.$btnShowSolution = null;
			return this;
		};
		
		QuizPanel.prototype						= Object.create(AbstractComponent.prototype);
		QuizPanel.prototype.constructor			= QuizPanel;
		
		QuizPanel.prototype.init =function(p_sID, p_oConfig, p_$xmlComponent){
		//QuizPanel.prototype.init =function($view, oCompConfig, p_oComponent){
		
			AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
		}; 
		
		QuizPanel.prototype.bindHandlers								= function() {
			//JSON.stringify('\n \t oCompConfig = '+p_oConfig);	
			
		};
		
		QuizPanel.prototype.initialize						= function() {
			var oScope = this;
			this.$btnShowSolution = this.$component.find('#btnShowSolution');
			if(this.$btnShowSolution.length == 0 ){
				alert(' Error! Show Solution button not found in View. ');
				return;
			};
			this.$btnShowSolution.click(function(){
					oScope.dispatchEvent('SHOW_SOLUTION_CLICKED', {type: 'SHOW_SOLUTION_CLICKED' ,target:$(this)});
			});	
			this.$component.removeClass('hide');
			AbstractComponent.prototype.dispatchComponentLoadedEvent.call(this);
		};
		
		QuizPanel.prototype.getComponentConfig				= function() {
			return{};
		};
		
		QuizPanel.prototype.destroy							= function() {
			this.popupEventHandler	= null;
			this.prototype			= null;
	
			AbstractComponent.prototype.destroy.call(this);
  	 };
		return QuizPanel;
	});
