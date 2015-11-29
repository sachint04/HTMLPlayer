var oDocument = fl.getDocumentDOM(),
oTimeline = oDocument.getTimeline(),
aLayers 	= oTimeline.layers;
var alphabets = "ABCDEFG";
var docName = oDocument.name;	
var folderName = (docName.indexOf('.') > 0 ) ? docName.slice(0, docName.indexOf('.')) : docName;
var docPath = oDocument.pathURI;
var docWidth = oDocument.width;
var docHeight = oDocument.height;
var dataToWrite = '';
var aOptions = [];
var strQuestion = ""
var rootPath 	= "content/";
var maxOptionWidth = 0;
var oAnswer = {};
var oSteps = {};
oDocument.selectNone();
var folderURI	= docPath.slice(0, docPath.lastIndexOf('.'));
FLfile.createFolder(folderURI);	
fl.revertDocument(fl.getDocumentDOM());

function removeGuidedLayer(timeline){
	
	for(var i = 0 ;i < timeline.layers.length;i++){
		//fl.trace('layer '+ i+' type is  '+ oTimeline.layers[i].layerType);
		if(timeline.layers[i].layerType =="guide" || timeline.layers[i].layerType =="guided"){
			timeline.deleteLayer(i);
		}		
	}
}

function removeLayerWithLabel(timeline, s_label){
	for(var i = 0 ;i < timeline.layers.length;i++){
		if( timeline.layers[i].name == s_label){
			timeline.deleteLayer(i);
		}
	}
}

function isKeyFrame(frame, index , layerName){
fl.trace('isKeyFrame | frame : '+ frame+ '  | index : '+ index);
	var result = false;
	if(frame != undefined && frame.actionScript === "" && frame.startFrame == index && frame.elements != undefined && frame.elements.length > 0){
		result = true;
		////fl.trace('Layer ' + layerName + ' frame ' + index + ' with start frame : ' + frame.startFrame + '  isKeyFrame  '+ result);
		
	};	
	
	return result;
}

function getKeyFramesOfLayer(layer){
	//fl.trace('getKeyFramesOfLayer '+ layer.name);
	
	for(var i = 0; i <layer.frames.length;i++){
		var oFrame = layer.frames[i];
		////fl.trace('getKeyFramesOfLayer  '+ oFrame);
		if(isKeyFrame(oFrame, i, layer.name)){
		  // //fl.trace("Key frame found at index "+i + " of Layer "+ layer.name); 
		  var aElem = oFrame.elements;
		  if(aElem == undefined)continue;
		  //	//fl.trace('key frame found at  index : '+ i+ ' with startFrame ' +oFrame.startFrame);
		  ////fl.trace('oFrame : '+ oFrame +' | aElem : ' +aElem);
			 fl.trace('aElem length -  '+  aElem.length);
			 for(var j = 0; j < aElem.length;j++){
				 var elem = aElem[j];
				 var sType = elem.elementType;
				 var oLibraryItem = elem.libraryItem;
				 var index = -1;
				  fl.trace('sType  = '+sType +' | ibraryItem = '+ elem.libraryItem);
				  if(sType == "instance"){
					var symbolElems = oLibraryItem.timeline.layers[0].frames[0].elements;
					if(symbolElems == undefined)continue;
					for(var n = 0; n < symbolElems.length;n++){
				 		var symbolElem = symbolElems[n];
				 		var sSymbolType = symbolElem.elementType;
						if(sSymbolType === "text"){		
							if(strQuestion == ""){
								strQuestion = tfToHTML(symbolElem);					
							//fl.trace('element type '+ sSymbolType +' has Text '+strQuestion );
							}else{
								//alert("Info: More than one text field found in Question MovieClip. Exporting as Image.")
							}
							break;
						}
					}
				  }else if(sType == "shape"){
					  if(elem.isGroup){
						  i -= 1;
						  elem.selected = true;
						  oDocument.unGroup();
						  //fl.trace('after ungroup aElem length -  '+  aElem.length);
					  }
				  }else if(sType == "text"){
					  if(strQuestion == ""){
						strQuestion = tfToHTML(elem);					
					//fl.trace('element type '+ sSymbolType +' has Text '+strQuestion );
						}else{
							//alert("Error: More than one text field found in Question MovieClip.")
						}
				  }
				 
			}
		 }
	}
}

