define([

], function () {
    'use strict';
    function EventDispatcher() {
        this.events = {};
        return this;
    }
    EventDispatcher.prototype = {
        constructor: EventDispatcher,
        addEventListener: function (key, func) {
            ////console.log('$$$ addEventListener() : SCOPE = '+this+' : KEY = '+key+' : HAS property = '+this.events.hasOwnProperty(key));
            if (!this.events.hasOwnProperty(key)) {
                ////console.log('\t$$$ Create NEW array for key "'+key+'"');
                this.events[key] = [];
            }
            this.events[key].push(func);
        },
        hasEventListener: function (key, func) {
            ////console.log('$$$ addEventListener() : SCOPE = '+this+' : KEY = '+key+' : HAS property = '+this.events.hasOwnProperty(key));
            if (!this.events.hasOwnProperty(key)) {
                ////console.log('\t$$$ Create NEW array for key "'+key+'"');
                if (func) {
                    if (this.events[key].indexOf(func) !== -1) {
                        return true;
                    }
                }
                return false;
            }
            return true;
        },
        removeEventListener: function (key, func) {
            if (this.events.hasOwnProperty(key)) {
                for (var i in this.events[key]) {
                    ////console.log('removeEventListener() $$$ '+key+' :: '+(this.events[key][i] === func)+' :: \n\t'+this.events[key][i]+'\n\t'+func);
                    if (this.events[key][i] === func) {
                        this.events[key].splice(i, 1);
                    }
                }
            }
        },
        removeAllEventListener: function () {
            for (var key in this.events) {
                var keyPointer = this.events[key];
                for (var i in keyPointer) {
                    ////console.log('removeAllEventListener() $$$ '+key+' :: Type of Function = '+(typeof this.events[key][i] === 'function'));
                    keyPointer.splice(i, 1);
                }
                keyPointer = null;
            }
        },
        dispatchEvent: function (key, dataObj) {
            if (this.events.hasOwnProperty(key)) {
                dataObj = dataObj || {};
                dataObj.currentTarget = this;
                ////console.log('$$$ dispatchEvent() | '+this.toString()+' : Length = '+this.events[key].length);
                var eventKeyCopy = this.events[key].slice(0);
                for (var i = 0; i < eventKeyCopy.length; i++) {
                    ////console.log('\t$$$ index '+i);
                    eventKeyCopy[i](dataObj);
                }
                ;
                /*for (var i in this.events[key]) {
                 ////console.log('\t$$$ index '+i);
                 this.events[key][i](dataObj);
                 }*/

            }
        },

        destroy: function () {
            this.removeAllEventListener();
            this.events = null;
        }

    };

    return EventDispatcher;
});