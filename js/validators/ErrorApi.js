/* 
    Created on : Aug 19, 2015, 1:30:11 PM
    Author     : Vincent.Gomes
*/
define([
    'model/Constants',
], function(Constants){
    var __instanceErrorApi,
        oErrorList = Constants.getErrorList(),
        oErrorTypeMap = Constants.getErrorMap();
    
    function ErrorApi(){}
    
    /* -------------------
     * Public Methods
     * ------------------- */
    ErrorApi.prototype.getErrorMessage = function(p_nErrorType, p_sErrorFile){
        if(!oErrorTypeMap.hasOwnProperty(p_nErrorType)){
            //console.warn('ErrorApi.getErrorMessage() | Error of type "'+p_nErrorType+'" not found.');
            return;
        }
        if(!oErrorList.hasOwnProperty(oErrorTypeMap[p_nErrorType])){
            //console.warn('ErrorApi.getErrorMessage() | Error of type "'+oErrorTypeMap[p_nErrorType]+'" not found in "Error List".');
            return;
        }
        if(!oErrorList[oErrorTypeMap[p_nErrorType]].hasOwnProperty(p_sErrorFile)){
            //console.warn('ErrorApi.getErrorMessage() | Error message for "'+p_sErrorFile+'" of type "'+oErrorTypeMap[p_nErrorType]+'" not found.');
            return;
        }
        return oErrorList[oErrorTypeMap[p_nErrorType]][p_sErrorFile];
    };
    ErrorApi.prototype.toString = function(){
        return 'validators/ErrorApi';
    };
    
    if(__instanceErrorApi === undefined){
        __instanceErrorApi = new ErrorApi();
    }
    return __instanceErrorApi;
});