function checkLayers(){
	
	for(var i = 0 ;i <oTimeline.layers.length;i++){
		//fl.trace('checkLayers |  name = '+ oTimeline.layers[i].name);
		oTimeline.layers[i].locked = true;
		if(oTimeline.layers[i].name === "Question"){
			oTimeline.layers[i].locked = false;
			getKeyFramesOfLayer(oTimeline.layers[i]);
		}
		
	}
	
}
function exportQuestion(){
	var oFrame =  null
	var o
	for(var i = 0 ;i <oTimeline.layers.length;i++){
		if(oTimeline.layers[i].name === "Question"){
			oTimeline.layers[i].locked = false;
			oTimeline.layers[i].hide = false;
			oFrame = oTimeline.layers[i].frames[0];
		}else{
			oTimeline.layers[i].locked = true;
			oTimeline.layers[i].hide = true;
		}
	}
	if(oFrame){
		oTimeline.setSelectedFrames(0,1)
		exportImgAtFrame(oFrame,'question.png', false, false);
	}
}

function exportAnswer(){
	var oFrame =  null
	for(var i = 0 ;i <oTimeline.layers.length;i++){
		if(oTimeline.layers[i].name === "Answer"){
			oTimeline.layers[i].locked = false;
			oTimeline.layers[i].hide = false;
			oFrame = oTimeline.layers[i].frames[2];
		}else{
			oTimeline.layers[i].locked = true;
			oTimeline.layers[i].hide = true;
		}
	}
	if(oFrame){
		oTimeline.setSelectedFrames(2,2)
		exportImgAtFrame(oFrame,'answer.png', false, false);
	}
}
function exportImgAtFrame(oFrame , sName, bShowSetting, bMaintainLoc){
	 var aElem = oFrame.elements;
	  
	  if(aElem == undefined)return;
	  
	
	// document.breakApart();
	
	 for(var j = 0; j < aElem.length;j++){
		var elem = aElem[j];
		 var sType = elem.elementType;
		 
		 if(sType  == "instance"){
			 // fl.trace('exportImgAtFrame : elementType = '+sType + ' | sType.isGroup	 = '+ sType.isGroup	 );
			elem.selected = true;
		 }
	 }	
	
		oDocument.selectAll();
		oDocument.clipCopy()
		var sel = oDocument.selection[0]; // select pasted item
		var newDoc  = fl.createDocument();
		newDoc.clipPaste(false);
		
		newDoc.selectAll();
		newDoc.group();
		sel = newDoc.selection[0]; 
		var selWidth = Math.ceil(sel.width);
		var selHeight = Math.ceil(sel.height);
		newDoc.width = selWidth;
		newDoc.height = selHeight ;
//		alert(sel+ " | selWidth = "+ selWidth+ " | selHeight = "+ selHeight);

		
		//newDoc.selectAll();
		//var sel = newDoc.selection[0];
		
		newDoc.convertToSymbol("movie clip", "tmp", "top left");
		//newDoc.selectAll();
		
		sel = newDoc.getTimeline().layers[0].frames[0].elements[0];
		//sel.selected = true;		
		sel.x = 0;
		sel.y = 0;
		
		var imagePath	= getTempFlaURI(sName);
				//fl.trace("image  .path = "+imagePath); 
		newDoc.exportPNG(imagePath, bShowSetting, bMaintainLoc);
		newDoc.close(false);
}

function createQuestionNode(){
	var imagePath	= 'content/'+folderName+'/question.png';
	var str = '<div id="question" >'+
	'<img src="'+imagePath+'"/>'+
	'</div>';
	return str;
}

