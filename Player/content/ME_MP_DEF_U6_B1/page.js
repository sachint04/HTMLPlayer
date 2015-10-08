define([
    'controller/view/AbstractPage'
], function(AbstractPage){
    'use strict';

    function Page(){
        AbstractPage.call(this);
    }
    Page.prototype = Object.create(AbstractPage.prototype);
    Page.prototype.constructor = Page;

    Page.prototype.setLocations = function(p_oLocations){
        AbstractPage.prototype.setLocations(p_oLocations);
    }
    Page.prototype.init = function(p_$domPageContainer, p_oResources, p_sPageName){
        console.log('Page.init() | ')
        AbstractPage.prototype.init(p_$domPageContainer, p_oResources, p_sPageName);
    };
    Page.prototype.destroy = function(){
        AbstractPage.prototype.destroy();
    };
    return Page;
});
