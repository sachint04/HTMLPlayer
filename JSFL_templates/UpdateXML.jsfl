function URIExists(p_sFileURI){
	return FLfile.exists(p_sFileURI);
}
function createFolder(p_sFileURI){
	return FLfile.createFolder(p_sFileURI);
}
function getXML(){
	fl.trace("getXML()");
	if(!URIExists(sSaveDir + sDocumentName)){
		alert('Please run the "AddScriptsAndLabels.jsfl" first');
		return;
	}
	var sXMLData = FLfile.read(sSaveDir + sDocumentName + "/data.xml");
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
		sSearchForEnd = ";",
		nStartIndex = htmlData.indexOf(sSearchForStart) + sSearchForStart.length,
		nEndIndex = htmlData.indexOf(sSearchForEnd, nStartIndex),
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
		sPart_2 = xmlData.substring(nStartIndex, xmlData.length);
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
function init(){
	fl.outputPanel.clear();
	var sXMLData = getXML(),
		sHTMLData = getHTML(),
		sSwiffyData = getSwiffyData(sHTMLData);
		sFinalXML = appendSwiffyDataToXml(sXMLData, sSwiffyData);
	//fl.trace(sFinalXML);
	saveXML(sFinalXML);
}

init();