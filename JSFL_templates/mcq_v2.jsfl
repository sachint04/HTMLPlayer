﻿var oDocument = fl.getDocumentDOM(),
oTimeline = oDocument.getTimeline(),
aLayers 	= oTimeline.layers;
var alphabets = "ABCDEFG";
var docName = oDocument.name;	
var docPath = oDocument.pathURI;
var dataToWrite = '';
var cssData = '';
var xmlData = '';
var jsData 	= ''
var aOptions = [];
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
				 var oOption = {};
				// fl.trace('sType  = '+sType +' l  | ibraryItem = '+ elem.libraryItem);
				 if(sType === "text" && i < 1){		
				 	//elem.textType = "dynamic";
					//elem.renderAsHTML = true;
					//oOption.text = elem.getTextString();
					
					oOption.text = tfToHTML(elem);
					////fl.trace('Option top = '+ );
				 	//fl.trace('text found = '+ oOption.text);
					oOption.top = elem.top;
					oOption.left = elem.left;
					oOption.bottom = elem.top + elem.height
					oOption.width 	= elem.width;					
					aOptions.push(oOption);
					
					// //fl.trace('element type '+ sType +' found at frame '+ i+ ' of layer '+ layer.name + ' has Text '+str);
				 }else if (i == 2 && sType == "shape" && elem.isGroup){
					 
					 aOptions.highlightTop = elem.top;
					 aOptions.highlightBottom = elem.top + elem.height;
					 aOptions.highlightWidth = elem.width;
				 }else if(oLibraryItem != undefined){
					 fl.trace('oLibraryItem.timeline = '+oLibraryItem.timeline);
					 /*
					 	removeGuidedLayer(oLibraryItem.timeline);
						removeLayerWithLabel(oLibraryItem.timeline, "BG");
						removeLayerWithLabel(oLibraryItem.timeline, "swf Holder");
 						
						var symbolTimelineLayers = oLibraryItem.timeline.layers;
						 var symbolElements = symbolTimelineLayers[0].frames[0].elements;
						 for(var n = 0;n <symbolElements.length; n++ ){
							var  symbolElem = symbolElements[n];
							
							 
						 }
						 */
				 }
			  }
		 }
	}
}

function checkLayers(){
	for(var i = 0 ;i <oTimeline.layers.length;i++){
		getKeyFramesOfLayer(oTimeline.layers[i]);
	}
	
}

function createQuestionNode(p_oData){
//	var str = '<div id="question" class="question">'+p_oData.text+'</div>';
		var str = '<div id="question" class="question"></div>';
	return str;
}

function createQuestionData(p_oData){
	var str = '<text id="question" class="question"><![CDATA['+p_oData.text+']]></text>';
	return str;
}

function createOptionNode(p_oData , id){
		for(var str  in p_oData ){
			////fl.trace(str +  ' = ' +p_oData[str] + ' id = '+ id);
		}
		var sCorrect = (p_oData.correct)? " correct" : '';
		var str = 	'<li id="Q'+id+'" class="radio'+ sCorrect+'" >'+
			'<span  class="icon">'+
//			''+alphabets[(id - 1)]+'</span><span id="q'+id+'-option" class="option-text">'+p_oData.text+'</span></li>';
			''+alphabets[(id - 1)]+'</span><span id="q'+id+'-option" class="option-text"></span></li>';
			
	return str;
			
}
function createXMLNode(p_oData , id){
	
		var str = 	'<text id="q'+id+'-option" ><![CDATA['+p_oData.text+']]></text>';
			
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
	var node = '<div id="'+id+'" class="mcq-container">';
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
	return node;
	//fl.trace("creatOptionNode "+ node);
}
function createXMLData(){
	var id = docName.slice(0,docName.lastIndexOf('.'));
	var node = '<data >';
	//	//fl.trace("options length = "+ aOptions.length);
	aOptions.sort(function(a, b) {
    	return a.top - b.top;
	});
	
	
	node = node + createQuestionData(aOptions[0]);
	for(var i = 1;i<aOptions.length;i++){
		node = node +createXMLNode(aOptions[i], i) ;
	}
	node = node + '</data>'
	return node;
	//fl.trace("creatOptionNode "+ node);
}




