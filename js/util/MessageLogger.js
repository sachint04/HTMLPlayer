define([
    'jquery'
], function ($) {
    var __MessageLoggerInstance,
        $dialog = $('#popup_container'),
        $close = $dialog.find('.close'),
        $popupOverlay = $('#popup_overlay'),
        
        oCallbackScope = null,
        fnCallback = null,
        aArgs = null;

    function MessageLogger() {
    }
    
    MessageLogger.prototype = {
        init : function(p_$MessageLogger, p_$Overlay){
        },
        /*logMessage: function(p_sMessageType, p_oError, p_sMessage, p_bThrow, p_bShowMessage, p_oCallbackScope, p_fnCallback, p_aArgs){
            //console.log('MessageLogger.logMessage() | ARGUMENTS = '+arguments);
            //log.call(this, "MESSAGE", p_sMessage, p_oCallbackScope, p_fnCallback, p_aArgs);
            if(p_bShowMessage === true){log.call(this, p_sMessage, p_oCallbackScope, p_fnCallback, p_aArgs);}
            
            if(p_sMessageType === 'MESSAGE'){//console.log("LOG: "+p_sMessage);}
            if(p_sMessageType === 'WARN'){console.warn('Custom Message: '+JSON.stringify(p_oError)+"\n\nWARN: "+p_sMessage);}
            if(p_sMessageType === 'ERROR'){
                console.error('Custom Message: '+p_sMessage+'\n\nERROR: '+p_oError);
                if(p_bThrow === true){throw new Error(p_sMessage);}
            }
        },*/
        logMessage: function(p_sMessage, p_bShowDialog, p_oCallbackScope, p_fnCallback, p_aArgs){
            //console.log('LOG: '+p_sMessage);
            checkToShowDialog.call(this, p_sMessage, p_bShowDialog, p_oCallbackScope, p_fnCallback, p_aArgs);
        },
        logWarn: function(p_sMessage, p_bShowDialog, p_oCallbackScope, p_fnCallback, p_aArgs){
            //console.warn('WARN: '+p_sMessage);
            checkToShowDialog.call(this, p_sMessage, p_bShowDialog, p_oCallbackScope, p_fnCallback, p_aArgs);
        },
        logError: function(p_oError, p_sMessage, p_bShowDialog, p_bFatal, p_oCallbackScope, p_fnCallback, p_aArgs){
            checkToShowDialog.call(this, p_sMessage, p_bShowDialog, p_oCallbackScope, p_fnCallback, p_aArgs);
            if(p_bFatal){
                if(p_oError !== null && p_oError !== undefined && p_oError !== ''){
                    throw new Error(p_sMessage+'\nCall Stack: '+p_oError);
                }
                throw new Error(p_sMessage);
            }
            console.error(p_sMessage+'\nCall Stack: '+p_oError);
        }
    };
    function checkToShowDialog(p_sMessage, p_bShowDialog, p_oCallbackScope, p_fnCallback, p_aArgs){
        if(p_bShowDialog){
            log.call(this, p_sMessage, p_oCallbackScope, p_fnCallback, p_aArgs);
        }
    }
    
    function log(p_sMessage, p_oCallbackScope, p_fnCallback, p_aArgs){
        //console.log('MessageLogge.log() | ARGUMENTS = '+arguments);
        var oScope = this;
            
        $dialog.removeClass('hide');
        document.getElementById("popup_overlay").style.display = "block";
        $popupOverlay.removeClass('hide');
        $dialog.find('#message').html(p_sMessage);

        oCallbackScope = p_oCallbackScope;
        fnCallback = p_fnCallback;
        aArgs = p_aArgs || [];

        $close.on('click', function(e){
            onDialogClose.call(oScope);
        }).focus();
    }
    
    function onDialogClose(){
        $dialog.addClass('hide');
        document.getElementById("popup_overlay").style.display = "none";
        $popupOverlay.addClass('hide');
        $dialog.find('#message').html("");
        $close.off();
        
        if(fnCallback !== null && fnCallback !== undefined && 
            oCallbackScope !== null && oCallbackScope !== undefined){
            fnCallback.apply(oCallbackScope, aArgs.slice(0));
        }
        oCallbackScope = null;
        fnCallback = null;
        aArgs = null;
    }

    if (__MessageLoggerInstance === null || __MessageLoggerInstance === undefined) {
        __MessageLoggerInstance = new MessageLogger();
    }

    return __MessageLoggerInstance;
});