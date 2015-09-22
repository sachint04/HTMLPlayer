require.config({
    shim:{
		
    },
    paths:{
        jquery				: 'libs/jquery-1.9.1.min',
        x2js				: 'libs/xml2json.min'
    }
});

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
if (!Array.prototype.indexOf) {
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
}

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


require([
	// Load our app module and pass it to our definition function
	'framework/ResourceLoader'
], function(ResourceLoader){
	// The "app" dependency is passed in as "Application"
	var oScope = this;
	var contentFolder = 'ME_AE_DIA_U6_B10_MCQ2';
	// var contentFolder = 'MCQ';

    require(['content/'+contentFolder+'/page.js'], function(page){
	 	var $container = $('#page_container');	
           var oResourcePaths = 	['content/'+contentFolder+'/page.css',
           							'content/'+contentFolder+'/page.html',
           							'content/'+contentFolder+'/page.xml',
            						];
		var callback = function(oScope, aReso, oLoader, page){
	 			var oPage = new page($container, aReso[0], aReso[1], aReso[2]);
				oPage.init();
				
	  			oLoader.destroy();
	  			oLoader = null;
			};
			
	 	var rl = new ResourceLoader();
    	rl.loadResource(oResourcePaths, this, callback,[page]);    		
     });
		
});


