/*
 * Responsible for initializing the
 * - controller/view/UIManager
 * - modle/CourseConfig
 * Exposing API for "Next", "Back" navigation
 * Loading the page as per request
 */
define([
    'jquery',
    'model/Constants',
    'controller/view/AbstractPage',
    'util/LoaderUtil'
], function($, Constants, AbstractPage, LoaderUtil){
    'use strict';

    function CourseController(){
        this.oCurrentPage = null;
        Constants.setLanguage('en');

        this.onPageLoaded = onPageLoaded.bind(this);
    }

    CourseController.prototype.init = function(){
        console.log('CourseController.init() | ');
        createCourseConfig.call(this);
    };

    function createCourseConfig(){
        console.log('CourseController.createCourseConfig() | ');

        // Add listener to the Course config modle and on its parse complete call the method below
        createUIController.call(this);
    };

    function createUIController(){
        console.log('CourseController.createUIController() | ');

        // Add UI Listeners

        //this.loadPage('ME_MP_DEF_U6_B1');
    }

    CourseController.prototype.loadPage = function(p_sFolderName){
        console.log('CourseController.loadPage() | Folder Name = '+p_sFolderName);
        var oResources = {
            html: 'content/' + p_sFolderName + '/page.html',
            xml: 'content/' + p_sFolderName + '/page.xml'/*,
            // ** CSS can be removed if required as Swiffy Page doesnt require CSS
            css: 'content/' + p_sFolderName + '/page.css'*/
        };
        console.log(JSON.stringify(oResources))
        Constants.setCurrentPageName(p_sFolderName);
        this.oCurrentPage = new AbstractPage();
        this.oCurrentPage.addEventListener('PAGE_LOADED', this.onPageLoaded);
        this.oCurrentPage.init($('#content'), oResources, p_sFolderName);
        /*LoaderUtil.loadResource('content/wrapper.html', function(data){
       // LoaderUtil.loadResource('content/ME_MP_DEF_U6_B1/page.html', function(data){
            onPageLoaded.call(oScope, data);
        });*/
    }
    function onPageLoaded(data){
        console.log('CourseController.onPageLoaded() | ');
        $('#loader').addClass('hide');
        $('.overlay').addClass('hide');
        //$('#content_wrapper > #content').append(data[0]);
        var oScope = this;
        /*DFEPages.page.init(function(){
            pageDiaplayReady.call(oScope);
        });*/
    }
    function pageDiaplayReady(){
        console.log('CourseController.pageDiaplayReady() | ');

    }




    return new CourseController();
});