define([
	'jquery',
	'model/Constants',
	'util/EventDispatcher',
	'util/StringUtil',
	'util/MessageLogger'
], function($, Constants, EventDispatcher, StringUtil, Logger) {

	// focusable is a small jQuery extension to add a :focusable selector. It is used to
	// get a list of all focusable elements in a panel. Credit to ajpiano on the jQuery forums.
	//
	$.extend($.expr[':'], {
		focusable : function(element) {
			var nodeName = element.nodeName.toLowerCase();
			var tabIndex = $(element).attr('tabindex');

			// the element and all of its ancestors must be visible
			if (($(element)[(nodeName == 'area' ? 'parents' : 'closest')](':hidden').length) == true) {
				return false;
			}

			// If tabindex is defined, its value must be greater than 0
			if (!isNaN(tabIndex) && tabIndex < 0) {
				return false;
			}

			// if the element is a standard form control, it must not be disabled
			if (/input|select|textarea|button|object/.test(nodeName) == true) {
				return !element.disabled;
			}

			// if the element is a link, href must be defined
			if ((nodeName == 'a' || nodeName == 'area') == true) {
				return (element.href.length > 0);
			}

			// this is some other page element that is not normally focusable.
			return false;
		}
	});

	function AbstractComponent() {
		//console.log('AbstractComponent.CONSTRUCTOR() | ');
		EventDispatcher.call(this);

		// Merging Concrete classes Config Object with the one here
		this.oConfig	= {};
		this.sComponentID;
		this.$component;
		this.sState;
		this.bInitialized;
		this.$xmlData;
		this.bComplete;
		this.aVisited = [];

		// Define values for keycodes
		this.keys = {
			tab			: 9,
			enter		: 13,
			esc			: 27,
			space		: 32,
			pageup		: 33,
			pagedown	: 34,
			end			: 35,
			home		: 36,
			left		: 37,
			up			: 38,
			right		: 39,
			down		: 40
		};

		return this;
	}

	AbstractComponent.prototype									= Object.create(EventDispatcher.prototype);
	AbstractComponent.prototype.constructor						= AbstractComponent;

	AbstractComponent.prototype.getConfig						= function() {
		return this.oConfig;
	};
	AbstractComponent.prototype.getComponentConfig				= function() {
		Logger.logError('AbstractComponent.getComponentConfig() | ERROR: Concrete classes need to implement a method "getComponentConfig" for setting up default configuration of the component.');
	};
	AbstractComponent.prototype.getLocation				= function(p_sValue) {
		return Constants.getLocation(p_sValue);
	};

	//AbstractComponent.prototype.init							= function(p_sID, p_oConfig, p_$xmlComponent) {
	AbstractComponent.prototype.init							= function(p_$component, p_oConfig, p_$xmlComponent) {
		//console.log('AbstractComponent.init() | Comp ID = '+p_oConfig._componentID);
		// store the id of the containing div
		this.sComponentID	= p_oConfig._componentID;
		// store the jQuery object for the component
		//this.$component		= $('#' + p_sID);
		this.$component		= p_$component;
		// store XML data
		this.$xmlData 		= p_$xmlComponent;
		// Create the merged Config first
		this.createConfiguration(p_oConfig);
		// If runtime creation is required by the component
		this.createComponent();
	};
	AbstractComponent.prototype.createConfiguration				= function(p_oUserConfig){
		for (var sProp in p_oUserConfig) {
			//console.log('AbstractComponent.createConfiguration() | Prop = '+sProp+' : Value = '+p_oUserConfig[sProp]+' : Type = '+(typeof p_oUserConfig[sProp]));
			p_oUserConfig[sProp] = StringUtil.sanitizeValue(p_oUserConfig[sProp], this.getConfig()[sProp]);
		};
		this.oConfig = $.extend({}, this.getConfig(), this.getComponentConfig(), (p_oUserConfig || {}));
		//console.log('AbstractComponent.createConfiguration() | '+JSON.stringify(this.oConfig));
	};
	AbstractComponent.prototype.createComponent					= function() {
		//console.log('AbstractComponent.createComponent() | ');
		// Add ARIA Roles
		this.addAriaRoles();
		// Bind event handlers
		this.bindHandlers();
		// Initialize the tab panel
		this.initialize();
		this.bInitialized = true;
	};
	AbstractComponent.prototype.addAriaRoles					= function() {
		Logger.logWarn('AbstractComponent.addAriaRoles() | WARN: ARIA roles implementation missing. Method named "addAriaRoles" needs to be implemented for the concrete class');
	};
	AbstractComponent.prototype.bindHandlers					= function() {
		Logger.logError('AbstractComponent.bindHandlers() | ERROR: Method named "bindHandlers" needs to be implemented for the concrete class');
	};
	AbstractComponent.prototype.initialize						= function() {
		Logger.logError('AbstractComponent.init() | ERROR: Method named "initialize" needs to be implemented for the concrete class');
	};

	AbstractComponent.prototype.dispatchComponentLoadedEvent	= function() {
		//console.log('dispatchComponentLoadedEvent() '+ this.sComponentID);
		 this.dispatchEvent('COMPONENT_LOADED', {target:this, type:'COMPONENT_LOADED', componentID:this.sComponentID});
	};

	AbstractComponent.prototype.isEnabled						= function(p_$target) {
		if (p_$target.hasClass('disabled') || p_$target.hasClass('inactive')) {return false;}
		return true;
	};

	AbstractComponent.prototype.setCompleted					= function() {
		this.bComplete = true;
		this.dispatchEvent('COMPONENT_INTERACTION_COMPLETE', {type:'COMPONENT_INTERACTION_COMPLETE',target:this, componentID: this.sComponentID});
	};

	AbstractComponent.prototype.isComplete						= function() {
		return this.bComplete;
	};

	AbstractComponent.prototype.getComponentID					= function(){
		return this.sComponentID;
	};

	AbstractComponent.prototype.addToVisited					= function(p_sID){
		if(this.aVisited.indexOf(p_sID) != -1)return;
		this.aVisited.push(p_sID);
	};

	AbstractComponent.prototype.checkCompletionStatus			= function() {
		Logger.logError('Error: AccordianComponent.checkComplitionState() not implemented in component.');
	};

	/*
	AbstractComponent.prototype.handleItemFocus				= function($item, e) {
		$item.addClass('focus');
		return true;
	}
	AbstractComponent.prototype.handleItemBlur				= function($item, e) {
		$item.removeClass('focus');
		return true;
	}
	AbstractComponent.prototype.handleItemKeyDown			= function($item, e) {
		if (e.altKey || e.ctrlKey) {
			return true;
		}
		if (e.shiftKey) {
			if (e.keyCode == this.keys.tab) {
				e.stopPropagation();
				return false;
			}

			return true;
		}

		switch(e.keyCode) {
			case this.keys.tab: {
				return true;
			}
			case this.keys.esc: {
				e.stopPropagation();
				return false;
			}
			case this.keys.enter:
			case this.keys.space: {
				this.handleEvents(e);
				e.stopPropagation();
				return false;
			}
			case this.keys.up: {
				e.stopPropagation();
				return false;
			}
			case this.keys.down: {
				e.stopPropagation();
				return false;
			}
		}

		return true;
	}*/

	AbstractComponent.prototype.filterData						= function(p_sTxt){
		var sText			= p_sTxt,
			sStartPrefix	= '<<',
			sEndPrefix		= '>>',
			nStartIndex 	= sText.indexOf(sStartPrefix) + sStartPrefix.length,
			nEndIndex,
			sVariableName,
			sVariableValue;

		//console.log('#### nStartIndex = '+nStartIndex);
		while(nStartIndex > -1){
			nEndIndex		= sText.indexOf(sEndPrefix, nStartIndex);
			sVariableName	= sText.substring(nStartIndex, nEndIndex);
			sVariableValue	= this.getConfig()[sVariableName];
			sVariableValue	= (!sVariableValue) ? this[sVariableName] : sVariableValue;
			sText			= sText.substring(0, (nStartIndex - sStartPrefix.length)) + sVariableValue + sText.substring((nEndIndex + sEndPrefix.length), sText.length);
			//console.log('######## Variable = '+sVariableName+' : Value = '+sVariableValue+' : '+nStartIndex+' : '+nEndIndex);
			nStartIndex 	= sText.indexOf(sStartPrefix, nEndIndex) + sStartPrefix;
		}
		//console.log('#### Filtered text = '+sText);
		return sText;
	};
	AbstractComponent.prototype.invalidate						= function() {
	
	};
	/**
	 * Destroys the Object
	 */
	AbstractComponent.prototype.destroy							= function() {
		//console.log('AbstractComponent.destroy() | ');
		this.oConfig		= null;
		this.sComponentID	= null;
		this.$component		= null;
		this.sState			= null;
		this.bInitialized	= null;
		this.keys			= null;
		this.prototype		= null;
	};

	AbstractComponent.prototype.toString						= function() {
		return 'view/AbstractComponent';
	};

	return AbstractComponent;
});