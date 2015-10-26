/*
 Created on : Aug 19, 2015, 1:30:11 PM
 Author     : Vincent.Gomes
 */
define([
], function(){
    'use strict';

    function Constants(){
        this.sAudioLanguage = null;
        this.oLocationPointer = null;
        this.oLocations = {
            // Set Local Paths for the Files and Folders
            /*local:{
                rootURL : '../../',
                pageURL : '',
                locations : {
                    global_html     : {url:'rootURL', path:'html/'},
                    xml             : {url:'pageURL', path:''},
                    css             : {url:'pageURL', path:''},
                    images          : {url:'pageURL', path:'images/'},
                    audio_en        : {url:'pageURL', path:'audio/en/'}
                }
            },
            // Global paths based on index.html file location
            global:{*/
                rootURL : '',
                pageURL : 'content/@@pageName@@/',
                locations : {
                    global_html     : {url:'rootURL', path:'html/'},
                    xml             : {url:'pageURL', path:''},
                    css             : {url:'pageURL', path:''},
                    images          : {url:'pageURL', path:'images/'},
                    audio        : {url:'pageURL', path:'audio/@@language@@/'}
                }
            //}
        };
        this.sCurrentPageName = null;

        //this.setEnvironment(false);
    }
    Constants.prototype = {
        constructor: Constants,
        setLanguage: function(p_sLanguage){
            if(p_sLanguage !== 'en' || p_sLanguage !== 'hi'){
                // ERROR
            }
            this.sAudioLanguage = p_sLanguage;
        },
        /*setEnvironment : function(p_bLocal){
            this.oLocationPointer = (p_bLocal) ? this.oLocations.local : this.oLocations.global;
        },*/
        setCurrentPageName : function(p_sPageName){
            this.sCurrentPageName = p_sPageName;
        },
        getCurrentPageName : function(p_sPageName){
            return this.sCurrentPageName;
        },
        getLocation : function(p_sValue){
            if(!this.oLocations.locations.hasOwnProperty(p_sValue)){
                // Error
            }
            var o = this.oLocations.locations[p_sValue];
            return this.oLocations[o.url].replace('@@pageName@@', this.sCurrentPageName) + o.path.replace('@@language@@', this.sAudioLanguage);
            /*if(!this.oLocationPointer.locations.hasOwnProperty(p_sValue)){
                // Error
            }
            var o = this.oLocationPointer.locations[p_sValue];
            return this.oLocationPointer[o.url].replace('@@pageName@@', this.sCurrentPageName) + o.path.replace('@@language@@', this.sAudioLanguage);*/
        },
        getErrorList : function(){
            return {
                queryStringParameterNotFound : {
                    defaultMessage : "Your game results will not be save. Do you wish to continue?",
                    connectEDBaseUrl : "There seems be a problem in establishing connection with our servers. Do you wish to continue?",
                    pingUrl : "There seems be a problem in establishing connection with our servers. Do you wish to continue?"
                },
                fileNotFound : {
                    fileNotFound : "There seems to be a problem loading one or more resource file named \"@@fileName@@\" from the server. Please try again later.",
                    requireModuleNotFound : "There seems to be a problem loading a resource module / module's named \"@@fileName@@\" from the server. Please try again later.",
                    imageNotFound : "There seems to be a problem loading one or more image files from the server. Please try again later.",
                    soundNotFound : "There seems to be a problem loading an audio resource named \"@@fileName@@\" from the server. Please try again later.",
                    soundSpriteNotFound : "Audio Sprite named \"@@spriteName@@\" not found in the audio sprite sheets."
                }
            };
        },
        getErrorMap : function(){
            return {
                1 : "fileNotFound",
                2 : "queryStringParameterNotFound"
            };
        },
        getTOCXML 			: function(){
        		return "xml/ChapDataSample.xml";
        	}
    };

    return new Constants();
});