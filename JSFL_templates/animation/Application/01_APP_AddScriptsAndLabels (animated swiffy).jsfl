var sVersion = 1.0,
	sAudioLayerName = "Audio",
	sBGAudioLayerName = "scensound",
	aActionsLayerName = ["Action", "Script"],
	sLabelLayerName = "Labels",
	sBGAudioLabelLayerName = "BGAudioLabels",
	sBGAudioScriptLayerName = "BGAudioScript",
	aInvalidSounds = ["Mute.wav", "mute.mp3", "Mute.mp3", "mute.wav", "a-Mute.wav", "a-mute.wav", "a-Mute.mp3", "a-mute.mp3","MUTE AUDIO.wav"],
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
	fl.trace("getAudioKeyframes() | "+p_sAudioLayerName);
	var oLayer = getLayerByName(p_sAudioLayerName, true);
	if(oLayer === null){return [];}
	var aAudioKeyframes = [],
		oLayer = oLayer.layer,
		aFrames = oLayer.frames,
		nFramesLength = aFrames.length,
		oFrame,
		sSoundName,
		aSoundNames = [],
		i;
	//fl.trace(oLayer);
	for (i=0; i<nFramesLength; i++) {
		oFrame = aFrames[i];
		// ** If the frame is a Keyframe
		if (i == oFrame.startFrame) {
			//fl.trace("Keyframe at: " + i+" : "+oFrame.soundName);
			// ** Frame is a Keyframe having a valid VO soind item except MUTE.wav
			if(oFrame.soundLibraryItem != null && oFrame.soundName.length > 0 && isValidAudio(oFrame.soundName)) {
				sSoundName = oFrame.soundName.substring(0, oFrame.soundName.indexOf(".")).toLowerCase();
				//sSoundName = sSoundName.replace(' ', '').replace('-','_');
				sSoundName = sSoundName.replace(/[^\w]/gi,'_');
				sSoundExt = oFrame.soundName.substring(oFrame.soundName.indexOf("."), oFrame.soundName.length).toLowerCase();
				updateSoundsXML(sSoundName);
				exportSoundItem(oFrame.soundName, sSoundName + sSoundExt);
				//fl.trace("\tSound Name = "+sSoundName+" @ Keyframe "+i);
				
				// ** If the VO audio ends where the next VO audio starts
				if(aAudioKeyframes.length-1 > -1 && !aAudioKeyframes[aAudioKeyframes.length-1].end){
					var o = aAudioKeyframes[aAudioKeyframes.length-1];
					o.end = oFrame.startFrame-1;
					//fl.trace("\tIF aAudioKeyframes | Start = "+o.start+" : End = "+o.end+" : Sound Name = "+o.soundName);
					
					if(p_sAudioLayerName !== sBGAudioLayerName){
						aSoundNames.push(o.soundName);
					}
				}
				aAudioKeyframes.push({start:oFrame.startFrame, soundName:sSoundName});
			}else{
			// ** Frame is a Keyframe having a invalid soind item like MUTE.wav, 
				if(aAudioKeyframes.length-1 > -1 && !aAudioKeyframes[aAudioKeyframes.length-1].end){
					// ** So its the end frame of the previous valid Vo sound
					var o = aAudioKeyframes[aAudioKeyframes.length-1];
					o.end = oFrame.startFrame-1;
					//fl.trace("\tELSE aAudioKeyframes | Start = "+o.start+" : End = "+o.end+" : Sound Name = "+o.soundName);
					
					if(p_sAudioLayerName !== sBGAudioLayerName){
						aSoundNames.push(o.soundName);
					}
				}
			}
		}
	}
	// Check if the last VO audio has a valid End frame
	if(!aAudioKeyframes[aAudioKeyframes.length-1].end){
		// If it doesn't then the last frame of the Vo audio is the total frames index
		var o = aAudioKeyframes[aAudioKeyframes.length-1];
		o.end = nFramesLength - 1;
		//fl.trace("\tEXCEPTION: aAudioKeyframes | Start = "+o.start+" : End = "+o.end+" : Sound Name = "+o.soundName);
		if(p_sAudioLayerName !== sBGAudioLayerName){
			aSoundNames.push(o.soundName);
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
		oASStartFrame,
		oASEndFrame,
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
		//fl.trace('Start '+nStartAudioFrameIndex+' : End = '+nEndAudioFrameIndex+' : Audio = '+sSoundName);
			
		clearKeyFrame(nStartAudioFrameIndex);
		convertToBlankKeyframe(nStartAudioFrameIndex, nStartAudioFrameIndex);
		oASStartFrame = oASLayer.frames[nStartAudioFrameIndex];
		// ** Start frame of an audio (Dispatch "ANIMATION_CUE_START" event)
		oASStartFrame.actionScript = 'bStopped = false;\n';
		oASStartFrame.actionScript += 'sCurrentLabel = "' + sSoundName + '";\n';
		oASStartFrame.actionScript += 'nStartFrame = ' + (nStartAudioFrameIndex + 1) + ';\n';
		oASStartFrame.actionScript += 'e = new Event("ANIMATION_CUE_START");\n';
		oASStartFrame.actionScript += 'e.data = {type:"ANIMATION_CUE_START", label:sCurrentLabel, startFrame:nStartFrame};\n';
		oASStartFrame.actionScript += 'dispatchEvent(e);';
		
		clearKeyFrame(nEndAudioFrameIndex);
		convertToBlankKeyframe(nEndAudioFrameIndex, nEndAudioFrameIndex);
		oASEndFrame = oASLayer.frames[nEndAudioFrameIndex];
		// ** End frame of an audio (Dispatch "ANIMATION_CUE_END" event)
		oASEndFrame.actionScript = 'stop();\n';
		oASEndFrame.actionScript += 'bStopped = true;\n';
		oASEndFrame.actionScript += 'e = new Event("ANIMATION_CUE_END");\n';
		oASEndFrame.actionScript += 'e.data = {type:"ANIMATION_CUE_END", label:sCurrentLabel, startFrame:nStartFrame};\n';
		oASEndFrame.actionScript += 'dispatchEvent(e);';
		
		var sSeparator = (i === (nLength - 1)) ? ']' : ',';
		aFrameMap += '['+(nStartAudioFrameIndex+1) + ', '+ (nEndAudioFrameIndex+1) + ', "' + sSoundName + '"]' + sSeparator;
	}
	
	var totalFrames = oASLayer.frameCount - 1,
		oLastFrame;
	//fl.trace("totalFrames = "+totalFrames+' : '+oASLayer.frames[totalFrames].startFrame+' : '+nEndAudioFrameIndex);
	if(oASLayer.frames[totalFrames].startFrame !== totalFrames){
		// Last frame is not a keyframe
		//fl.trace('** Last frame is not a keyframe ** ');
		convertToBlankKeyframe(totalFrames, totalFrames);
		oLastFrame = oASLayer.frames[totalFrames];
		oLastFrame.actionScript = 'stop();\n';
		oLastFrame.actionScript += 'bStopped = true;';
	}else{
		//fl.trace('** Last frame is a keyframe ** ');
		// Last frame is a keyframe
		oLastFrame = oASLayer.frames[totalFrames];
		if(totalFrames !== nEndAudioFrameIndex){
			// The last VO ends BEFORE the last frame
			//fl.trace('** The last VO ends BEFORE the last frame ** ');
			oLastFrame.actionScript = 'stop();\n';
			oLastFrame.actionScript += 'bStopped = true;';
		}
	}
	oLastFrame.actionScript += '\ne = new Event("ANIMATION_COMPLETE");\n';
	oLastFrame.actionScript += 'e.data = {type:"ANIMATION_COMPLETE"};\n';
	oLastFrame.actionScript += 'dispatchEvent(e);';
	
	fl.trace("Vo Audios  = "+aFrameMap);
	oASLayer.frames[0].actionScript += "aFrameMap = "+aFrameMap+",";
	oASLayer.frames[0].actionScript += "version = "+sVersion+";";
	
	return aAudioKeyframes;
}
function addBGAudioScript(p_sLayerName, p_aKeyFrames){
	fl.trace("addBGAudioScript()");
	if(p_aKeyFrames.length === 0){fl.trace("No BG scene sound layer"); return;}
	// ** Add a new layer for the "BGAudioScript"
	oTimeline.addNewLayer(p_sLayerName, "normal", true);
	var objLayer = getLayerByName(p_sLayerName, true),
		oLayer = objLayer.layer,
		nLayerIndex = objLayer.index,
		nLength = p_aKeyFrames.length,
		
		oAudioFrame,
		nStartAudioFrameIndex,
		sSoundName,
		oASStartFrame,
		oASEndFrame,
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
			
		clearKeyFrame(nStartAudioFrameIndex);
		convertToBlankKeyframe(nStartAudioFrameIndex, nStartAudioFrameIndex);
		oASStartFrame = oLayer.frames[nStartAudioFrameIndex];
		// ** Start frame of an audio (Dispatch "PLAY_BG_AUDIO" event)
		oASStartFrame.actionScript = 'sBGAudioLabel = "'+sSoundName+'";\n';
		oASStartFrame.actionScript += 'nBGAudioStartFrame = '+(nStartAudioFrameIndex+1)+';\n';
		oASStartFrame.actionScript += 'e = new Event("PLAY_BG_AUDIO");\n';
		oASStartFrame.actionScript += 'e.data = {type:"PLAY_BG_AUDIO", label:sBGAudioLabel, startFrame:nBGAudioStartFrame};\n';
		oASStartFrame.actionScript += 'dispatchEvent(e);';
		
		clearKeyFrame(nEndAudioFrameIndex);
		convertToBlankKeyframe(nEndAudioFrameIndex, nEndAudioFrameIndex);
		oASEndFrame = oLayer.frames[nEndAudioFrameIndex];
		// ** End frame of an audio (Dispatch "STOP_BG_AUDIO" event)
		oASEndFrame.actionScript += 'e = new Event("STOP_BG_AUDIO");\n';
		oASEndFrame.actionScript += 'e.data = {type:"STOP_BG_AUDIO", label:sBGAudioLabel, startFrame:nBGAudioStartFrame};\n';
		oASEndFrame.actionScript += 'dispatchEvent(e);';
		
		var sSeparator = (i === (nLength - 1)) ? ']' : ',';
		aBgFrameMap += '['+(nStartAudioFrameIndex+1) + ', '+ (nEndAudioFrameIndex+1) + ', "' + sSoundName + '"]' + sSeparator;
	}
	
	fl.trace("SFX Audios  = "+aBgFrameMap);
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
	sXMLData = "<data pageType='APP'>" + sComponentXML + sSoundsXML + "</data>";
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
	//fl.trace("isValidAudio() | Audio Name = "+p_sSoundName+' : Audio index = '+aInvalidSounds.indexOf(p_sSoundName));
	return (aInvalidSounds.indexOf(p_sSoundName) === -1);
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
	
	sComponentXML += '<component type="applicationpanel" componentID="applicationpanelcontainer" view="application_panel.html" viewLocation="global_html"><item type="button" id="btn_see_tutorial" available="true"></item><item type="button" id="btn_see_formulae" available="true"></item><item type="button" id="btn_see_solution" available="true"></item></component>';
	
	sComponentXML += '<component type="audiopanel" componentID="audiopanelcontainer" view="audio_panel.html" viewLocation="global_html"><item type="button" id="btn_play" available="true"></item><item type="button" id="btn_pause" available="true"></item><item type="button" id="btn_replay" available="true"></item><item type="slider" id="slider_volume_seek" available="true" seeking="true" direction="horizontal"></item><item type="slider" id="slider_playhead_seek" available="true" seeking="true" direction="horizontal"></item></component>';
	sSoundsXML += '</sounds>';
	saveXML();
	
	saveAsCopy();
	fl.trace("All DONE...!");
}

init();