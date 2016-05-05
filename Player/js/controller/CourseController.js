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
    'controller/view/AbstractPage',
    'util/EventDispatcher'
], function($, AudioManager, Constants, AbstractPage,EventDispatcher){
    'use strict';

    function CourseController(){
    	EventDispatcher.call(this);
    	this.sCurrentPage;
        this.oCurrentPage = null;
	
		this.sPage_1 = 'content';
		this.oPage_1;
		
		this.sPage_2 = 'content_1';
		this.oPage_2;		
        Constants.setLanguage('en');
		
        this.onPageLoaded = onPageLoaded.bind(this);
    }

    CourseController.prototype = Object.create(EventDispatcher.prototype)
	CourseController.prototype.constructor = CourseController;
    	
    	
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
	
	function getCurrentPageId(){
		var sPageId = (this.sCurrentPage && this.sCurrentPage === this.sPage_1) ? this.sPage_1 : this.sPage_2;
		return sPageId;
	}
	function swapPageHolder(){
		var sPageId = (this.sCurrentPage && this.sCurrentPage === this.sPage_1) ? this.sPage_2 : this.sPage_1;
		return sPageId;
	}
	
	function getCurrentPageObject(){
		var oPage = (this.sCurrentPage && this.sCurrentPage === this.sPage_1) ? this.oPage_1 : this.oPage_2;
		return oPage;
	}
	function swapPageObject(){
		var oPage = (this.sCurrentPage && this.sCurrentPage === this.sPage_1) ? this.oPage_2 : this.oPage_1;
		return oPage;
	}
	
    CourseController.prototype.loadPage = function(p_sFolderName, p_sPageType, p_bDrawClonePage, p_fCalla){
        console.log('CourseController.loadPage() | Folder Name = '+p_sFolderName+' : Page Type = '+p_sPageType);
        Constants.setCurrentPageName(p_sFolderName);
		Constants.setCurrentPageType(p_sPageType);
        if(this.oCurrentPage){
			this.oCurrentPage.invalidate();
			var sCurrentPageId = getCurrentPageId.call(this);
            $('#'+sCurrentPageId).contents().wrapAll('<div id="temp_content"></div>');
			var bDrawClonePage = (p_bDrawClonePage === null || p_bDrawClonePage === undefined) ? true : p_bDrawClonePage;
			/*if(bDrawClonePage){
				drawClonePageImage.call(this);
			}else{*/				_loadPage.call(this);
			//}
        }else{
            _loadPage.call(this);
        }
    }
    /*function drawClonePageImage(){
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
    }*/
    function _loadPage(){
		var sFolderName = Constants.getCurrentPageName(),
            oResources = {
                html: 'content/' + sFolderName + '/page.html',
                xml: 'content/' + sFolderName + '/page.xml'/*,
                // ** CSS can be removed if required as Swiffy Page doesnt require CSS
                css: 'content/' + sFolderName + '/page.css'*/
            },
            sNextPageHolderId = swapPageHolder.call(this),
            oNextPageHolder = swapPageObject.call(this);
		//console.log(JSON.stringify(oResources));	
		AudioManager.destroyPlayList();
		
        oNextPageHolder = new AbstractPage();
        oNextPageHolder.addEventListener('PAGE_LOADED', this.onPageLoaded);
        oNextPageHolder.init($('#'+sNextPageHolderId), oResources, sFolderName);
    }
	
    function onPageLoaded(data){
        //console.log('CourseController.onPageLoaded() | ');
		var sPrevPageHolderId = getCurrentPageId.call(this),
			oPrevPage = getCurrentPageObject.call(this);
		
		if(sPrevPageHolderId){$('#'+sPrevPageHolderId).children('#temp_content').remove();}
		if(oPrevPage){oPrevPage.hide(true); oPrevPage.destroy(); oPrevPage = null;}
		
		this.sCurrentPage = swapPageHolder.call(this);
		this.oCurrentPage = data.currentTarget;
		this.oCurrentPage.hide(false);
		
		$('#loader').addClass('hide');
		$('.overlay').addClass('hide');
		this.dispatchEvent('PAGE_LOADED', {type:'PAGE_LOADED', target:this, page:this.oCurrentPage});
    }
    function pageDiaplayReady(){
        console.log('CourseController.pageDiaplayReady() | ');

    }




    return new CourseController();
});