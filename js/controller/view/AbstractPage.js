define([
    'jquery',
    'x2js',
    'model/Constants',
    'core/AudioManager',
    'controller/SwiffyController',
    'util/LoaderUtil',
    'util/EventDispatcher',
    'validators/ErrorApi',
    'util/MessageLogger'
], function($, X2JS, Constants, AudioManager, SwiffyController, LoaderUtil, EventDispatcher, Logger){
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
            swiffy          : 'component/SwiffyWidget'
        };

        this.bActivityLoaded = null;
        this.oActivityClassPath     = {
            MCQ                     : 'framework/activity/viewcontroller/MCQ',
        };

        this.oSwiffyController = null;

        this.onComponentLoaded = onComponentLoaded.bind(this);
    }
    AbstractPage.prototype = Object.create(EventDispatcher.prototype);
    AbstractPage.prototype.constructor = AbstractPage;

    AbstractPage.prototype.init = function(p_$domPageContainer, p_oResources, p_sPageName){
        //console.log('AbstractPage.init() | '+p_sPageName);
        this.$domView = p_$domPageContainer;
        this.sGUID = p_sPageName;
        Constants.setCurrentPageName(p_sPageName);
        loadResources.call(this, p_oResources);
    }
    AbstractPage.prototype.destroy = function(){
        var nComponentsLength = this.aComponents.length,
            i;
        for (i=0; i < nComponentsLength; i++) {
            this.aComponents[i].destroy();
        };

        if(!this.oSwiffyController){this.oSwiffyController.destroy();}
    }
    AbstractPage.prototype.toString = function(){
        return 'controller/view/AbstractPage';
    }

    function loadResources(p_oResources){
        console.log('AbstractPage.loadResources() | p_oResources = '+JSON.stringify(p_oResources)+'\nXml Location = '+Constants.getLocation('xml'));
        var oScope = this;
        p_oResources.xml = Constants.getLocation('xml') + p_oResources.xml;
        p_oResources.css = Constants.getLocation('css') + p_oResources.css;
        LoaderUtil.loadResource(p_oResources, function(data){
            onResourceLoaded.call(oScope, data);
        });
    }
    function onResourceLoaded(data){
        var sXmlData = data.xml,
            sCssData = (data.css || ''),
            oX2JS = new X2JS();
        this.jsonXMLData = oX2JS.xml2json(sXmlData);

        //console.log('AbstractPage.onResourceLoaded() | sXmlData = '+sXmlData+' : '+this);
        this.dispatchEvent('PAGE_RESOURCES_LOADED', {type : 'PAGE_RESOURCES_LOADED', target : this});
        parsePageJson.call(this);
    }
    function parsePageJson(){
        console.log('AbstractPage.parsePageJson() | ');
        // ** Parse Sounds node
        parseSoundsNode.call(this);
        // ** Parse Component node
        parseComponentNode.call(this);
        // ** Parse Activity node
        parseActivityNode.call(this);
    }
    function parseSoundsNode(){
        console.log('AbstractPage.parseSoundsNode() | ');
        //AudioManager.init();
        AudioManager.parseSoundsNode(this.jsonXMLData.data.sounds);
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
            }
        } else {
            this.bComponentsLoaded = true;
            this.checkLoadComplete();
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
        console.log('AbstractPage.initComponent() | Config = '+JSON.stringify(oCompConfig));

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
        if(this.bActivityLoaded && this.bComponentsLoaded){
            this.$domView.fadeIn().removeClass('hide').focus();
            // ** Call a Concrete class method to do its stuff and dispatch the 'PAGE_LOADED' event
            this.initialize();
        }
    };



    // ** Stub Method to be implemented in the Final Page Class
    AbstractPage.prototype.initialize                       = function(){
        Logger.logDebug('PageAbstract.initialize() ');
        this.dispatchEvent("PAGE_LOADED");
        this.$domView.parent().scrollTop(0);
        $('html').scrollTop(0);
        this.$domView.focus();
    };



    function parseActivityNode(){
        console.log('AbstractPage.parseActivityNode() | ');
    }
    // Load the player panel
    function loadSwiffyUI(){

    }
    return AbstractPage;
});
