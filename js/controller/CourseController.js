/*
 * Responsible for initializing the
 * - controller/view/UIManager
 * - modle/CourseConfig
 * Exposing API for "Next", "Back" navigation
 * Loading the page as per request
 */
define([
    'jquery',
    'util/LoaderUtil'
], function($, LoaderUtil){
    'use strict';

    function CourseController(){

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

        loadPage.call(this);
    }

    function loadPage(){
        console.log('CourseController.loadPage() | ');
        var oScope = this;
        LoaderUtil.loadResource('content/ME_MP_DEF_U6_B1/page.html', function(data){
            onPageLoaded.call(oScope, data);
        });
    }
    function onPageLoaded(data){
        console.log('CourseController.onPageLoaded() | ');
        $('#content_wrapper > #content').append(data[0]);
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
