define([
    'jquery',
    'x2js',
    /*'model/Constants',*/
    'core/AudioManager',
    'controller/SwiffyController',
    'controller/DerivationController',
    'controller/ApplicationController',
    'controller/QuizController',
    'controller/TutorialNumeralController',
    'util/LoaderUtil',
    'util/EventDispatcher',
    'validators/ErrorApi',
    'util/MessageLogger'
], function($, X2JS/*, Constants*/, AudioManager, SwiffyController, DerivationController, ApplicationController, QuizController, TutorialNumeralController, LoaderUtil, EventDispatcher, Logger){
    'use strict';
    function AbstractPage(){;
        EventDispatcher.call(this);

        this.$domView = null;
        //this.oLocations = null;
        this.sGUID = null;
        this.jsonXMLData = null;

        this.aComponents = null;
        this.bComponentsLoaded = false;
        this.oComponentClassPath    = {
            audiopanel      : 'component/AudioPanel',
            swiffy          : 'component/SwiffyWidget',
            createjs          : 'component/CreateJSWidget',
            derivationpanelstatic : 'component/DerivationPanelStatic',
            derivationpanel : 'component/DerivationPanel',
            applicationpanel : 'component/ApplicationPanel',
            applicationpanelstatic : 'component/ApplicationPanelStatic',
            quizpanel		: 'component/QuizPanel',
            tutnumpanel		: 'component/TutNumPanel',
            splash		: 'component/Splash'
        };

        this.bActivityLoaded = null;
        this.oActivityClassPath     = {
            MCQ                     : 'framework/activity/viewcontroller/MCQ',
        };

        this.oSwiffyController = null;
        this.oQuizController = null;
        this.oTutNumController = null;

        this.onComponentLoaded = onComponentLoaded.bind(this);
    };

    AbstractPage.prototype = Object.create(EventDispatcher.prototype);
    AbstractPage.prototype.constructor = AbstractPage;

    AbstractPage.prototype.init = function(p_$domPageHolder, p_oResources, p_sPageName){
       //console.log('AbstractPage.init() | '+p_sPageName);
        this.$domView = p_$domPageHolder;
        this.sGUID = p_sPageName;
        //Constants.setCurrentPageName(p_sPageName);
        loadResources.call(this, p_oResources);
    };
	AbstractPage.prototype.hide = function(p_bHide){
		if(p_bHide){
			$(this.$domView.parent()).addClass('hide');
		}else{
			$(this.$domView.parent()).removeClass('hide');
		}
	}
	/*AbstractPage.prototype.refreshAudioData = function(){
		AudioManager.destroyPlayList();
		parseSoundsNode.call(this);
    };*/

    function loadResources(p_oResources){
        //console.log('AbstractPage.loadResources() | p_oResources = '+JSON.stringify(p_oResources));
        var oScope = this,
			oLoaderUtil = new LoaderUtil();
        /*p_oResources.xml = Constants.getLocation('xml') +this.sGUID+'/'+ p_oResources.xml;
        p_oResources.css = Constants.getLocation('css') + this.sGUID+'/'+p_oResources.css;
        if(this.$domView){
	        p_oResources.html = Constants.getLocation('css') + this.sGUID+'/'+p_oResources.html;
        }*/
        oLoaderUtil.loadResource(p_oResources, function(data){
            onResourceLoaded.call(oScope, data);
        });
    }
    function onResourceLoaded(data){
        var sXmlData    = data.xml,
            sJsData    = (data.js || ''),
            sCssData    = (data.css || ''),
            $htmlView   = $(data.html),
            oX2JS = new X2JS();

        //this.$domPageView = $htmlView;
        /*var $tempContentWrapper = $('<div id="temp_content"></div>');
        $tempContentWrapper.append($htmlView);
        $tempContentWrapper.find('#content').attr('id', this.sGUID);
        this.$domView.append($tempContentWrapper);
        this.$domView = this.$domView.find('#'+this.sGUID);
        console.log('DOM ID = '+this.$domView.attr('id'));*/

        this.$domView.append($htmlView);
        this.$domView.find('#content').attr('id', this.sGUID);
        this.$domView = this.$domView.find('#'+this.sGUID);
        //this.$domView.find('#content_wrapper').append('<style>'+sCssData+'</style>');
        //this.$domView.find('#content_wrapper').append($(sHtml));
        this.jsonXMLData = oX2JS.xml2json(sXmlData);

        //console.log('AbstractPage.onResourceLoaded() | sXmlData = '+sXmlData+' : '+this);
        this.dispatchEvent('PAGE_RESOURCES_LOADED', {type : 'PAGE_RESOURCES_LOADED', target : this});
        parsePageJson.call(this);
    }
    function parsePageJson(){
        //console.log('AbstractPage.parsePageJson() | ');
        // ** render page text
        setContent.call(this);
        // ** Parse Sounds node
        parseSoundsNode.call(this);
        // ** Parse Component node
        parseComponentNode.call(this);
        // ** Parse Activity node
        parseActivityNode.call(this);
    }
    
    function setContent(){
    	if(this.jsonXMLData.data.text != undefined){
			var data = (this.jsonXMLData.data.text.length != undefined)? this.jsonXMLData.data.text : [this.jsonXMLData.data.text]; 
			for(var i = 0; i<data.length;i++){ 
				var oText = data[i]; 
				if(oText._id && oText._id != undefined)
				{ 
					var id 		= oText._id;
					var $elem 	= this.$domView.find("#"+id);
					$elem.html(oText.__cdata) ;
				}else if(oText._class && oText._class != undefined){
					 this.$domView.find("."+ oText._class).html(oText.__cdata);
			 	} 
			 } 
    	} 
	};
    
    function parseSoundsNode(){
        //console.log('AbstractPage.parseSoundsNode() | ');
        //AudioManager.init();
        if(this.jsonXMLData.data.sounds){
            AudioManager.parseSoundsNode(this.jsonXMLData.data.sounds, this.sGUID);
        }
    }
    function parseComponentNode(){
        //console.log('AbstractPage.parseComponentNode() | ');
        if(this.jsonXMLData.data.component){
            if(this.jsonXMLData.data.component.length === undefined){
                this.jsonXMLData.data.component = [this.jsonXMLData.data.component];
            }
            var aComponents = this.jsonXMLData.data.component,
                oComponent,
                sComponentType,
                i;

            for(i=0; i<aComponents.length; i++){
                oComponent   = aComponents[i];
                sComponentType      = oComponent._type.toUpperCase();
                //console.log('\tComponent Type = '+sComponentType+' : DOM View = '+this.$domView[0]);

                // ** Add sections for each Component type
                if (sComponentType === 'CREATEJS') {
                    createComponent.call(this, this.oComponentClassPath.createjs, oComponent);
                }if (sComponentType === 'SWIFFY') {
                    createComponent.call(this, this.oComponentClassPath.swiffy, oComponent);
                }
                if (sComponentType === 'AUDIOPANEL') {
                    createComponent.call(this, this.oComponentClassPath.audiopanel, oComponent);
                }
				if (sComponentType === 'DERIVATIONPANEL') {
                    createComponent.call(this, this.oComponentClassPath.derivationpanel, oComponent);
                }
				if (sComponentType === 'DERIVATIONPANEL_STATIC') {
                    createComponent.call(this, this.oComponentClassPath.derivationpanelstatic, oComponent);
                }
				if (sComponentType === 'APPLICATIONPANEL') {
                    createComponent.call(this, this.oComponentClassPath.applicationpanel, oComponent);
                }
				if (sComponentType === 'APPLICATIONPANEL_STATIC') {
                    createComponent.call(this, this.oComponentClassPath.applicationpanelstatic, oComponent);
                }
                if (sComponentType === 'QUIZPANEL') {
                    createComponent.call(this, this.oComponentClassPath.quizpanel, oComponent);
                }
                if (sComponentType === 'TUTNUMPANEL') {
                    createComponent.call(this, this.oComponentClassPath.tutnumpanel, oComponent);
                }
                if (sComponentType === 'SPLASH') {
                    createComponent.call(this, this.oComponentClassPath.splash, oComponent);
                }
            }
        } else {
            this.bComponentsLoaded = true;
            checkLoadComplete.call(this);
        }
    }
    function createComponent(p_jsFilePath, p_oComponent) {
        //console.log('AbstractPage.parseComponentNode() | GUID = '+this.sGUID);
        var oScope = this;

        require([
            p_jsFilePath
        ], function(Component) {
            initComponent.call(oScope, Component, p_oComponent);
        });
    };
    function initComponent(p_oComponentClass, p_oComponent, p_oCompConfig) {
        //console.log('AbstractPage.initComponent() | GUID = '+this.sGUID);
        var oCompConfig = (p_oCompConfig) ? p_oCompConfig : {},
            sProp;
        for(sProp in p_oComponent){
            if(typeof(p_oComponent[sProp]) !== 'object' && sProp !== '__cdata'){
                oCompConfig[sProp] = p_oComponent[sProp];
            }
        }
        //console.log('\tComponent Config = '+JSON.stringify(oCompConfig));

        var oScope = this,
            Component = p_oComponentClass,
            sComponentID = p_oComponent._componentID,
            oComponent = (typeof Component === "object") ? Component : new Component();

        //oCompConfig['componentID'] = sComponentID;
        oCompConfig['componentUID'] = this.sGUID + '|' + sComponentID;
        //console.log('AbstractPage.initComponent() | sComponentID = '+sComponentID+' this.$domView = '+this.$domView[0]);
        oComponent.addEventListener('COMPONENT_LOADED', this.onComponentLoaded);
        oComponent.init(this.$domView.find('#'+sComponentID), oCompConfig, p_oComponent);
    };
    function onComponentLoaded(e){
        var oScope = this,
            oComponent = e.target,
			sComponentType = oComponent.getConfig()._type;
        oComponent.removeEventListener('COMPONENT_LOADED', this.onComponentLoaded);
        // ** Storing a reference of the component in the array
        if(this.aComponents === null){this.aComponents = [];}
        this.aComponents.push(oComponent);
		
		if(this.jsonXMLData.data._pageType === "DER" || this.jsonXMLData.data._pageType === "DER_ST"){
			// ** Create a Derivation Controller
			if(!this.oSwiffyController){
				this.oSwiffyController = null;
				this.oSwiffyController = new DerivationController(this);
			}
		}else if(this.jsonXMLData.data._pageType === "APP" || this.jsonXMLData.data._pageType === "APP_ST"){
			// ** Create a Application Controller
			if(!this.oSwiffyController){
				this.oSwiffyController = null;
				this.oSwiffyController = new ApplicationController(this);
			}
		}else{
			// ** Create a Swiffy Controller
			if(!this.oSwiffyController){
				this.oSwiffyController = null;
				this.oSwiffyController = new SwiffyController();
			}
		}
		// ** Register the Audio Panel & Swiffy object with the Swiffy Controller
		if(sComponentType === 'swiffy' || sComponentType === 'createjs'){
			this.oSwiffyController.registerSwiffy(oComponent);
		}
		if(sComponentType === 'audiopanel'){
			this.oSwiffyController.registerAudioPanel(oComponent);
		}
		if(sComponentType === 'derivationpanel'){
			this.oSwiffyController.registerDerivationPanel(oComponent);
		}
		if(sComponentType === 'derivationpanel_static'){
			this.oSwiffyController.registerDerivationPanelStatic(oComponent);
		}
		if(sComponentType === 'applicationpanel'){
			this.oSwiffyController.registerApplicationPanel(oComponent);
		}
		if(sComponentType === 'applicationpanel_static'){
			this.oSwiffyController.registerApplicationPanelStatic(oComponent);
		}

        if(sComponentType === 'quizpanel'){
        	this.oQuizController = new QuizController();
            this.oQuizController.registerQuizPanel(oComponent);
        }
		if(sComponentType === 'tutnumpanel'){
        	this.oTutNumController = new TutorialNumeralController();
            this.oTutNumController.registerPanel(oComponent);
        }
        //console.log('AbstractPage.onComponentLoaded() | haveAllComponentsLoaded = '+haveAllComponentsLoaded.call(this));
        if (haveAllComponentsLoaded.call(this)) {
            this.bComponentsLoaded = true;
        }
        checkLoadComplete.call(this);
    };
    function haveAllComponentsLoaded() {
        //console.log('AbstractPage.haveAllComponentsLoaded() | To Load = '+this.jsonXMLData.data.component.length+' : Loaded = '+this.aComponents.length);
        if (this.jsonXMLData.data.component.length === this.aComponents.length) {
            return true;
        }
        return false;
    };
    function checkLoadComplete(){
        //console.log('AbstractPage.checkLoadComplete() | bPageAssetsLoaded = '+this.bPageAssetsLoaded+' : bActivityLoaded = '+this.bActivityLoaded+' : bComponentsLoaded = '+this.bComponentsLoaded+ ' | page ID = '+ this.sGUID);
        //if(this.bActivityLoaded && this.bComponentsLoaded && this.bPageAssetsLoaded && this.bAudiosLoaded){
        //if(this.bActivityLoaded && this.bComponentsLoaded && this.bPageAssetsLoaded){
        if(this.bComponentsLoaded){
			stackComponentsToMaintainDestroyOrder.call(this);
            //this.setContent();
            this.$domView.fadeIn().removeClass('hide').focus();
            // ** Call a Concrete class method to do its stuff and dispatch the 'PAGE_LOADED' event
			var oScope = this;
			setTimeout(function(){
				oScope.initialize();
			}, 1000);
        }
    };
	function stackComponentsToMaintainDestroyOrder(){
		if(!this.aComponents){return;}
		var aTemp = [],
			nLength = this.aComponents.length,
			i;
		for (i=0; i < nLength; i++) {
			var oComponent = this.aComponents[i];
			if(aTemp.length > 0){
				aTemp.push(oComponent);
				continue;
			}
			if(oComponent.toString() === 'component/SwiffyWidget'){
				aTemp[0] = oComponent;
				this.aComponents.splice(i, 1);
				nLength = this.aComponents.length;
				i = -1;
				//debugger;
			}
		};
		this.aComponents = aTemp;
		//debugComponentStack.call(this);
	}
	function debugComponentStack(){
		var i;
		if(this.aComponents){
	        for (i=0; i < this.aComponents.length; i++) {
				console.log('Component['+i+'] = '+this.aComponents[i].toString());
	        }
        }
	}

    // ** Stub Method to be implemented in the Final Page Class
    AbstractPage.prototype.initialize                       = function(){
       // Logger.logDebug('PageAbstract.initialize() ');
        this.dispatchEvent("PAGE_LOADED");
        this.$domView.parent().scrollTop(0);
        $('html').scrollTop(0);
        this.$domView.focus();
		this.oSwiffyController.autoPlay();
    };

	AbstractPage.prototype.invalidate = function(){
		var i;
		if(this.aComponents){
	        for (i=0; i < this.aComponents.length; i++) {
	            this.aComponents[i].invalidate();
	        }
        }
		/*if(this.oQuizController){
        	this.oQuizController.invalidate();
        }
        if(this.oTutNumController){
        	this.oTutNumController.invalidate();
        }
        if(this.oSwiffyController){
        	this.oSwiffyController.invalidate();
        }*/
	};
	AbstractPage.prototype.destroy = function(){
		//console.log('AbstractPage.destroy() ');
		var i;
            
        if(this.aComponents){
	        for (i=0; i < this.aComponents.length; i++) {
				//console.log('DESTROY | '+this.aComponents[i].toString());
	            this.aComponents[i].destroy();
	        };
    	    this.aComponents = null;
        }
        if(this.oQuizController){
        	this.oQuizController.destroy();
        	this.oQuizController = null;
        }
        if(this.oTutNumController){
        	this.oTutNumController.destroy();
        	this.oTutNumController = null;
        }
        if(this.oSwiffyController){
        	this.oSwiffyController.destroy();
        	this.oSwiffyController = null;
        }
		//AudioManager.destroyPlayList();
	}
    AbstractPage.prototype.toString = function(){
        return 'controller/view/AbstractPage';
    }


    function parseActivityNode(){
        //console.log('AbstractPage.parseActivityNode() | ');
    }
    // Load the player panel
    function loadSwiffyUI(){

    }
    return AbstractPage;
});