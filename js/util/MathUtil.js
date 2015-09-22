/*
 Created on : Aug 18, 2015, 1:30:11 PM
 Author     : Vincent.Gomes
 */
define([
    'util/MessageLogger'
], function(Logger){
    var __instanceMathUtil;

    function MathUtil(){

    }

    MathUtil.prototype = {
        constructor : MathUtil,
        getRandom : function(p_nMin, p_nMax){
            return Math.floor(Math.random() * (p_nMax - p_nMin + 1)) + p_nMin;
        },
        getRandomIndex: function(p_nMin, p_nMax, p_nTotalIndex){
            if((p_nMax - p_nMin) < p_nTotalIndex){
                Logger.logError(null, 'MathUtil.getRandomIndex() | Required indexes is greater than the range specified.', true, true);
            }
            var aIndexs = [];
            while(aIndexs.length < p_nTotalIndex){
                var n = this.getRandom(p_nMin, p_nMax);
                if(aIndexs.indexOf(n) === -1){
                    aIndexs.push(n);
                }
            }
            return aIndexs;
        },
        getRandomValues: function(p_aArr, p_nTotalRequiredValues){
            if(p_aArr.length < p_nTotalRequiredValues){
                Logger.logError(null, 'MathUtil.getRandomValues() | Array length is less than the number of required values.', true, true);
            }
            var aIndexs = [],
                aValues  = [],
                aTemp  = p_aArr.slice(0),
                nMax = aTemp.length - 1;

            while(aValues.length < p_nTotalRequiredValues){
                var n = this.getRandom(0, nMax);
                if(aIndexs.indexOf(n) === -1){
                    aIndexs.push(n);
                    aValues.push(aTemp[n]);
                }
            }
            
            return {
                indexes: aIndexs,
                values: aValues
            };
        },
        add:function(p_nValue1, p_nValue2){
            var result = 0;
            if (!isNaN(p_nValue1) && !isNaN(p_nValue2)) {
                result = Number(p_nValue1) + Number(p_nValue2);
            }
            return result;
        },
        subtract:function(p_nValue1, p_nValue2){
            var result = 0;
            if (!isNaN(p_nValue1) && !isNaN(p_nValue2)) {
                result = Number(p_nValue1) - Number(p_nValue2);
            }
            return result;
        },
        divide:function(p_nValue1, p_nValue2){
            var result = 0;
            if (!isNaN(p_nValue1) && !isNaN(p_nValue2)) {
                result = Number(p_nValue1) / Number(p_nValue2);
            }
            return result;
        },
        multiply:function(p_nValue1, p_nValue2){
            var result = 0;
            if (!isNaN(p_nValue1) && !isNaN(p_nValue2)) {
                result = Number(p_nValue1) * Number(p_nValue2);
            }
            return result;
        }
    };

    if(__instanceMathUtil === undefined){
        __instanceMathUtil = new MathUtil();
    }

    return __instanceMathUtil;
});