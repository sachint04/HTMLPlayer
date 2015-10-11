var oDocument = fl.getDocumentDOM(),
oTimeline = oDocument.getTimeline(),
aLayers 	= oTimeline.layers;
var alphabets = "ABCDEFG";
var docName = oDocument.name;	
var docPath = oDocument.pathURI;
var dataToWrite = '';
var aOptions = [];
var strQuestion = ""
var maxOptionWidth = 0;
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
//	//fl.trace('isKeyFrame | frame : '+ frame.startFrame+ '  | index : '+ index);
	var result = false;
	if(frame.actionScript === "" && frame.startFrame == index && frame.elements != undefined && frame.elements.length > 0){
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
			 
			 for(var j = 0; j < aElem.length;j++){
				 var elem = aElem[j];
				 var sType = elem.elementType;
				 var oLibraryItem = elem.libraryItem;
				 var index = -1;
				  fl.trace('sType  = '+sType +' l  | ibraryItem = '+ elem.libraryItem);
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
								alert("Error: More than one text field found in Question MovieClip.")
							}
							break;
						}
					}
				  }
				 
			}
		 }
	}
}

function checkLayers(){
	for(var i = 0 ;i <oTimeline.layers.length;i++){
		fl.trace('checkLayers |  name = '+ oTimeline.layers[i].name);
		oTimeline.layers[i].locked = true;
		if(oTimeline.layers[i].name === "Question"){
			getKeyFramesOfLayer(oTimeline.layers[i]);
			
		}else if(oTimeline.layers[i].name === "Answer"){
			oTimeline.layers[i].locked = false;
			exportImgAtFrame(oTimeline.layers[i].frames[2])
		}
		
	}
	
}

function exportImgAtFrame(oFrame){
	  var aElem = oFrame.elements;
	  if(aElem == undefined)return;
	  
	 
	// document.breakApart();
	 /*
	 for(var j = 0; j < aElem.length;j++){
		 var elem = aElem[j];
		 var sType = elem.elementType;
		 //fl.trace('exportImgAtFrame : elementType = '+sType + ' | sType.isGroup	 = '+ sType.isGroup	 ); 
		 if(sType  == "instance"){
		 	elem.selected = true;
			document.breakApart();
		 }		
	 }
	 */
	 document.selectAll();
	 
	var mc = document.convertToSymbol("graphic", "mc_final_ans", "top left");  	 
	fl.trace(' top  = '+ mc);
	//var aElem = fl.getDocumentDOM().timeline.layers[0].frames[0];
	
	if(mc != null){
		document.enterEditMode('');
			document.exportPNG("", false, true);
	}


}

function createQuestionNode(p_oData){
	var str = '<div class="question">'+p_oData.text+'</div>';
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


function writeFile(str){
	var folderURI	= docPath.slice(0, docPath.lastIndexOf('.'));
	FLfile.createFolder(folderURI);								

	var newlocation = folderURI +  '/ page.html';	
	FLfile.write(newlocation, str);
	
}

function findAllObjItem(){
	var aItems = oDocument.library.items;
	for(var i = 0;i<aItems.length;i++){
		var item = aItems[i];
		//var className = item.linkageExportForAs;
		if(item.name == "allData"){
			oDocument.library.editItem(item.name);
			fl.getDocumentDOM().selectAll();
			fl.getDocumentDOM().group();
			var mc = fl.getDocumentDOM().selection[0];
			//fl.trace('aMc = '+ mc);
			fl.getDocumentDOM().width = mc.width;
			fl.getDocumentDOM().height = mc.height;
			document.exportPNG("", false, true);
			
//				fl.trace('library item with linkage found '+ className);
		}
		
	}
}

function createStyles(){
	//fl.trace('createStyles maxOptionWidth = '+ maxOptionWidth);
	var style = '<style>'+
	'ul.option-container{'+
		'padding-left:0px'+
	'}'+	
	'.radio{'+
		'list-style:none;'+
		'min-height:50px;'+
		'display:block;'+
		'padding-left:50px;'+
		'padding-top:10px;'+
		'width:'+aOptions.highlightWidth+'px;'+
	'}'+
	'.show-result .radio.correct{'+
		'background: -moz-linear-gradient(left,  rgba(250,212,38,1) 0%, rgba(250,212,38,1) 86%, rgba(250,212,38,0) 100%); /* FF3.6+ */'+
		'background: -webkit-gradient(linear, left , right, color-stop(0%,rgba(250,212,38,1)), color-stop(86%,rgba(250,212,38,1)), color-stop(100%,rgba(250,212,38,0))); /* Chrome,Safari4+ */'+
		'background: -webkit-linear-gradient(left,  rgba(250,212,38,1) 0%,rgba(250,212,38,1) 86%,rgba(250,212,38,0) 100%); /* Chrome10+,Safari5.1+ */'+
		'background: -o-linear-gradient(left,  rgba(250,212,38,1) 0%,rgba(250,212,38,1) 86%,rgba(250,212,38,0) 100%); /* Opera 11.10+ */'+
		'background: -ms-linear-gradient(left,  rgba(250,212,38,1) 0%,rgba(250,212,38,1) 86%,rgba(250,212,38,0) 100%); /* IE10+ */'+
		'background: linear-gradient(to right,  rgba(250,212,38,1) 0%,rgba(250,212,38,1) 86%,rgba(250,212,38,0) 100%); /* W3C */'+
		'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#fad426", endColorstr="#00fad426",GradientType=0 ); /* IE6-9 */'+

	'}'+
	'.icon{'+
		'font-size: 20px;'+
		'font-family: verdana;'+
		'margin-right: 15px;'+
		'font-weight: bold;'+
		'width: 26px;'+
		'height: 25px;'+
		'border-radius: 29px;'+
		'background-color: #CFE3EB;'+
		'display: inline-block;'+
		'text-align: center;'+
		'padding-top: 0px;'+
		'border: 3px solid #fff;'+
		'box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);'+
	'}'+
	'#btnShowSolution{'+
		'cursor:pointer;'+
		'padding:5px;'+
		'background-color:rgba(250,212,38,1);'+
		'margin-left:50px;'+
		'border:1px solid #fff;'+
		'border-radius;3px;'+
	'}'+
	'</style>';
	
	////fl.trace(' style = '+ style);
	return style;
}

function getScript(){
	
	var script = '<script>'+
	'var btn = document.getElementById("btnShowSolution");'+
	'btn.addEventListener("click", function(e){'+
		'e.preventDefault();'+
		'var mcq = document.getElementById("'+docName.slice(0, docName.lastIndexOf('.'))+'");'+
		'mcq.className = mcq.className + " show-result";'+
	'});'+
	'</script>';
	
	return script
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
			chars = '<font style="font-size:'+size+';font-family:'+font+';color:'+colour+';">'+chars+'</font>';
	
			html += chars;
		}
	}else{
		
		html = p_tf.text;
	}
	
	return html;
}




//removeGuidedLayer(oTimeline);
//removeLayerWithLabel(oTimeline, "BG");
//removeLayerWithLabel(oTimeline, "swf Holder");

//checkLayers();
//findCorrectOption();
//dataToWrite  = createStyles() + createOptionData() + getScript();
//writeFile(dataToWrite);

findAllObjItem();