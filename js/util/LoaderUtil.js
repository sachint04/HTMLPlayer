define([
    /*'util/EventDispatcher',*/
    'util/ResourceLoader',
    'validators/ErrorApi',
    'util/MessageLogger'
], function(/*EventDispatcher, */ResourceLoader, ErrorApi, Logger){
    'use strict';

    function LoaderUtil(){
        //EventDispatcher.call(this);
        this.fnCallback;
        this.onResourceLoaded = onResourceLoaded.bind(this);
        this.onResourceLoadError = onResourceLoadError.bind(this);
    }
    //LoaderUtil.prototype = Object.create(EventDispatcher.prototype);
    LoaderUtil.prototype.constructor = LoaderUtil;

    LoaderUtil.prototype.loadResource = function(p_aFiles, p_fnCallback){
        console.log('LoaderUtil.loadResources() | p_aFiles = '+p_aFiles)
        var oScope = this,
            oResourceLoader = new ResourceLoader();
        this.fnCallback = p_fnCallback;
        oResourceLoader.addEventListener('RESOURCES_LOADED', this.onResourceLoaded);
        oResourceLoader.addEventListener('RESOURCE_LOAD_ERROR', this.onResourceLoadError);
        oResourceLoader.loadResource(p_aFiles);
    }
    function onResourceLoaded(e){
        console.log('LoaderUtil.onResourceLoaded() | Resource Length = '+e.data.length);
        //this.dispatchEvent(e.type, e);
        this.fnCallback.call(this, e.data);
        destroyResourceLoader.call(this, e.target);
    }
    function onResourceLoadError(e){
        //this.dispatchEvent(e.type, e);
        destroyResourceLoader.call(this, e.target);
        var sErrorMsg = ErrorApi.getErrorMessage(1, 'fileNotFound').replace('@@fileName@@', e.filePath);
        Logger.logError(e, sErrorMsg, true, true);
    }
    function destroyResourceLoader(p_oResourceLoader){
        var oScope = this;
        p_oResourceLoader.removeEventListener('RESOURCES_LOADED', this.onResourceLoaded);
        p_oResourceLoader.removeEventListener('RESOURCE_LOAD_ERROR', this.onResourceLoadError);
        p_oResourceLoader.destroy();
        p_oResourceLoader = null;
        this.fnCallback = null;
    }

    return new LoaderUtil();
})
