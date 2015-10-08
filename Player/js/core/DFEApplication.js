/*
 * Responsible for initializing the
 * - controller/CourseController
 * Exposing API for communication with the PHP engine if required
 */
define([
    'controller/CourseController'
], function(CourseController){
    'use strict';

    function DFEApplication(){

    }

    DFEApplication.prototype.init = function(){
        console.log('DFEAppliation.init() | ');
        CourseController.init();
    };

    return new DFEApplication();
});
