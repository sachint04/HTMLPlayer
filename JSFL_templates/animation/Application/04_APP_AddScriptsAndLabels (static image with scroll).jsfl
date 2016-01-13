var sVersion = 1.0,
	sSoundsXML = "",
	sComponentXML = "",
	sXMLData = "",
	
	oDocument = fl.getDocumentDOM(),
	oTimeline = oDocument.getTimeline(),
	oLibrary = oDocument.library,
	sSaveDir = oDocument.pathURI.substring(0, oDocument.pathURI.lastIndexOf("/")+1),
	sDocumentName = oDocument.pathURI.substring(oDocument.pathURI.lastIndexOf("/")+1, oDocument.pathURI.lastIndexOf("."));

function convertToBlankKeyframe(p_nStartFrameIndex, p_nEndFrameIndex){
	//fl.trace('>> Inserting Keyframe @ '+p_nStartFrameIndex);
	//oTimeline.convertToBlankKeyframes(p_nStartFrameIndex, p_nEndFrameIndex);
	oTimeline.insertKeyframe(p_nStartFrameIndex);
}
function clearKeyFrame(p_nStartFrameIndex, p_nEndFrameIndex){
	oTimeline.clearKeyframes(p_nStartFrameIndex);
}
function URIExists(p_sFileURI){
	return FLfile.exists(p_sFileURI);
}
function createFolder(p_sFileURI){
	return FLfile.createFolder(p_sFileURI);
}
function setSelectedLayer(p_nLayerIndex, p_bReplaceCurrentSelection){
	oTimeline.setSelectedLayers(p_nLayerIndex, (p_bReplaceCurrentSelection || true));
}
function getLayerByName(p_sLayerName, p_bCaseSensitive){
	var aLayers = oTimeline.layers,
		nLayers = aLayers.length,
		sLayerName = (p_bCaseSensitive) ? p_sLayerName : p_sLayerName.toLowerCase(),
		i;
		
	for(i = 0; i<nLayers; i++){
		//fl.trace(aLayers[i].name+" === "+sLayerName);
		if(aLayers[i].name === sLayerName){
			return {layer:aLayers[i], index:i};
		}
	}
	
	return null;
}
function deleteLayer(p_aLayerNames, p_aExceptionLayers){
	// ** Deletes all layers if name not specified
	//fl.trace('Total Layers: '+oTimeline.layers.length);
	var aLayerNames = p_aLayerNames || [],
		nTotalLayers = oTimeline.layers.length,
		aExceptionLayers = p_aExceptionLayers || [],
		aPassedExceptions = [],
		i,
		oLayer,
		sLayerName;
	for (i = nTotalLayers - 1; i >= 0 ; i--){
		oLayer = oTimeline.layers[i];
		sLayerName = oLayer.name;
		
		if(aLayerNames.length === 0 && aExceptionLayers.indexOf(sLayerName) === -1){
			//fl.trace(i+' : Deleting Layer: '+oLayer.name);
			oTimeline.deleteLayer(i);
			continue;
		}else{
			aPassedExceptions.push(sLayerName);
		}
		if(aLayerNames.indexOf(sLayerName) > -1){
			oTimeline.deleteLayer(oLayer.index);
		}
	}
	if(aExceptionLayers.length > 0 && aPassedExceptions.length === 0){
		fl.trace('Exception layers by name/s "'+aExceptionLayers+' not found."');
	}
}
function deleteOtherFrames(p_aFramesToDelete, p_aExceptionFrames){
	var nFrmCount = oTimeline.layers[0].frameCount;
	oTimeline.currentFrame	= 1;
	
	while(nFrmCount > 1){
		oTimeline.removeFrames(1); 
		nFrmCount = oTimeline.layers[0].frameCount;
		//fl.trace('nFrmCount = '+nFrmCount);
		break;
	}
	oTimeline.currentFrame	= 1;
}
function addItemToStage(p_sItemName){
	//fl.trace('addItemToStage() | Item Exists in Library = '+ oLibrary.itemExists(p_sItemName));
	if(oLibrary.itemExists(p_sItemName)){
		oLibrary.selectItem(p_sItemName);
		oLibrary.addItemToDocument({
			x: 0,
			y: 0
		});
		var nMaxWidth = Math.round(oDocument.getElementProperty("width")),
			nMaxHeight = Math.round(oDocument.getElementProperty("height")) + 20;
		oDocument.width = nMaxWidth;
		oDocument.height = nMaxHeight;
		oDocument.align("left", true);
		oDocument.align("top", true);
		//fl.trace('addItemToStage() | Item Exists in Library = '+ oDocument.getElementProperty("height"));
		//fl.trace('nMaxWidth = '+nMaxWidth+' : nMaxHeight = '+nMaxHeight);
	}else{
		fl.trace('Item named "'+p_sItemName+'" does not exist in library');
	}
}

function saveAsCopy(){
	fl.trace("saveAsCopy()");
	var docURI= oDocument.pathURI;// get name&location of current document
	var appendName = "_swiffy.fla";
	docURI = docURI.replace(".fla", appendName);//create appended name for new version
	//(do stuff to my fla)
	fl.saveDocument(fl.documents[0], docURI);//save as new doc name
	fl.openDocument(docURI);//open this newly saved document
}
function exportPNG(p_sPngFileName){
	if(!URIExists(sSaveDir + sDocumentName)){
		createFolder(sSaveDir + sDocumentName);
	}
	var sPngFileName = p_sPngFileName || sDocumentName;
	fl.trace("exportPNG() | "+sSaveDir + sDocumentName + "/" + sPngFileName + ".png");
	oDocument.exportPNG(sSaveDir + sDocumentName + "/" + sPngFileName + ".png", true, true);
}
function saveXML(){
	fl.trace("saveXML()");
	sXMLData = "<data pageType='APP'>" + sComponentXML + sSoundsXML + "</data>";
	//fl.trace(sXMLData);
	if(!URIExists(sSaveDir + sDocumentName)){
		createFolder(sSaveDir + sDocumentName);
	}
	FLfile.write(sSaveDir + sDocumentName + "/page.xml", sXMLData);
}
function saveHTML(sHTMLData){
	fl.trace("saveHTML()");
	if(!URIExists(sSaveDir + sDocumentName)){
		createFolder(sSaveDir + sDocumentName);
	}
	FLfile.write(sSaveDir + sDocumentName + "/page.html", sHTMLData);
}

function init(){
	fl.outputPanel.clear();
	//deleteLayer(null, ['BG']);
	deleteLayer(null);
	deleteOtherFrames();
	//exportPNG('bg');
	//deleteLayer();
	addItemToStage('allData');
	exportPNG();
	
	sComponentXML += '<component type="applicationpanel" componentID="applicationpanelcontainer" view="application_panel.html" viewLocation="global_html"><item type="button" id="btn_see_tutorial" available="true"></item><item type="button" id="btn_see_formulae" available="true"></item><item type="button" id="btn_see_solution" available="true"></item></component>';
	saveXML();
	
	sHTMLData = '<!-- The ID below for the root div tag will be replaced dynamically by the Pages GUID -->';
	sHTMLData += '<div id="content" class="page-content APP image-page">';
	sHTMLData += '<div id="page_wrapper">';
	sHTMLData += '<div id="image_holder">';
	sHTMLData += '<div id="image_container">';
	sHTMLData += '<img src="content/'+sDocumentName+'/'+sDocumentName +'.png" />'
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	sHTMLData += '<div id="applicationpanelcontainer">';
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	saveHTML(sHTMLData);
	
	fl.trace("All DONE...!");
	oDocument.close(false);
}

init();