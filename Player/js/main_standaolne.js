/*
 Created on : Aug 18, 2015, 1:30:11 PM
 Author     : Vincent.Gomes
 */
/* -------------------------------------------- */
/*              Polyfills                 */
/* -------------------------------------------- */
//  Protect against IE8 not having developer console open.
var console = window.console || {
    "log" : function(){
    },
    "error" : function(){
    },
    "trace" : function(){
    }
};
if(typeof Object.create !== 'function'){
    Object.create = function(o){
        function F(){
        }
        F.prototype = o;
        return new F();
    };
}
// Credit to Douglas Crockford for this bind method
if(!Function.prototype.bind){
    Function.prototype.bind = function(oThis){
        if(typeof this !== "function"){
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function(){
                },
                fBound = function(){
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
/*
 * Array.indexOf fix for IE8
 * Recommended Polyfill MDC: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(searchElement, fromIndex){
        if(this === undefined || this === null){
            throw new TypeError('"this" is null or not defined');
        }

        var length = this.length >>> 0;// Hack to convert object.length to a UInt32

        fromIndex = +fromIndex || 0;

        if(Math.abs(fromIndex) === Infinity){
            fromIndex = 0;
        }

        if(fromIndex < 0){
            fromIndex += length;
            if(fromIndex < 0){
                fromIndex = 0;
            }
        }

        for(; fromIndex < length; fromIndex++){
            if(this[fromIndex] === searchElement){
                return fromIndex;
            }
        }

        return -1;
    };
}

/* -------------------------------------------- */
/*              HTML Player API                 */
/* -------------------------------------------- */
// ** Get Query String Parameter value
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// ** Exposed API to the PHP Player
var HTMLPlayerAPI = {
    loadPage: function(p_sPageName, sPageType){
        oCourseController.loadPage(p_sPageName, sPageType);
    }
};

/* -------------------------------------------- */
/*      Require Config & Application Init       */
/* -------------------------------------------- */
// ** Declare the Require Config
require.config({
    waitseconds : 200,
    shim:{
        'jqueryui':{
            deps: ['jquery']
        },
        'jqueryuitouchpunch':{
            deps: ['jquery', 'jqueryui']
        },
		'nosleep':{
            deps: ['jquery']
		}
    },
    paths : {
        jquery              : 'libs/jquery-1.11.3.min',
        x2js                : 'libs/xml2json.min',
        sm2                 : 'libs/soundmanager2-jsmin',
        jqueryui            : 'libs/jquery-ui-1.11.3.min',
        jqueryuitouchpunch  : 'libs/jquery.ui.touch-punch.min',
        nosleep				: 'libs/NoSleep.min'
    },
    /*baseUrl: "../../js",*/
    callback : init()
});

// ** Application start point
var oCourseController;
function init(){
    require([
        'controller/CourseController'
    ], function(CourseController){
        oCourseController = CourseController;
        oCourseController.init();
        var sPageName = getParameterByName('page'),
			sPageType = getParameterByName('type');
        HTMLPlayerAPI.loadPage(sPageName, sPageType);
    });
}
