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
		aExceptionLayers = p_aExceptionLayers || [];
	for (var i = oTimeline.layers.length - 1; i >= 0 ; i--){
		var oLayer = oTimeline.layers[i],
			sLayerName = oLayer.name;
		if(aLayerNames.length === 0 && aExceptionLayers.indexOf(sLayerName) === -1){
			//fl.trace(i+' : Deleting Layer: '+oLayer.name);
			oTimeline.deleteLayer(i);
			continue;
		}
		if(aLayerNames.indexOf(sLayerName) > -1){
			oTimeline.deleteLayer(oLayer.index);
		}
	}
}
function addItemToStage(p_sItemName){
	//fl.trace('addItemToStage() | Item Exists in Library = '+ oLibrary.itemExists(p_sItemName));
	if(oLibrary.itemExists(p_sItemName)){
		oLibrary.selectItem(p_sItemName);
		oLibrary.addItemToDocument({
			x: 0,
			y: 0
		});
		oDocument.align("left", true);
		oDocument.align("top", true);
		//oDocument.setElementProperty('x', 200)
		//oDocument.setElementProperty('y', 500)
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
function saveXML(){
	fl.trace("saveXML()");
	sXMLData = "<data pageType='DER'>" + sComponentXML + sSoundsXML + "</data>";
	//fl.trace(sXMLData);
	if(!URIExists(sSaveDir + sDocumentName)){
		createFolder(sSaveDir + sDocumentName);
	}
	FLfile.write(sSaveDir + sDocumentName + "/page.xml", sXMLData);
}
function init(){
	fl.outputPanel.clear();
	deleteLayer(null, ["BG"]);
	addItemToStage('allData');
	sComponentXML = '<component type="swiffy" componentID="swiffycontainer"  audioController="AudioPanel" soundID="';
	sSoundsXML += '<sounds location="audio">';
	sComponentXML += '"><![CDATA[]]></component>';
	
	sComponentXML += '<component type="derivationpanel" componentID="derivationpanelcontainer" view="derivation_panel.html" viewLocation="global_html"><item type="button" id="btn_understand_concept" available="true"></item><item type="button" id="btn_assumptions" available="true"></item><item type="button" id="btn_begin_derivation" available="true"></item><item type="button" id="btn_at_a_glance" available="true"></item></component>';
	
	sComponentXML += '<component type="audiopanel" componentID="audiopanelcontainer" view="audio_panel.html" viewLocation="global_html"><item type="button" id="btn_play" available="true"></item><item type="button" id="btn_pause" available="true"></item><item type="button" id="btn_replay" available="true"></item><item type="slider" id="slider_volume_seek" available="true" seeking="true" direction="horizontal"></item><item type="slider" id="slider_playhead_seek" available="true" seeking="true" direction="horizontal"></item></component>';
	sSoundsXML += '</sounds>';
	saveXML();
	
	saveAsCopy();
	fl.trace("All DONE...!");
}

init();