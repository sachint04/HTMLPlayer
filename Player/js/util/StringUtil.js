define([
], function () {
    var __StringUtilInstance;

    function StringUtil() {}

    StringUtil.prototype = {
        sanitizeValue       : function(p_sValue, p_sDefaults){
            if((typeof p_sValue) !== "string"){
                // ** Value is not a string
                return p_sValue;
            }
            var sValue  = p_sValue.split(' ').join(''),
                retVal;
            //Logger.logDebug('ComponentAbstract.sanitizeValue() | Value = '+p_sValue+' : Default = '+p_sDefaults);

            if(!sValue || sValue === '' || sValue === null || sValue === undefined){
                // ** Value is Not Specified OR Undefined
                retVal  = p_sDefaults;
            }else if(sValue.toUpperCase() === 'TRUE' || sValue.toUpperCase() === 'FALSE'){
                // ** Value is a Boolean
                retVal  = (sValue.toUpperCase() === 'TRUE') ? true : false;
            }else if(!isNaN(Number(sValue))){
                // ** Value is a Number
                retVal  = Number(p_sValue);
            }else{
                // ** Its a String
                retVal  = p_sValue;
            }
            return retVal;
        },
        castToAppropriateDataType : function(p_value){
            var sValue = p_value.toLowerCase();
            if(sValue === "null"){/*console.log('\tNULL');*/return null;}
            if(sValue === "undefined" || sValue === ""){/*console.log('\tUNDEFINED');*/return undefined;}
            if(sValue === "true" || sValue === "false"){/*console.log('\tBOOLEAN');*/return (sValue === "true") ? true : false;}
            try{/*console.log('\tJSON');*/return JSON.parse(p_value);}catch(e){}
            if(!isNaN(sValue)){/*console.log('\tNUMBER');*/return Number(sValue);}
            //console.log('\tSTRING');
            return p_value;
        },
        hasValidValue : function(p_value){
            return (!this.isEmpty(p_value) && p_value !== undefined && p_value !== null && p_value !== '');
        },
        isEmpty : function(p_value){
            return (p_value === '' || p_value === 'undefined' || p_value === 'null');
        }
    };

    if (__StringUtilInstance === null || __StringUtilInstance === undefined) {
        __StringUtilInstance = new StringUtil();
    }

    return __StringUtilInstance;
});