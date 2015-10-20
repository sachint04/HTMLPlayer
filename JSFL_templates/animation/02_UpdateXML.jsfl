var oDocument = fl.getDocumentDOM(),
	sSaveDir = oDocument.pathURI.substring(0, oDocument.pathURI.lastIndexOf("/")+1),
	sDocumentName = oDocument.pathURI.substring(oDocument.pathURI.lastIndexOf("/")+1, oDocument.pathURI.lastIndexOf("_swiffy") || oDocument.pathURI.lastIndexOf("."));
function URIExists(p_sFileURI){
	return FLfile.exists(p_sFileURI);
}
function createFolder(p_sFileURI){
	return FLfile.createFolder(p_sFileURI);
}
function getXML(){
	fl.trace("getXML() | "+sSaveDir + sDocumentName);
	if(!URIExists(sSaveDir + sDocumentName)){
		alert('Please run the "AddScriptsAndLabels.jsfl" first');
		return;
	}
	var sXMLData = FLfile.read(sSaveDir + sDocumentName + "/page.xml");
	return sXMLData;
}
function getHTML(){
	fl.trace("getHTML()");
	if(!URIExists(sSaveDir + sDocumentName + "_swiffy.swf.html")){
		alert('Please run the "AddScriptsAndLabels.jsfl" first');
		return;
	}
	var sHTMLData = FLfile.read(sSaveDir + sDocumentName + "_swiffy.swf.html");
	return sHTMLData;
}
function getSwiffyData(htmlData){
	fl.trace("getSwiffyData()");
	var sSearchForStart = "swiffyobject = ",
		sSearchForEnd = "</script>",
		nStartIndex = htmlData.indexOf(sSearchForStart) + sSearchForStart.length,
		nEndIndex = htmlData.indexOf(sSearchForEnd, nStartIndex),
		nEndIndex = htmlData.lastIndexOf(';', nEndIndex),
		sSwiffyData = htmlData.substring(nStartIndex, nEndIndex);
	//fl.trace(sSwiffyData);
	return sSwiffyData;
}
function appendSwiffyDataToXml(xmlData, swiffyData){
	fl.trace("appendSwiffyDataToXml()");
	var sSearchForStart = "><![CDATA[",
		sSearchForEnd = "]]></component>",
		nStartIndex = xmlData.indexOf(sSearchForStart, xmlData.indexOf('<component type="swiffy" ')) + sSearchForStart.length,
		nEndIndex = xmlData.indexOf(sSearchForEnd, nStartIndex),
		sPart_1 = xmlData.substring(0, nStartIndex);
		sPart_2 = xmlData.substring(nEndIndex, xmlData.length);
		sFinalXML = sPart_1 + swiffyData + sPart_2;
	//fl.trace(sFinalXML);
	return sFinalXML;
}
function saveXML(sXMLData){
	fl.trace("saveXML()");
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
	var sXMLData = getXML(),
		sHTMLData = getHTML(),
		sSwiffyData = getSwiffyData(sHTMLData);
		sFinalXML = appendSwiffyDataToXml(sXMLData, sSwiffyData);
	
	//fl.trace(sFinalXML);
	saveXML(sFinalXML);
	
	sHTMLData = '<!-- The ID below for the root div tag wil be replaced dynamically by the Pages GUID -->';
	sHTMLData += '<div id="content" class="page-content swiffy-page">';
	sHTMLData += '<div id="page_wrapper">';
	sHTMLData += '<div id="swiffy_holder">';
	sHTMLData += '<div id="swiffycontainer" style="width: 745px; height: 533px">';
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	sHTMLData += '<div id="audiopanelcontainer">';
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	sHTMLData += '</div>';
	saveHTML(sHTMLData);
}

init();