function createOptionNode(p_oData , id){
		for(var str  in p_oData ){
			////fl.trace(str +  ' = ' +p_oData[str] + ' id = '+ id);
		}
		var sCorrect = (p_oData.correct)? " correct" : '';
		var str = 	'<li id="Q'+id+'" class="radio'+ sCorrect+'" >'+
			'<span  class="icon">'+
			''+alphabets[(id - 1)]+'</span><span class="option-text">'+p_oData.text+'</span></li>';
			
	return str;
			
}

function findCorrectOption(){
	
	for(var i = 0;i<aOptions.length;i++){		
		createOptionNode(aOptions[i], (i+1)) ;
		if(aOptions[i].top >= aOptions.highlightTop && aOptions[i].bottom <= aOptions.highlightBottom ){
			aOptions[i].correct = true;
		}else{
			aOptions[i].correct = false;
		}
	}
	/*
	for(var i = 1;i<aOptions.length;i++){
		//fl.trace('option '+ i+' width = '+ aOptions[i].width); 
		if(aOptions[i].width > maxOptionWidth){
			maxOptionWidth = Math.round(aOptions[i].width); 
		}
	}
	*/
}
function createQuestionData(){
	var node = '<div id="'+folderName+'" class="tut-num-container row">';
	node = node + createQuestionNode();
	node = node + createAnswerData();
	node = node + createStepsData();
	node = node + '<div id="tutnumpanel">'+
					'<div id="btnShowSolution" >See QUESTION</div>'+
					'<div id="btnShowAnswer">Final ANSWER</div>'+					
					'<div id="btnShowSteps">See SOLUTION</div>'+
					'</div>'+
				 '</div>';
	return node;
}
function createAnswerData(){
	var sSide = "width";
	if(oAnswer.height < oAnswer.width){
		sSide = "height";
	}
	//var node = '<div id="answer"><img src="'+rootPath+folderName+'/answer.png" width="'+oAnswer.width+'" height="'+oAnswer.height+'"/></div>';
	var node = '<div id="answer"><img src="'+rootPath+folderName+'/answer.png" /></div>';
	return node;
}

function createStepsData(){
	//var node = '<div id="steps"><img src="'+rootPath+folderName+'/steps.png" width="'+oSteps.width+'" height="'+oSteps.height+'"/></div>';
	var node = '<div id="steps"><img src="'+rootPath+folderName+'/steps.png" /></div>';
	return node;
}
function createOptionData(){
	var id = docName.slice(0,docName.lastIndexOf('.'));
	var node = '<div id="'+id+'" class="MCQ row">';
	//	//fl.trace("options length = "+ aOptions.length);
	aOptions.sort(function(a, b) {
    	return a.top - b.top;
	});
	
	
	node = node + createQuestionNode(aOptions[0]);
	
	node  = node + '<ul class="option-container">';
	for(var i = 1;i<aOptions.length;i++){
		node = node +createOptionNode(aOptions[i], i) ;
	}
	node = node + '</ul>';
	node = node + '</div>';
	node = node + '<button id="btnShowSolution">Show Solution</button>';
	return node;
	//fl.trace("creatOptionNode "+ node);
}


function writeFile(str, filename){
								

	var newlocation = folderURI +  '/'+filename;	
	FLfile.write(newlocation, str);
	
}

