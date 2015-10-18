define([
	'jquery',
	'component/AbstractComponent',
	'util/EventDispatcher'
	],function($,AbstractComponent, EventDispatcher){
		
		var TutNumPanel = function(){
			AbstractComponent.call(this);
			this.$btnShowAnswer = null;
			this.$btnShowSteps= null;
			this.$btnShowSolution= null;
			return this;
		};
		
		TutNumPanel.prototype						= Object.create(AbstractComponent.prototype);
		TutNumPanel.prototype.constructor			= TutNumPanel;
		
		TutNumPanel.prototype.init =function(p_sID, p_oConfig, p_$xmlComponent){
		//TutNumPanel.prototype.init =function($view, oCompConfig, p_oComponent){
		
			AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
		}; 
		
		TutNumPanel.prototype.bindHandlers								= function() {
			//JSON.stringify('\n \t oCompConfig = '+p_oConfig);	
			
		};
		
		TutNumPanel.prototype.initialize						= function() {
			var oScope = this;
			this.$btnShowAnswer = this.$component.find('#btnShowAnswer');
			this.$btnShowSolution = this.$component.find('#btnShowSolution');
			this.$btnShowSteps = this.$component.find('#btnShowSteps');
			if(this.$btnShowAnswer.length == 0 ){
				alert(' Error! Show Solution button not found in View. ');
				return;
			};
			this.$btnShowSolution.click(function(e){
				e.preventDefault();
				if($(this).hasClass('selected'))return;
				oScope.$component.find('.selected').removeClass('selected');
				$(this).addClass('selected');
				oScope.dispatchEvent('SHOW_SOLUTION_CLICKED', {type: 'SHOW_SOLUTION_CLICKED' ,target:$(this)});
			});	
			this.$btnShowAnswer.click(function(e){
				e.preventDefault();
				if($(this).hasClass('selected'))return;
				oScope.$component.find('.selected').removeClass('selected');
				$(this).addClass('selected');
				oScope.dispatchEvent('SHOW_FINAL_ANSWER_CLICKED', {type: 'SHOW_FINAL_ANSWER_CLICKED' ,target:$(this)});
			});	
			this.$btnShowSteps.click(function(e){
				e.preventDefault();
				if($(this).hasClass('selected'))return;
				oScope.$component.find('.selected').removeClass('selected');
				$(this).addClass('selected');
				oScope.dispatchEvent('SHOW_STEPS_CLICKED', {type: 'SHOW_STEPS_CLICKED' ,target:$(this)});
			});	
			this.$component.removeClass('hide');
			AbstractComponent.prototype.dispatchComponentLoadedEvent.call(this);
			this.$btnShowSolution.trigger('click');
		};
		
		
		TutNumPanel.prototype.getComponentConfig				= function() {
			return{};
		};
		
		TutNumPanel.prototype.destroy							= function() {
			this.popupEventHandler	= null;
			this.prototype			= null;
			this.$btnShowAnswer 	= null;
			this.$btnShowSteps		= null;
	
			AbstractComponent.prototype.destroy.call(this);
  	 };
		return TutNumPanel;
	});
