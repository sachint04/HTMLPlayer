define([
    'jquery',
    'x2js',
    /*'model/Constants',*/
    'core/AudioManager',
    'controller/SwiffyController',
    'controller/QuizController',
    'controller/TutorialNumeralController',
    'util/LoaderUtil',
    'util/EventDispatcher',
    'validators/ErrorApi',
    'util/MessageLogger'
], function($, X2JS/*, Constants*/, AudioManager, SwiffyController, QuizController, TutorialNumeralController, LoaderUtil, EventDispatcher, Logger){
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
            quizpanel		: 'component/QuizPanel',
            tutnumpanel		: 'component/TutNumPanel'
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
       console.log('AbstractPage.init() | '+p_sPageName);
        this.$domView = p_$domPageHolder;
        this.sGUID = p_sPageName;
        //Constants.setCurrentPageName(p_sPageName);
        loadResources.call(this, p_oResources);
    };

    function loadResources(p_oResources){
        console.log('AbstractPage.loadResources() | p_oResources = '+JSON.stringify(p_oResources));
        var oScope = this;
        /*p_oResources.xml = Constants.getLocation('xml') +this.sGUID+'/'+ p_oResources.xml;
        p_oResources.css = Constants.getLocation('css') + this.sGUID+'/'+p_oResources.css;
        if(this.$domView){
	        p_oResources.html = Constants.getLocation('css') + this.sGUID+'/'+p_oResources.html;
        }*/
        LoaderUtil.loadResource(p_oResources, function(data){
            onResourceLoaded.call(oScope, data);
        });
    }
    function onResourceLoaded(data){
        var sXmlData    = data.xml,
            sCssData    = (data.css || ''),
            $htmlView   = $(data.html),
            oX2JS = new X2JS();

        this.$domView.append($htmlView);
        this.$domView.find('#content').attr('id', this.sGUID);
        this.$domView = this.$domView.find('#'+this.sGUID);
        //this.$domView.find('#content_wrapper').append('<style>'+sCssData+'</style>');
        //this.$domView.find('#content_wrapper').append($(sHtml));
        this.jsonXMLData = oX2JS.xml2json(sXmlData);

        console.log('AbstractPage.onResourceLoaded() | sXmlData = '+sXmlData+' : '+this);
        this.dispatchEvent('PAGE_RESOURCES_LOADED', {type : 'PAGE_RESOURCES_LOADED', target : this});
        parsePageJson.call(this);
    }
    function parsePageJson(){
        console.log('AbstractPage.parsePageJson() | ');
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
        console.log('AbstractPage.parseSoundsNode() | ');
        //AudioManager.init();
        if(this.jsonXMLData.data.sounds){
            AudioManager.parseSoundsNode(this.jsonXMLData.data.sounds);
        }
    }
    function parseComponentNode(){
        console.log('AbstractPage.parseComponentNode() | ');
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
                console.log('\tComponent Type = '+sComponentType+' : DOM View = '+this.$domView[0]);

                // ** Add sections for each Component type
                if (sComponentType === 'SWIFFY') {
                    createComponent.call(this, this.oComponentClassPath.swiffy, oComponent);
                }
                if (sComponentType === 'AUDIOPANEL') {
                    createComponent.call(this, this.oComponentClassPath.audiopanel, oComponent);
                }
                 if (sComponentType === 'QUIZPANEL') {
                    createComponent.call(this, this.oComponentClassPath.quizpanel, oComponent);
                }
                 if (sComponentType === 'TUTNUMPANEL') {
                    createComponent.call(this, this.oComponentClassPath.tutnumpanel, oComponent);
                }
            }
        } else {
            this.bComponentsLoaded = true;
            checkLoadComplete.call(this);
        }
    }
    function createComponent(p_jsFilePath, p_oComponent) {
        console.log('AbstractPage.parseComponentNode() | GUID = '+this.sGUID);
        var oScope = this;

        require([
            p_jsFilePath
        ], function(Component) {
            initComponent.call(oScope, Component, p_oComponent);
        });
    };
    function initComponent(p_oComponentClass, p_oComponent, p_oCompConfig) {
        console.log('AbstractPage.initComponent() | GUID = '+this.sGUID);
        var oCompConfig = (p_oCompConfig) ? p_oCompConfig : {},
            sProp;
        for(sProp in p_oComponent){
            if(typeof(p_oComponent[sProp]) !== 'object' && sProp !== '__cdata'){
                oCompConfig[sProp] = p_oComponent[sProp];
            }
        }
        console.log('\tComponent Config = '+JSON.stringify(oCompConfig));

        var oScope = this,
            Component = p_oComponentClass,
            sComponentID = p_oComponent._componentID,
            oComponent = new Component();

        //oCompConfig['componentID'] = sComponentID;
        oCompConfig['componentUID'] = this.sGUID + '|' + sComponentID;
        //console.log('AbstractPage.initComponent() | sComponentID = '+sComponentID+' this.$domView = '+this.$domView[0]);
        oComponent.addEventListener('COMPONENT_LOADED', this.onComponentLoaded);
        oComponent.init(this.$domView.find('#'+sComponentID), oCompConfig, p_oComponent);
    };
    function onComponentLoaded(e){
        var oScope = this,
            oComponent = e.target;
        oComponent.removeEventListener('COMPONENT_LOADED', this.onComponentLoaded);
        // ** Storing a reference of the component in the array
        if(this.aComponents === null){this.aComponents = [];}
        this.aComponents.push(oComponent);
        if(!this.oSwiffyController){this.oSwiffyController = new SwiffyController();}
        if(oComponent.getConfig()._type === 'swiffy'){
            this.oSwiffyController.registerSwiffy(oComponent);
        }
        if(oComponent.getConfig()._type === 'audiopanel'){
            this.oSwiffyController.registerAudioPanel(oComponent);
        }

        if(oComponent.getConfig()._type === 'quizpanel'){
        	this.oQuizController = new QuizController();
            this.oQuizController.registerQuizPanel(oComponent);
        }
		if(oComponent.getConfig()._type === 'tutnumpanel'){
        	this.oTutNumController = new TutorialNumeralController();
            this.oTutNumController.registerPanel(oComponent);
        }
        console.log('AbstractPage.onComponentLoaded() | haveAllComponentsLoaded = '+haveAllComponentsLoaded.call(this));
        if (haveAllComponentsLoaded.call(this)) {
            this.bComponentsLoaded = true;
        }
        checkLoadComplete.call(this);
    };
    function haveAllComponentsLoaded() {
        console.log('AbstractPage.haveAllComponentsLoaded() | To Load = '+this.jsonXMLData.data.component.length+' : Loaded = '+this.aComponents.length);
        if (this.jsonXMLData.data.component.length === this.aComponents.length) {
            return true;
        }
        return false;
    };
    function checkLoadComplete(){
        console.log('AbstractPage.checkLoadComplete() | bPageAssetsLoaded = '+this.bPageAssetsLoaded+' : bActivityLoaded = '+this.bActivityLoaded+' : bComponentsLoaded = '+this.bComponentsLoaded+ ' | page ID = '+ this.sGUID);
        //if(this.bActivityLoaded && this.bComponentsLoaded && this.bPageAssetsLoaded && this.bAudiosLoaded){
        //if(this.bActivityLoaded && this.bComponentsLoaded && this.bPageAssetsLoaded){
        if(this.bComponentsLoaded){
            //this.setContent();
            this.$domView.fadeIn().removeClass('hide').focus();
            // ** Call a Concrete class method to do its stuff and dispatch the 'PAGE_LOADED' event
            this.initialize();
        }
    };


    // ** Stub Method to be implemented in the Final Page Class
    AbstractPage.prototype.initialize                       = function(){
       // Logger.logDebug('PageAbstract.initialize() ');
        this.dispatchEvent("PAGE_LOADED");
        this.$domView.parent().scrollTop(0);
        $('html').scrollTop(0);
        this.$domView.focus();
    };

	AbstractPage.prototype.destroy = function(){
		
            var i;
            
        if(this.aComponents){
	        for (i=0; i < this.aComponents.length; i++) {
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
    }
    AbstractPage.prototype.toString = function(){
        return 'controller/view/AbstractPage';
    }


    function parseActivityNode(){
        console.log('AbstractPage.parseActivityNode() | ');
    }
    // Load the player panel
    function loadSwiffyUI(){

    }
    return AbstractPage;
});