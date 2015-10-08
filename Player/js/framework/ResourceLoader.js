define([
	'jquery',
], function($){
	function ResourceLoader(){
		var self = this,
			name = "default",
			aResourceList = null,
			aResourceData = null,
			oContext = null,
			fCallback = null,
			aArgs = null;
	}

	ResourceLoader.prototype = {
		constructor : ResourceLoader,
		/* -----------------------------------------*/
		/* 				 Private Methods 			*/
		/* -----------------------------------------*/
		_load : function(p_resourcePath, p_dataType, p_nIndex){
			////Logger.logDebug('ResourceLoader._load() | '+(this.getName() || "")+' | Path = ' + p_resourcePath+' : dataType = '+p_dataType);
			var self = this;
			$.ajax({
				type : "GET",
				url : p_resourcePath,
				dataType : p_dataType,
				success : function(xml) {
					self._onResourceLoad(xml, p_nIndex);
				},
				error:function(jqXHR, textStatus, errorThrown){
			        //Logger.logError('Not able to load '+p_dataType.toUpperCase()+' file "'+p_resourcePath+'" with ERROR:"'+errorThrown+'"');
				}
			});
		},
		_onResourceLoad : function(p_oData, p_nIndex){
			////Logger.logDebug('ResourceLoader._onResourceLoad() | '+(this.getName() || "")+' | oData = ' + p_oData +' : Index = '+p_nIndex);
			this.aResourceData[p_nIndex] = p_oData;
			this.aResourceData[this._getFileName(this.aResourceList[p_nIndex])] = p_oData;
			this.aResourceData.count++;
			////Logger.logDebug('ResourceLoader._onResourceLoad() | File Loaded = '+this._getFileName(this.aResourceList[p_nIndex])+' : Data Length = '+this.aResourceData.count+' : Resource Length = '+this.aResourceList.length);
			if(this.aResourceData.count == this.aResourceList.length){
				if(this.fCallback){
					this.aArgs.unshift(this.oContext, this.aResourceData.slice(0), this);
					this.fCallback.apply(this.oContext, this.aArgs);
					//this.fCallback.call(this.oContext, this.aResourceData.slice(0), this, this.aArgs);
				}
			}
		},
		_getFileName : function(p_sFilePath){
			return p_sFilePath.substring(p_sFilePath.lastIndexOf('/')+1, p_sFilePath.lastIndexOf('.'));
		},

		/* -----------------------------------------*/
		/* 				 Public Methods 			*/
		/* -----------------------------------------*/
		setName : function(p_name){
			this.name = p_name;
		},
		getName : function(){
			return this.name;
		},
		loadResource : function(p_aResourceList, p_oContext, p_fCallback, p_aArgs){
//			//Logger.logDebug('ResourceLoader.loadResource() | '+(this.getName() || "")+' : '+p_aResourceList+" : List is Array = "+(p_aResourceList instanceof Array));
			this.aResourceList = (p_aResourceList instanceof Array) ? p_aResourceList.slice(0) : new Array(p_aResourceList);
			this.aResourceData = [];
			this.aResourceData.count = 0;
			this.oContext = p_oContext;
			this.fCallback = p_fCallback;
			this.aArgs = p_aArgs || [];

			var i;
			var nResourceListLength = this.aResourceList.length;
			var oPattern_extDot = new RegExp('.xml|.html|.js|.json|.txt|.css$', 'i');
			var oPattern_ext = new RegExp('xml|html|js|json|txt|css$', 'i');
			for(i=0; i < nResourceListLength; i++){
				var sResourcePath =  this.aResourceList[i];
				////Logger.logDebug('ResourceLoader.loadResource() | Path = '+sResourcePath+' : Pattern Match = '+oPattern_extDot.test(sResourcePath));
				if (oPattern_extDot.test(sResourcePath)) {
					var dataType = oPattern_ext.exec(sResourcePath).toString().toLowerCase();
					if(dataType == "js"){dataType="script";}
					if(dataType == "css"){dataType="text";}
					////Logger.logDebug('dataType >> '+dataType);
					this._load(sResourcePath, dataType, i);
				}
			}
		},
		destroy : function(){
			//Logger.logDebug('ResourceLoader.dispose() | '+(this.getName() || ""));
			this.aResourceList = null;
			this.aResourceData = null;
			this.oContext = null;
			this.fCallback = null;
		}
	};

	return ResourceLoader;
});