function writeFile(str, filename){
	var folderURI	= docPath.slice(0, docPath.lastIndexOf('.'));
	FLfile.createFolder(folderURI);								

	var newlocation = folderURI +  '/'+ filename;	
	FLfile.write(newlocation, str);
	
}

function createStyles(){
	//fl.trace('createStyles maxOptionWidth = '+ maxOptionWidth);
	var style = '.mcq-container{'+
		'background:url("content/'+docName.slice(0, docName.indexOf('.'))+'/bg.png") no-repeat scroll 0 0 transparent;'+
		'width:'+oDocument.width+'px;'+
		'height:'+oDocument.height+'px;'+
		'display:inline-block;'+
		'}'+
	'ul.option-container{'+
		'padding-left:0px;'+
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
	'.question{'+
		'font-size:22px;'+
		'font-family:Verdana;'+
		'color:#00002f;'+
		'margin	:30px 20px;'+
	'}'+
	'.option-text{'+
		'font-size:20px;'+
		'font-family:Verdana;'+
		'color:#00002f;'+
	'}';
	
	////fl.trace(' style = '+ style);
	return style;
}

function getScript(){
	
	var script = 'define([ "jquery", "x2js", "framework/MCQPanel", "framework/EventDispatcher" ], function($, X2JS,MCQPanel,EventDispatcher){ var Page = function(p_$pageHolder, p_cssData, p_domView, p_xmlData) { EventDispatcher.call(this); var $pageContainer = $("<section><style>"+p_cssData+"</style>"+p_domView+"</section>"); $pageContainer.attr("id","page"); p_$pageHolder.append($pageContainer).scrollTop(0); this.$view = p_$pageHolder.find("#page"); var oX2JS = new X2JS(); this.jsonXMLData = oX2JS.xml2json(p_xmlData ); this.panel = null; this.showSolution = this.showSolution.bind(this); return this; }; Page.prototype = Object.create(EventDispatcher.prototype); Page.prototype.constructor = Page; Page.prototype.setContent = function(){ var data = this.jsonXMLData.data.text; for(var i = 0; i<data.length;i++){ var oText = data[i]; if(oText._id && oText._id != undefined){ this.$view.find("#"+ oText._id).html(oText.__cdata) }else if(this.jsonXMLoText._class && this.jsonXMLoText._class != undefined){ this.$view.find("."+ oText._id).html(oText.__cdata) } } }; Page.prototype.init = function(){ this.setContent(); this.panel = new MCQPanel(); this.panel.addEventListener("SHOW_SOLUTION_CLICKED", this.showSolution); this.panel.init($("#panel")); }; Page.prototype.showSolution = function(){ this.$view.addClass("show-result"); }; return Page; })';			
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

function exportBG(){
	document.unlockAllElements();
	var layerIndex = -1;
	for(var i = 0 ;i < oTimeline.layers.length;i++){
			if( oTimeline.layers[i].name == "BG"){
			layerIndex = i;			
			//break;
		}else{
			oTimeline.layers[i].visible = false;
			oTimeline.layers[i].locked = true;
		}
			
	}

	if(layerIndex > -1){
		oDocument.selectAll();
		var mc = document.convertToSymbol("graphic", "mc_final_ans", "top left");  	 
	//fl.trace(' top  = '+ mc);
	//var aElem = fl.getDocumentDOM().timeline.layers[0].frames[0];
	
		if(mc != null){
			oDocument.enterEditMode('');
			fl.getDocumentDOM().getTimeline().layers[0].frames[0].elements[0].selected = true;
			var folderURI	= docPath.slice(0, docPath.lastIndexOf('.'));
			FLfile.createFolder(folderURI);								
			var newlocation = folderURI +  '/bg.png';	
			fl.getDocumentDOM().exportPNG(newlocation , false, true);				
		}
	}
}


removeGuidedLayer(oTimeline);
//removeLayerWithLabel(oTimeline, "BG");

removeLayerWithLabel(oTimeline, "swf Holder");

checkLayers();
findCorrectOption();

htmlData = createOptionData();
cssData = createStyles();
jsData = getScript();
xmlData = createXMLData();
//dataToWrite  =  createOptionData()  ;
writeFile(htmlData, 'page.html');
writeFile(cssData, 'page.css');
writeFile(jsData, 'page.js');
writeFile(xmlData, 'page.xml');
exportBG();
alert('folder created successfully!');