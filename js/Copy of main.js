require.config({
	waitSeconds: 200,
    shim:{
        'jqueryui':{
            deps: ['jquery']
        },
        'jqueryuitouch':{
            deps: ['jquery']
        },
		'mediaplayer':{
			deps: ['jquery','jqueryui']
		}
    },
    paths:{
        jquery				: 'libs/jquery-1.11.3.min',
        x2js				: 'libs/xml2json.min',
        sm2					: 'libs/soundmanager2-jsmin',
        nicescroll			: 'libs/jquery.nicescroll.min',

        jqueryui            : 'libs/jquery-ui-1.11.3.min',
        jqueryuitouch       : 'libs/jqueryui_touch',

		mediaplayer			: 'libs/jquery.acornmediaplayer'

        /*,
        es5shimmin: '../libs/es5-shim.min',
        CourseController: 'CourseController',
        CourseConfig: 'CourseConfig',
        ConfigParser: 'ConfigParser',
        Constants: 'Constants',
        ResourceLoader: 'ResourceLoader'*/

        /*,
        Builder: 'builder',
		SCORMFunctions: 'SCORMFunctions',
		SCORMWrapper: 'scorm/APIWrapper_scorm_12',
		sManager: 'vendor/soundmanager2-jsmin',
		xml2json:'vendor/jquery-xml2json',
		customInjection:'course_mini'*/
    },
    callback: init
});

//  Protect against IE8 not having developer console open.
var console = window.console || {
    "log": function () {
    },
    "error": function () {
    },
    "trace": function () {
    }
};

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// Credit to Douglas Crockford for this bind method
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError ("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call (arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply (this instanceof fNOP && oThis
                            ? this
                            : oThis,
                            aArgs.concat (Array.prototype.slice.call (arguments)));
                };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP ();

        return fBound;
    };
}

/*
 * Array.indexOf fix for IE8
 * Recommended Polyfill MDC: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */
/*if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		if (this === undefined || this === null) {
			throw new TypeError('"this" is null or not defined');
		}

		var length = this.length >>> 0;// Hack to convert object.length to a UInt32

		fromIndex = +fromIndex || 0;

		if (Math.abs(fromIndex) === Infinity) {
			fromIndex = 0;
		}

		if (fromIndex < 0) {
			fromIndex += length;
			if (fromIndex < 0) {
				fromIndex = 0;
			}
		}

		for (; fromIndex < length; fromIndex++) {
			if (this[fromIndex] === searchElement) {
				return fromIndex;
			}
		}

		return -1;
	};
}*/

var isMobile	 = function(){
	var hasTouch = false;
    if(navigator.userAgent.match(/Android/i)){
    	hasTouch = true;
    }else if(navigator.userAgent.match(/BlackBerry/i)){
    	hasTouch = true;
    }else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
    	hasTouch = true;
    }else if(navigator.userAgent.match(/IEMobile/i)){
    	hasTouch = true;
    }
    return hasTouch;
}();

if(window.matchMedia){
	var oMediaQuery = window.matchMedia("(orientation: portrait)");
}

/*if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}*/


function init(){
    // Load Page
    require([
        'jquery'
    ], function($){
        $.ajax({
            type: "GET",
            url: 'content/ME_MP_DEF_U6_B1/page.html',
            dataType: 'html',
            success: function (p_data) {
                /*
                oScope.dispatchEvent('RESOURCE_LOADED', {
                                    type:'RESOURCE_LOADED',
                                    target:oScope,
                                    filePath:p_resourcePath,
                                    fileType:p_dataType,
                                    data:p_data,
                                    index:p_nIndex
                                });
                                onResourceLoad.call(oScope, p_data, p_nIndex);*/
                console.log('Page Loaded');
                appendHtml(p_data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                /*
                oScope.dispatchEvent('RESOURCE_LOAD_ERROR', {
                                    type:'RESOURCE_LOAD_ERROR',
                                    target:oScope,
                                    filePath:p_resourcePath,
                                    fileType:p_dataType
                                });
                                Logger.logError('Not able to load ' + p_dataType.toUpperCase() + ' file "' + p_resourcePath + '" with ERROR:"' + errorThrown + '"');*/
                console.log('Page failed to Loaded')
            }
        });
    });
}
function appendHtml(p_data){
    $('#content').append(p_data);
}

/*var hasTouch;
window.addEventListener('touchstart', function setHasTouch () {
    hasTouch = true;
    // Remove event listener once fired, otherwise it'll kill scrolling
    // performance
    window.removeEventListener('touchstart', setHasTouch);
}, false);*/

/*Object.createObject = (function(){
  var createObject;

  if (typeof Object.create === "function"){
    // found native, use it
    createObject = Object.create;
  } else {
    // native not found, shim it
    Object.createObject = function (o) {
      F.prototype = o;
      var child = new F();
      F.prototype = null; // clean up just in case o is really large
      return child;
    };

  }

  return createObject;

  // hoisted to closure scope so even poorly-optimized js engines can run fast:
  function F() {}

})();

*/
