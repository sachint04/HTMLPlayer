define([
	'jquery',
	'component/AbstractComponent',
	'controller/NavController',
	'util/EventDispatcher'
	],function($,AbstractComponent, NavController, EventDispatcher){
		
		var Splash = function(){
			AbstractComponent.call(this);
			return this;
		};
		
		Splash.prototype						= Object.create(AbstractComponent.prototype);
		Splash.prototype.constructor			= Splash;
		
		Splash.prototype.init =function(p_sID, p_oConfig, p_$xmlComponent){
		//Splash.prototype.init =function($view, oCompConfig, p_oComponent){
		
			AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
		}; 
		
		Splash.prototype.addAriaRoles					= function() {
		//	Logger.logWarn('AbstractComponent.addAriaRoles() | WARN: ARIA roles implementation missing. Method named "addAriaRoles" needs to be implemented for the concrete class');
		};
		Splash.prototype.bindHandlers					= function() {
		//	Logger.logError('AbstractComponent.bindHandlers() | ERROR: Method named "bindHandlers" needs to be implemented for the concrete class');
		};
		
		Splash.prototype.initialize						= function() {
			var $stream 		= $('#Splash .stream-title');
			var $topic 			= $('#Splash .topic-title');
			var sStream 		= NavController.jsonXMLData.Data.Subject.__text;
			var sTopic 			= NavController.sCurrentTopic;
			$stream.html(sStream );
			$topic.html(sTopic );			AbstractComponent.prototype.dispatchComponentLoadedEvent.call(this);
		};
		
		Splash.prototype.getComponentConfig				= function() {
			return{};
		};
		
		Splash.prototype.destroy							= function() {
			this.popupEventHandler	= null;
			this.prototype			= null;
	
			AbstractComponent.prototype.destroy.call(this);
  	 };
		return Splash;
	});