function ExportSteps(){
	var aItems = oDocument.library.items;
	for(var i = 0;i<aItems.length;i++){
		var item = aItems[i];
		//var className = item.linkageExportForAs;
		if(item.name == "allData"){
			oDocument.library.editItem(item.name);
			
			//var mc = fl.getDocumentDOM().selection[0];
			dom = fl.getDocumentDOM();
			removeGuidedLayer(dom.getTimeline());
			oDocument.selectAll();
			
			oDocument.group()
			sel = oDocument.selection[0]; // select pasted item
			var selWidth = Math.ceil(sel.width);
			var selHeight = Math.ceil(sel.height);
			//alert("selWidth = "+ selWidth+ " | selHeight = "+ selHeight);
			dom.clipCopy();
			var newDoc = fl.createDocument();
			newDoc.width = selWidth;
			newDoc.height = selHeight;
			newDoc.clipPaste(true)
			newDoc.selectAll();
			newDoc.convertToSymbol("movie clip", "tmp", "top left");
		//newDoc.selectAll();
		
			sel = newDoc.getTimeline().layers[0].frames[0].elements[0];
			//sel.selected = true;		
			sel.x = 0;
			sel.y = 0;
		

			var imagePath	= getTempFlaURI('steps.png');
			oSteps.path = imagePath;
			oSteps.width = selWidth;
			oSteps.height = selHeight;
			//fl.trace("imagePath = "+ imagePath);
			newDoc.exportPNG(imagePath, false, true);
			newDoc.close(false);		
			oDocument.exitEditMode();
		}
		
	}
}


function getTempFlaURI(p_sFileName){
	var folderURI	= docPath.slice(0, docPath.lastIndexOf('.'));								
	var newlocation = folderURI +'/' +p_sFileName;	
	return newlocation;
}
function createXMLNode(){
	
		var str = 	'<data><text class="question" ><![CDATA[]]></text>'+
					'<component type="tutnumpanel" componentID="tutnumpanel"/></data>';
			
	return str;
			
}

function tfToHTML(p_tf)
{
    var textRuns = p_tf.textRuns;
	//fl.trace('textRuns '+ textRuns + 'with text '+p_tf.text);
    var html = "";
	if(textRuns!= undefined && textRuns.length != undefined){
		for ( var i=0; i<textRuns.length; i++ )
		{
			var textRun = textRuns[i];
			var chars = textRun.characters;
	
			chars = chars.replace(/\n/g,"<br/>");
			chars = chars.replace(/\r/g,"<br/>");
			chars = chars.replace(/  /g," ");
			chars = chars.replace(/. <br\/>/g,".<br/>");
	
			var attrs = textRun.textAttrs;
	
			var font = attrs.face;
			var size = attrs.size;
			var bold = attrs.bold;
			var italic = attrs.italic;
			var colour = attrs.fillColor;
	
			if ( bold )
			{
				chars = "<b>"+chars+"</b>";
			}
	
			if ( italic )
			{
				chars = "<i>"+chars+"</i>";
			}
	
			//chars = "<font size=\""+size+"\" face=\""+font+"\" color=\""+colour+"\">"+chars+"</font>";
			//chars = '<font style="font-size:'+size+';font-family:'+font+';color:'+colour+';">'+chars+'</font>';
			chars = '<font style="font-size:1em;font-family:'+font+';color:'+colour+';">'+chars+'</font>';
	
			html += chars;
		}
	}else{
		
		html = p_tf.text;
	}
	
	return html;
}



function showAllLayers(p_flag){
	for(var i = 0;i<oTimeline.layers.length;i++){
		oTimeline.layers[i].visible = p_flag;
	}	
}

function lockAllLayers(p_flag){
	for(var i = 0;i<oTimeline.layers.length;i++){
		oTimeline.layers[i].locked = p_flag;		
	}	
}
showAllLayers(true);
lockAllLayers(false);
removeGuidedLayer(oTimeline);
removeLayerWithLabel(oTimeline, "BG");
removeLayerWithLabel(oTimeline, "swfHolder_mc");
removeLayerWithLabel(oTimeline, "swf Holder");

checkLayers();

ExportSteps();
exportAnswer();
exportQuestion();


writeFile(createXMLNode(), 'page.xml');;
dataToWrite  = createQuestionData();
writeFile(dataToWrite, "page.html");
fl.revertDocument(fl.getDocumentDOM());
alert('folder created successfully!');

//findCorrectOption();
//dataToWrite  = createStyles() + createOptionData() + getScript();
