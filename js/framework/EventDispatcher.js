define([
], function(){
	function EventDispatcher() {
		this.events = {};
		return this;
	}
	EventDispatcher.prototype = {
		constructor					: EventDispatcher,
		addEventListener			: function (key, func) {
		    if (!this.events.hasOwnProperty(key)) {
		        this.events[key] = [];
		    }
		    this.events[key].push(func);
		},
		removeEventListener			: function (key, func) {
		    if (this.events.hasOwnProperty(key)) {
		        for (var i in this.events[key]) {
		            if (this.events[key][i] === func) {
		                this.events[key].splice(i, 1);
		            }
		        }
		    }
		},
		dispatchEvent				: function (key, dataObj) {
		    if (this.events.hasOwnProperty(key)) {
		        dataObj = dataObj || {};
		        dataObj.currentTarget = this;
		        for (var i in this.events[key]) {
		            this.events[key][i](dataObj);
		        }
		    }
		}
	};

	return EventDispatcher;
});