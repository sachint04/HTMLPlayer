define([
	'jquery',
	'component/AbstractComponent',
	'util/EventDispatcher'
	],function($,AbstractComponent, EventDispatcher){
		
		var Accordion = function(){
			AbstractComponent.call(this);
			this.aChap = null;
			this.aBoard = null;
			this.fps 	= 20;
			return this;
		};
		
		Accordion.prototype						= Object.create(AbstractComponent.prototype);
		Accordion.prototype.constructor			= Accordion;
		
		Accordion.prototype.init =function(p_sID, p_oConfig, oData){
		//Accordion.prototype.init =function($view, oCompConfig, p_oComponent){
			this.aChap  = (odata.length != undefined)? odata : [odata];
			var aSection = []
			for(var i = 0 ; i<this.aChap.length;i++){
				var oSection = this.aChap[i],
				sID 			= oSection_ID,
				sTitle 			= oSection._ChapName,
				sNum 			= (i < 10)? "0"+ (i+1) : i,
				$section 		= this.createSection(sID, sNum , sTitle);
				this.aBoard 	= (oSection.Board.length != undefined)? oSection.Board : [oSection.Board];
				for(var s = 0; s<this.aBoard.length;s++){
					var oBoard 	= this.aBoard[s],
					sBoardID	= oBoard._ID,
					sBoardName	= oBoard._BoardName,
					sBoardType	= oBoard._Type,
					aTarget		= (oBoard.Target.length != undefined)? oBoard.Target : [oBoard.Target],
					nTime		= 0,
					sNum 		= (s+ 1)+":",
					aType		= [];
					
					for(var n = 0; n<aTarget.length;n++){
						var oTarget 	= aTaret[i];
						nTime 			+= Number(oTarget._TotalFrame);
						
						if(aType.indexOf(oTarget._Type) < 0){
							aType.push(oTarget._Type);
						}
					}
					this.aBoard.totalTime = nTime;	
					$section.append(this.createBoard(sBoardID, sNum , sBoardName, aType, this.getTotalTime(nTime)));
				}
				aSection.push($section);
			}
			this.$component.append(aSection);
			AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
		}; 
		
		Accordion.prototype.getTargetListByBoard								= function(p_sID) {
			for(var i = 0;i < this.aBoard.length;i++){
				if(this.aBoard[i]._ID ==  p_sID){
					return this.aBoard[i].Target;
				}
			}
			return [];
		};
		Accordion.prototype.getTotalTime								= function(frames) {
			var sec = (frames / this.fps),
			min		= Math.floor(sec /60),
			hr 		= Math.floor(min /60),
			
			sec = (min % 60) 
			
			var txt_hr = (hr < 10 ) ? "0"+ hr : hr;
			var txt_min = (min < 10 ) ? "0"+ min : min;
			var txt_sec = (sec < 10 ) ? "0"+ sec : sec;
				
			
			return (txt_hr+":"+ txt_min+":"+txt_sec);
				
		};
		
		Accordion.prototype.createSection								= function(p_sID, p_sNum, p_sName, p_sTime) {
			var $elem = $("<div></div>"),
			sText =	 '<span class="acc-chap-num">'+p_sNum+': </span><span class="acc-chap-title">'+p_sName+'</span><span class="acc-chap-time">'+p_sTime+'</span>';
			
			$elem.attr({
				"id":p_sID,
			}).html(sText);
			return $elem;
		};
		
		Accordion.prototype.createBoard								= function(p_sBoardID, p_sNum, p_sBoardName, p_aType, p_sTime) {
			var $elem = $('<div id="'+p_sBoardID+'" class="acc-board"><span class="acc-board-num">'+p_sNum+': </span><span class="acc-board-title">'+p_sBoardName+'</span><span class="acc-board-time">'+p_sTime+'</span><span class="DEF"><span><span class="DIA"><span><span class="DER"><span><span class="APP"><span></div>');
			for(var i = 0; i< p_aType.length;i++){
				$elem.find('.'+p_aType[i]).addClass('active')
			}
			

			return $elem;
		};
		
		Accordion.prototype.bindHandlers								= function() {
			//JSON.stringify('\n \t oCompConfig = '+p_oConfig);	
			
		};
		
		Accordion.prototype.initialize						= function() {
			var oScope = this;
		
			AbstractComponent.prototype.dispatchComponentLoadedEvent.call(this);
		};
		
		
		Accordion.prototype.getComponentConfig				= function() {
			return{};
		};
		
		Accordion.prototype.destroy							= function() {
	
			AbstractComponent.prototype.destroy.call(this);
  	 };
		return Accordion;
	});
