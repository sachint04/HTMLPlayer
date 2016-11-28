define([
	'controller/SwiffyController',
	'model/Constants',
	'util/LoaderUtil'
], function(SwiffyController, Constants, LoaderUtil){
    'use trict';
	var  __instance; 
	var 	$progress;
	var $progressText;
	var	w;
	var nItem  = 0;
    function LoadProgress(p_oAbstractPageReference){
        return this;
    }
    
    LoadProgress.prototype.addItem 		= function(count){
		nItem += count;
		$progress.width(w);
		//console.log('addItem \n\tnItem  - ' +nItem+' |  count - '+ count+' | w - '+w);    
		$progressText.html('loading '+nItem+' items...'); 	
    }
    
    LoadProgress.prototype.removeItem 		= function(count){
		if(nItem <= 0 )return;
		
		var diff = nItem - count;
		var w2 	=  (diff / nItem) * w;
		$progress.find('.bar').width(w2);
		nItem -= count;
		nItem = Math.max(nItem , 0);
	//	$progress.html('loading '+nItem+' of '+count+' items...');
	//	console.log('removeItem  \n\tnItem  - ' +nItem+' \n\t count - '+ count+' \n\t w - '+w+' \n\t w2 - '+w2+' \n\t diff - '+diff);     	

    }
    
	if(__instance == null){
		$progress    = $('.progress-view');
		$progressText 	= $('.progress-text');	
		if(!$progress.length  ){
			//alert('progress view not found!');
		}else{
			w  = $progress.width();
			console.log('width ' +w);
		}
		__instance = new LoadProgress();
	}

    
    return __instance;
});