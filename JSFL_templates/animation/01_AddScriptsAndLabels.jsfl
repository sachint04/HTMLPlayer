var sAudioLayerName = "Audio",
	sBGAudioLayerName = "scensound",
	aActionsLayerName = ["Action", "Script"],
	sLabelLayerName = "Labels",
	sBGAudioLabelLayerName = "BGAudioLabels",
	sBGAudioScriptLayerName = "BGAudioScript",
	aInvalidSounds = ["Mute.wav"],
	sSoundsXML = "",
	sComponentXML = "",
	sXMLData = "",
	
	oDocument = fl.getDocumentDOM(),
	oTimeline = oDocument.getTimeline(),
	oLibrary = oDocument.library,
	sSaveDir = oDocument.pathURI.substring(0, oDocument.pathURI.lastIndexOf("/")+1),
	sDocumentName = oDocument.pathURI.substring(oDocument.pathURI.lastIndexOf("/")+1, oDocument.pathURI.lastIndexOf("."));

function convertToBlankKeyframe(p_nStartFrameIndex, p_nEndFrameIndex){
	//oTimeline.convertToBlankKeyframes(p_nStartFrameIndex, p_nEndFrameIndex);
	oTimeline.insertKeyframe(p_nStartFrameIndex);
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
function getActionScriptLayer(){
	var objASLayer,
		nLength = aActionsLayerName.length;
	
	for(i = 0; i<nLength; i++){
		objASLayer = getLayerByName(aActionsLayerName[i], true);
		if(objASLayer !== null){
			return objASLayer;
		}
	}
	alert('ERROR: getActionScriptLayer()| Layer named "Script" or "Action" not found.');
}
function getAudioKeyframes(p_sAudioLayerName){
	fl.trace("getAudioKeyframes()");
	var aAudioKeyframes = [],
		oLayer = getLayerByName(p_sAudioLayerName, true).layer,
		aFrames = oLayer.frames,
		nFramesLength = aFrames.length,
		oFrame,
		sSoundName,
		aSoundNames = [],
		i;
	//fl.trace(oLayer);
	for (i=0; i<nFramesLength; i++) {
		oFrame = aFrames[i];
		if (i == oFrame.startFrame) {
			//fl.trace("Keyframe at: " + i);
			if(oFrame.soundLibraryItem != null && oFrame.soundName.length > 0 && isValidAudio(oFrame.soundName)) {
				sSoundName = oFrame.soundName.substring(0, oFrame.soundName.indexOf(".")).toLowerCase();
				//sSoundName = sSoundName.replace(' ', '').replace('-','_');
				sSoundName = sSoundName.replace(/[^\w]/gi,'_');
				sSoundExt = oFrame.soundName.substring(oFrame.soundName.indexOf("."), oFrame.soundName.length).toLowerCase();
				updateSoundsXML(sSoundName);
				exportSoundItem(oFrame.soundName, sSoundName + sSoundExt);
				//fl.trace("\tSound Name = "+sSoundName+" @ Keyframe "+i);
				if(aAudioKeyframes.length-1 > -1 && !aAudioKeyframes[aAudioKeyframes.length-1].end){
					var o = aAudioKeyframes[aAudioKeyframes.length-1]
					o.end = oFrame.startFrame-1;
					//fl.trace("\tIF aAudioKeyframes | Start = "+o.start+" : End = "+o.end+" : Sound Name = "+o.soundName);
					
					if(p_sAudioLayerName !== sBGAudioLayerName){
						aSoundNames.push(o.soundName);
					}
				}
				aAudioKeyframes.push({start:i, soundName:sSoundName});
			}else{
				if(aAudioKeyframes.length-1 > -1){
					var o = aAudioKeyframes[aAudioKeyframes.length-1]
					o.end = oFrame.startFrame-1;
					//fl.trace("\tELSE aAudioKeyframes | Start = "+o.start+" : End = "+o.end+" : Sound Name = "+o.soundName);
					
					if(p_sAudioLayerName !== sBGAudioLayerName){
						aSoundNames.push(o.soundName);
					}
				}
			}
		}
	}
	if(aSoundNames.length > 0){
		updateComponentXML(aSoundNames.join(','));
	}
	return aAudioKeyframes;
}
function updateComponentXML(p_sSoundName){
	sComponentXML += p_sSoundName;
}
function updateSoundsXML(p_sSoundName){
	sSoundsXML += '<sound id="'+p_sSoundName+'" filename="'+p_sSoundName+'" preload="true" playOnLoad="false"></sound>';
}
function addScript(){
	fl.trace("addScript() ");
	var aAudioKeyframes = getAudioKeyframes(sAudioLayerName),
		objASLayer = getActionScriptLayer(),
		oASLayer = objASLayer.layer,
		nASLayerIndex = objASLayer.index,
		nLength = aAudioKeyframes.length,
		
		oAudioFrame,
		nStartAudioFrameIndex,
		nEndAudioFrameIndex,
		nAudioPrevFrameIndex,
		sSoundName,
		oASFrame,
		oASPrevFrame,
		i,
		aFrameMap = "[",
		sAppendStr;
	
	if(nLength.length === 0){return aAudioKeyframes;}
	// ** Select the "Action" layer
	setSelectedLayer(nASLayerIndex, true);
	
	oASLayer.frames[0].actionScript = 'stop();\n';
	oASLayer.frames[0].actionScript += 'var bStopped,\n';
	oASLayer.frames[0].actionScript += 'sCurrentLabel,\n';
	oASLayer.frames[0].actionScript += 'nStartFrame,\n';
	oASLayer.frames[0].actionScript += 'e,\n';
	
	convertToBlankKeyframe(1, 1);
	oASLayer.frames[1].actionScript = 'bStopped = false;\n';
	oASLayer.frames[1].actionScript += 'e = new Event("ANIMATION_START");\n';
	oASLayer.frames[1].actionScript += 'e.data = {type:"ANIMATION_START"};\n';
	oASLayer.frames[1].actionScript += 'dispatchEvent(e);';
	
	for(i = 0; i < nLength; i++){
		oAudioFrame = aAudioKeyframes[i];
		nStartAudioFrameIndex = oAudioFrame.start;
		nEndAudioFrameIndex = oAudioFrame.end;
		sSoundName = oAudioFrame.soundName;
			
		convertToBlankKeyframe(nStartAudioFrameIndex, nStartAudioFrameIndex);
		/*var oAudioFrame = oAudioLayer.frames[nStartAudioFrameIndex],*/
		oASFrame = oASLayer.frames[nStartAudioFrameIndex];
		
		//fl.trace("\tnStartAudioFrameIndex = "+nStartAudioFrameIndex);
		
		oASFrame.actionScript = 'bStopped = false;\n';
		oASFrame.actionScript += 'sCurrentLabel = "'+sSoundName+'";\n';
		oASFrame.actionScript += 'nStartFrame = '+(nStartAudioFrameIndex+1)+';\n';
		oASFrame.actionScript += 'e = new Event("ANIMATION_CUE_START");\n';
		oASFrame.actionScript += 'e.data = {type:"ANIMATION_CUE_START", label:sCurrentLabel, startFrame:nStartFrame};\n';
		oASFrame.actionScript += 'dispatchEvent(e);';
		
		if(i !== 0){
			nAudioPrevFrameIndex = nStartAudioFrameIndex - 1;
			convertToBlankKeyframe(nAudioPrevFrameIndex, nAudioPrevFrameIndex);
			oASPrevFrame = oASLayer.frames[nAudioPrevFrameIndex];
			oASPrevFrame.actionScript = 'stop();\n';
			oASPrevFrame.actionScript += 'bStopped = true;\n';
			oASPrevFrame.actionScript += 'e = new Event("ANIMATION_CUE_END");\n';
			oASPrevFrame.actionScript += 'e.data = {type:"ANIMATION_CUE_END", label:sCurrentLabel, startFrame:nStartFrame};\n';
			oASPrevFrame.actionScript += 'dispatchEvent(e);';
			aFrameMap += '['+(aAudioKeyframes[i-1].start+1)+', '+(aAudioKeyframes[i-1].end+1)+', "'+aAudioKeyframes[i-1].soundName+'"],';
		}
	}
	var totalFrames = oASLayer.frameCount-1;
	//fl.trace("totalFrames = "+totalFrames+' : '+oASLayer.frames[totalFrames].startFrame);
	if(oASLayer.frames[totalFrames].startFrame !== totalFrames){
		convertToBlankKeyframe(totalFrames, totalFrames);
	}
	var oLastFrame = oASLayer.frames[totalFrames];
	oLastFrame.actionScript = 'stop();\n';
	oLastFrame.actionScript += 'bStopped = true;\n';
	oLastFrame.actionScript += 'e = new Event("ANIMATION_CUE_END");\n';
	oLastFrame.actionScript += 'e.data = {type:"ANIMATION_CUE_END", label:sCurrentLabel, startFrame:nStartFrame};\n';
	oLastFrame.actionScript += 'dispatchEvent(e);\n';
	oLastFrame.actionScript += 'e = new Event("ANIMATION_COMPLETE");\n';
	oLastFrame.actionScript += 'e.data = {type:"ANIMATION_COMPLETE"};\n';
	oLastFrame.actionScript += 'dispatchEvent(e);';
	
	aFrameMap += '['+(aAudioKeyframes[nLength-1].start+1)+', '+(aAudioKeyframes[nLength-1].end+1)+', "'+aAudioKeyframes[nLength-1].soundName+'"]';
	aFrameMap += "]";
	//fl.trace(aFrameMap);
	oASLayer.frames[0].actionScript += "aFrameMap = "+aFrameMap+";";
	
	return aAudioKeyframes;
}
function addBGAudioScript(p_sLayerName, p_aKeyFrames){
	fl.trace("addBGAudioScript()");
	if(p_aKeyFrames.length === 0){return;}
	// ** Add a new layer for the "BGAudioScript"
	oTimeline.addNewLayer(p_sLayerName, "normal", true);
	var objLayer = getLayerByName(p_sLayerName, true),
		oLayer = objLayer.layer,
		nLayerIndex = objLayer.index,
		nLength = p_aKeyFrames.length,
		
		oAudioFrame,
		nStartAudioFrameIndex,
		sSoundName,
		oFrame,
		aBgFrameMap = "[",
		i;

	// ** Select the "BGAudioScript" layer
	setSelectedLayer(nLayerIndex, true);
	oLayer.frames[0].actionScript = 'var nBGAudioStartFrame,\n';
	oLayer.frames[0].actionScript += 'sBGAudioLabel,\n';
	
	for (i=0; i<nLength; i++) {
		oAudioFrame = p_aKeyFrames[i];
		nStartAudioFrameIndex = oAudioFrame.start;
		nEndAudioFrameIndex = oAudioFrame.end;
		sSoundName = oAudioFrame.soundName;
			
		convertToBlankKeyframe(nStartAudioFrameIndex, nStartAudioFrameIndex);
		
		oFrame = oLayer.frames[nStartAudioFrameIndex];
		oFrame.actionScript = 'sBGAudioLabel = "'+sSoundName+'";\n';
		oFrame.actionScript += 'nBGAudioStartFrame = '+(nStartAudioFrameIndex+1)+';\n';
		oFrame.actionScript += 'e = new Event("PLAY_BG_AUDIO");\n';
		oFrame.actionScript += 'e.data = {type:"PLAY_BG_AUDIO", label:sBGAudioLabel, startFrame:nBGAudioStartFrame};\n';
		oFrame.actionScript += 'dispatchEvent(e);';
		if(i !== 0){
			//fl.trace("#### i = "+(p_aKeyFrames[i-1].start+1)+' : '+(p_aKeyFrames[i-1].end+1)+' : '+p_aKeyFrames[i-1].soundName);
			aBgFrameMap += '['+(p_aKeyFrames[i-1].start+1)+', '+(p_aKeyFrames[i-1].end+1)+', "'+p_aKeyFrames[i-1].soundName+'"],';
		}
	}
	
	aBgFrameMap += '['+(p_aKeyFrames[nLength-1].start+1)+', '+(p_aKeyFrames[nLength-1].end+1)+', "'+p_aKeyFrames[nLength-1].soundName+'"]';
	aBgFrameMap += "]";
	//fl.trace(aBgFrameMap);
	oLayer.frames[0].actionScript += "aBgFrameMap = "+aBgFrameMap+";";
}
function addLabels(p_sLabelLayerName, p_aKeyFrames){
	fl.trace("addLabels()");
	if(p_aKeyFrames.length === 0){return;}
	// ** Add a new layer for the "labels"
	oTimeline.addNewLayer(p_sLabelLayerName, "normal", true);
	var objLabelLayer = getLayerByName(p_sLabelLayerName, true),
		oLabelLayer = objLabelLayer.layer,
		nLabelLayerIndex = objLabelLayer.index,
		nLength = p_aKeyFrames.length,
		
		oAudioFrame,
		nStartAudioFrameIndex,
		sSoundName,
		oLabelFrame,
		i;

	// ** Select the "Labels" layer
	setSelectedLayer(nLabelLayerIndex, true);
	if(p_sLabelLayerName === sLabelLayerName){
		convertToBlankKeyframe(1, 1);
		oLabelLayer.frames[1].name = 'start';
	}
	
	for (i=0; i<nLength; i++) {
		oAudioFrame = p_aKeyFrames[i];
		nStartAudioFrameIndex = oAudioFrame.start;
		sSoundName = oAudioFrame.soundName;
			
		convertToBlankKeyframe(nStartAudioFrameIndex, nStartAudioFrameIndex);
		
		oLabelFrame = oLabelLayer.frames[nStartAudioFrameIndex];
		oLabelFrame.name = sSoundName;
	}
}
function deleteAudioLayers(){
	fl.trace("deleteAudioLayers()");
	var oAudioLayer = getLayerByName(sAudioLayerName, true);
	oTimeline.deleteLayer(oAudioLayer.index);
	var oBGAudioLayer = getLayerByName(sBGAudioLayerName, true);
	if(oBGAudioLayer !== null){oTimeline.deleteLayer(oBGAudioLayer.index);}
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
	sXMLData = "<data>" + sComponentXML + sSoundsXML + "</data>";
	//fl.trace(sXMLData);
	if(!URIExists(sSaveDir + sDocumentName)){
		createFolder(sSaveDir + sDocumentName);
	}
	FLfile.write(sSaveDir + sDocumentName + "/page.xml", sXMLData);
}
function exportSoundItem(p_sSoundName, p_sExportSoundName){
	var nSoundIndex = oLibrary.findItemIndex(p_sSoundName),
		oLibItem = oLibrary.items[nSoundIndex];
	//fl.trace("FILE URI = "+sSaveDir + sDocumentName);	
	if(!URIExists(sSaveDir + sDocumentName)){
		createFolder(sSaveDir + sDocumentName);
	}
	if(!URIExists(sSaveDir + sDocumentName + "/audio")){
		createFolder(sSaveDir + sDocumentName + "/audio");
	}
	if(!URIExists(sSaveDir + sDocumentName + "/audio/en")){
		createFolder(sSaveDir + sDocumentName + "/audio/en");
	}
	if(oLibItem.itemType == "sound"/* && oLibItem.originalCompressionType == "RAW"*/){
		oLibItem.exportToFile(sSaveDir + sDocumentName + '/audio/en/' + p_sExportSoundName);
	}
}
function isValidAudio(p_sSoundName){
	var nLength = aInvalidSounds.length,
		i;
	for (i=0; i<nLength; i++) {
		if(aInvalidSounds[i] === p_sSoundName){
			return false;
		}
	}
	return true;
}

function init(){
	fl.outputPanel.clear();
	sComponentXML = '<component type="swiffy" componentID="swiffycontainer"  audioController="AudioPanel" soundID="';
	sSoundsXML += '<sounds location="audio">';
	var aAudioKeyframes = addScript(),
		aBGAudioKeyFrames = getAudioKeyframes(sBGAudioLayerName);
	
	addLabels(sLabelLayerName, aAudioKeyframes);
	
	addBGAudioScript(sBGAudioScriptLayerName, aBGAudioKeyFrames);
	addLabels(sBGAudioLabelLayerName, aBGAudioKeyFrames);
	
	deleteAudioLayers();
	
	sComponentXML += '"><![CDATA[]]></component>';
	sComponentXML += '<component type="audiopanel" componentID="audiopanelcontainer" view="audio_panel.html" viewLocation="global_html"><item type="button" id="btn_play" available="true"></item><item type="button" id="btn_pause" available="true"></item><item type="button" id="btn_replay" available="true"></item><item type="slider" id="slider_volume_seek" available="true" seeking="true" direction="horizontal"></item><item type="slider" id="slider_playhead_seek" available="true" seeking="true" direction="horizontal"></item></component>';
	sSoundsXML += '</sounds>';
	saveXML();
	
	saveAsCopy();
}

init();