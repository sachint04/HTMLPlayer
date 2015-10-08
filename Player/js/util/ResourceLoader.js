define([
    'jquery',
    'util/EventDispatcher',
    'util/MessageLogger'
], function ($, EventDispatcher, Logger) {
    'use strict';
    
    function ResourceLoader() {
        EventDispatcher.call(this);
        this.name = "default";
        this.aResourceList = null;
        this.aResourceData = null;
        this.oContext = null;
        this.fCallback = null;
        this.aArgs = null;
    }
    ResourceLoader.prototype = Object.create(EventDispatcher.prototype);
    ResourceLoader.prototype.constructor = ResourceLoader;

    /* -------------------
     * Private Methods
     * ------------------- */
    function load(p_resourcePath, p_dataType, p_nIndex) {
        //Logger.logDebug('ResourceLoader.load() | '+(this.getName() || "")+' | Path = ' + p_resourcePath+' : dataType = '+p_dataType);
        var oScope = this;
        $.ajax({
            type: "GET",
            url: p_resourcePath,
            dataType: p_dataType,
            success: function (p_data) {
                oScope.dispatchEvent('RESOURCE_LOADED', {
                    type:'RESOURCE_LOADED',
                    target:oScope,
                    filePath:p_resourcePath,
                    fileType:p_dataType,
                    data:p_data,
                    index:p_nIndex
                });
                onResourceLoad.call(oScope, p_data, p_nIndex);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                oScope.dispatchEvent('RESOURCE_LOAD_ERROR', {
                    type:'RESOURCE_LOAD_ERROR',
                    target:oScope,
                    filePath:p_resourcePath,
                    fileType:p_dataType
                });
                Logger.logError('Not able to load ' + p_dataType.toUpperCase() + ' file "' + p_resourcePath + '" with ERROR:"' + errorThrown + '"');
            }
        });
    }
    function onResourceLoad(p_oData, p_nIndex){
        //Logger.logDebug('ResourceLoader.onResourceLoad() | '+(this.getName() || "")+' | oData = ' + p_oData +' : Index = '+p_nIndex);
        this.aResourceData[p_nIndex] = p_oData;
        //this.aResourceData[this.getFileName(this.aResourceList[p_nIndex])] = p_oData;
        this.aResourceData.count++;
        //Logger.logDebug('ResourceLoader.onResourceLoad() | File Loaded = '+this.getFileName(this.aResourceList[p_nIndex])+' : Data Length = '+this.aResourceData.count+' : Resource Length = '+this.aResourceList.length);
        if (this.aResourceData.count === this.aResourceList.length) {
            this.dispatchEvent('RESOURCES_LOADED', {
                type:'RESOURCES_LOADED',
                target:this,
                data:this.aResourceData
            });
            if (this.fCallback) {
                this.aArgs.unshift(this.aResourceData, this);
                this.fCallback.apply(this.oContext, this.aArgs);
                //this.fCallback.call(this.oContext, this.aResourceData.slice(0), this, this.aArgs);
            }
        }
    }
    function getFileName(p_sFilePath) {
        return p_sFilePath.substring(p_sFilePath.lastIndexOf('/') + 1, p_sFilePath.lastIndexOf('.'));
    }
    function getFileType(p_sResourcePath) {
        var oPattern_extDot = new RegExp('.xml|.html|.json|.js|.txt|.css$', 'i'),
            oPattern_ext = new RegExp('xml|html|json|js|txt|css$', 'i'),
            sFileType;

        //Logger.logDebug('ResourceLoader.getFileType() | Path = '+p_sResourcePath+' : Pattern Match = '+oPattern_extDot.test(p_sResourcePath));
        if (oPattern_extDot.test(p_sResourcePath)) {
            sFileType = oPattern_ext.exec(p_sResourcePath).toString().toLowerCase();
            if (sFileType === "js") {
                sFileType = "script";
            }
            if (sFileType === "css") {
                sFileType = "text";
            }
            //Logger.logDebug('File Type >> '+sFileType);
            return sFileType;
        }

        return null;
    }
    /* -------------------
     * Public Methods
     * ------------------- */
    ResourceLoader.prototype.setName = function(p_name) {
        this.name = p_name;
    };
    ResourceLoader.prototype.getName = function() {
        return this.name;
    };
    ResourceLoader.prototype.loadResource = function(p_aResourceList, p_oContext, p_fCallback, p_aArgs) {
        this.aResourceList = p_aResourceList;
        if (typeof p_aResourceList === 'string') {
            this.aResourceList = new Array(p_aResourceList);
        }
        var nResourceListLength = this.aResourceList.length;
        //Logger.logDebug('ResourceLoader.loadResource() | '+(this.getName() || "")+' : '+this.aResourceList+'\n\tResource List Length = '+nResourceListLength+"\n\tResource List is Array = "+(p_aResourceList instanceof Array)+"\n\tResource List is String = "+(typeof p_aResourceList === 'string'));
        this.aResourceData = [];
        this.aResourceData.count = 0;

        this.oContext = p_oContext;
        this.fCallback = p_fCallback;
        this.aArgs = p_aArgs || [];

        if (nResourceListLength) {
            var i;
            for (i = 0; i < nResourceListLength; i++) {
                var sResourcePath = this.aResourceList[i],
                    sFileType = getFileType.call(this, sResourcePath);

                if (sFileType) {
                    load.call(this, sResourcePath, sFileType, i);
                }
            }
        } else {
            this.aResourceList.length = 0;
            for (i in this.aResourceList) {
                var sResourceID = i,
                    sResourcePath = this.aResourceList[i],
                    sFileType = getFileType.call(this, sResourcePath);
                //Logger.logDebug('\tFile Type = '+sFileType);

                if (sFileType) {
                    this.aResourceList.length++;
                }
            }
            //Logger.logDebug('\tResource Length = '+this.aResourceList.length);
            for (i in this.aResourceList) {
                var sResourceID = i,
                    sResourcePath = this.aResourceList[i],
                    sFileType = getFileType.call(this, sResourcePath);
                //Logger.logDebug('\tResource ID = '+sResourceID+' : File Type = '+sFileType+' : Resource Path = '+sResourcePath);

                if (sFileType) {
                    load.call(this, sResourcePath, sFileType, sResourceID);
                }
            }
        }

    };
    ResourceLoader.prototype.destroy = function() {
        //Logger.logDebug('ResourceLoader.dispose() | '+(this.getName() || ""));
        this.oScope = null;
        this.name = null;
        this.aResourceList = null;
        this.aResourceData = null;
        this.oContext = null;
        this.fCallback = null;
        this.aArgs = null;
        EventDispatcher.prototype.destroy.call(this);
    };
    ResourceLoader.prototype.toString = function(){
        return 'util/ResourceLoader';
    };

    return ResourceLoader;
});