/*
 * Responsible for initializing the
 * - controller/view/UIManager
 * - modle/CourseConfig
 * Exposing API for "Next", "Back" navigation
 * Loading the page as per request
 */
define([
    'jquery',
    'core/AudioManager',
    'model/Constants',
    'controller/view/AbstractPage'
], function($, AudioManager, Constants, AbstractPage){
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
        //console.log('CourseController.createUIController() | ');

        // Add UI Listeners

        //this.loadPage('ME_MP_DEF_U6_B1');
    }

    CourseController.prototype.loadPage = function(p_sFolderName, p_sPageType, p_bDrawClonePage){
        console.log('CourseController.loadPage() | Folder Name = '+p_sFolderName+' : Page Type = '+p_sPageType);
        Constants.setCurrentPageName(p_sFolderName);
		Constants.setCurrentPageType(p_sPageType);
        if(this.oCurrentPage){
            $('#content').contents().wrapAll('<div id="temp_content"></div>');
			var bDrawClonePage = (p_bDrawClonePage === null || p_bDrawClonePage === undefined) ? true : p_bDrawClonePage;
			// if(bDrawClonePage){
				// drawClonePageImage.call(this);
			// }else{
				_loadPage.call(this);
			//}
        }else{
            _loadPage.call(this);
        }
    }
    function drawClonePageImage(){
        var oScope = this,
            domContent = document.getElementById('temp_content'),
            nContentWidth = domContent.offsetWidth,
            nContentHeight = domContent.offsetHeight;
			
        html2canvas(domContent, {
            onrendered: function (domElementCanvas) {
                var canvas = document.createElement('canvas');
                canvas.id     = "canvas";
                canvas.width  = nContentWidth;
                canvas.height = nContentHeight;
                canvas.style.zIndex   = 8;
                canvas.style.position = "absolute";
                canvas.style.top = 0;
                canvas.style.left= 0;
                domContent.appendChild(canvas);
                canvas = document.getElementById('canvas');
                canvas.getContext('2d').drawImage(domElementCanvas, 0, 0, nContentWidth , nContentHeight);
                _loadPage.call(oScope);
            }
        });
    }
    function _loadPage(){
		var sFolderName = Constants.getCurrentPageName();
        var oResources = {
            html: 'content/' + sFolderName + '/page.html',
            xml: 'content/' + sFolderName + '/page.xml'/*,
            // ** CSS can be removed if required as Swiffy Page doesnt require CSS
            css: 'content/' + sFolderName + '/page.css'*/
        };
		//console.log(JSON.stringify(oResources));
        if(this.oCurrentPage) {
            this.oCurrentPage.destroy();
			this.oCurrentPage = null;
        }
        this.oCurrentPage = new AbstractPage();
        this.oCurrentPage.addEventListener('PAGE_LOADED', this.onPageLoaded);
        this.oCurrentPage.init($('#content'), oResources, sFolderName);
    }
    function onPageLoaded(data){
        //console.log('CourseController.onPageLoaded() | ');
		$('#content').children('#temp_content').remove();
		this.oCurrentPage = data.currentTarget;
		$('#loader').addClass('hide');
		$('.overlay').addClass('hide');
    }
    function pageDiaplayReady(){
        console.log('CourseController.pageDiaplayReady() | ');

    }




    return new CourseController();
});