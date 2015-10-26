define([
	'jquery',
	'component/AbstractComponent',
	'util/EventDispatcher'
	],function($,AbstractComponent, EventDispatcher){
		
		var Accordion = function(){
			AbstractComponent.call(this);
			this.$panel 	= null;
			this.oConfig 	=	 null;
			this.aChap 		= null;
			this.aBoard 	= null;
			this.fps 		= 20;
			this.sSectionTitle;
			return this;
		};
		
		Accordion.prototype						= Object.create(AbstractComponent.prototype);
		Accordion.prototype.constructor			= Accordion;
		
		Accordion.prototype.init = function(p_$panel, p_oConfig, oData, sSectionName){
		//Accordion.prototype.init =function($view, oCompConfig, p_oComponent){
			this.$panel			= p_$panel;
			this.aChap  		= (oData.length != undefined)? oData : [oData];
			this.oConfig 		= p_oConfig;
			this.sSectionTitle	= sSectionName;
			var aSection = [];
			for(var i = 0 ; i<this.aChap.length;i++){
				var oSection 	= this.aChap[i],
				sID 			= oSection._ID,
				sTitle 			= oSection._ChapName || oSection._TutName,
				sNum 			= (i < 9)? "0"+ (i+1) : (i + 1),
				nTotalTime 		= 0,
				aBoard 			= (oSection[this.sSectionTitle].length != undefined)? oSection[this.sSectionTitle] : [oSection[this.sSectionTitle]],
				$Board			=[];
				aBoard.totalTime = 0;
				for(var s = 0; s<aBoard.length;s++){
					var oBoard 	= aBoard[s],
					sBoardID	= oBoard._ID,
					sBoardName	= oBoard._BoardName,
					sBoardType	= oBoard._Type,
					nTime		= 0,
					sBoardNum	= (s < 9)? "0"+ (s+1) : (s + 1),
					aType		= [];
					
					if(this.sSectionTitle != "TUT"){
						var aTarget		= (oBoard.Target.length != undefined)? oBoard.Target : [oBoard.Target];
						for(var n = 0; n<aTarget.length;n++){
							var oTarget 	= aTarget[n];
							nTime 			+= Number(oTarget._TotalFrame);
							
							if(aType.indexOf(oTarget._Type) < 0){
								aType.push(oTarget._Type);
							}
						}
						aBoard.totalTime += nTime;	
						$Board.push(this.createBoard(sID, (s+1), sBoardNum+":", sBoardName, aType, this.getTotalTime(nTime, {hr:false, min:true,sec:true})));
					}else{
						$Board.push(this.createTut('tut', (s+1), sBoardNum+":", sBoardName, aType));
					}
				}
				if(this.sSectionTitle != "TUT"){
					var $section 		= this.createSection(sID, sNum + ":" , sTitle, this.getTotalTime(aBoard.totalTime, {hr:true, min:true,sec:true}));
				}else{
					var $section 		= this.createTutorials(sID, sNum + ":" , sTitle);					
				}
				aSection.push($section);
				var $boardHolder = $('<div class="board-container" style="display:none;"></div>');//$section.append($Board)
				$boardHolder.attr('id', 'board_container_'+$section.attr('id'))
				$boardHolder.append($Board);
				aSection.push($boardHolder);
			}
			this.$panel.append(aSection);
//			AbstractComponent.prototype.init.call(this, "menu", p_oConfig, p_$xmlComponent);
		}; 
		
		Accordion.prototype.getTargetListByBoard								= function(p_sID) {
			for(var i = 0;i < this.aBoard.length;i++){
				if(this.aBoard[i]._ID ==  p_sID){
					return this.aBoard[i].Target;
				}
			}
			return [];
		};
		Accordion.prototype.getTotalTime								= function(frames, format) {
		
			var sec = (frames / this.fps);
			var min		= Math.floor(sec /60);
			var hr 		= Math.floor(min /60);
			
			sec = (frames > 60) ? Math.floor((frames / this.fps) %  60) : 0; 
			
			var txt_hr = (hr < 10 ) ? "0"+ hr : hr;
			var txt_min = (min < 10 ) ? "0"+ min : min;
			var txt_sec = (sec < 10 ) ? "0"+ sec : sec;
				
			var aformat = []
			if (format.hr)aformat.push(txt_hr );
			
			if (format.min)aformat.push(txt_min );
			
			if (format.sec)aformat.push(txt_sec );
			
			var str= ''
			for (var i=0; i < aformat.length; i++) {
			  	str += aformat[i];
			  if(i < aformat.length - 1){
			  	str += ":";
			  }
			};
			return str;
				
		};
		
		Accordion.prototype.createSection								= function(p_sID, p_sNum, p_sName, p_sTime) {
			var oScope = this,
			$elem = $("<div></div>"),
			sText =	 '<span class="acc-chap-num">'+p_sNum+' </span><span class="acc-chap-title">'+p_sName+'</span><span class="acc-chap-time">'+p_sTime+'</span>';
			
			$elem.attr({
				"id":p_sID,
			}).addClass('acc-chap btn').html(sText);
			$elem.click(function(e){
		//		e.prevetDefault();
				oScope.onSectionClicked(e)	
			});
			return $elem;
		};
		Accordion.prototype.createTutorials								= function(p_sID, p_sNum, p_sName) {
			var oScope = this,
			$elem = $("<div></div>"),
			sText =	 '<span class="acc-chap-num">'+p_sNum+' </span><span class="acc-chap-title">'+p_sName+'</span>';
			
			$elem.attr({
				"id":p_sID,
			}).addClass('acc-chap btn').html(sText);
			$elem.click(function(e){
				oScope.onSectionClicked(e)	
			});
			return $elem;
		};
		
		Accordion.prototype.createBoard								= function(p_sSectionID, p_sBoardID, p_sNum, p_sBoardName, p_aType, p_sTime) {
			var oScope = this,
			str = 	'<div id="board_'+p_sSectionID+'_'+p_sBoardID+'" class="acc-board">'+
						'<span class="acc-board-num">'+p_sNum+' </span>'+
						'<span class="acc-board-title">'+p_sBoardName+'</span>'+
						'<span class="acc-board-time">'+p_sTime+'</span>'+
						'<span class="DEF"><span>'+
						'<span class="DIA"><span>'+
						'<span class="DER"><span>'+
						'<span class="APP"><span>'+
						'</div>';
		
			var $elem = $(str);	
			for(var i = 0; i< p_aType.length;i++){
				$elem.find('.'+p_aType[i]).addClass('active')
			}
			
			$elem.click(function(e){
			//	e.prevetDefault();
				oScope.onBoardClicked(e)	
			});
			return $elem;
		};
		Accordion.prototype.createTut				= function(p_sSectionID, p_sBoardID, p_sNum, p_sBoardName) {
			var oScope = this,
			str = 	'<div id="board_'+p_sSectionID+'_'+p_sBoardID+'" class="acc-board">'+
						'<span class="acc-board-num">'+p_sNum+' </span>'+
						'<span class="acc-board-title">'+p_sBoardName+'</span>'+
						'<span class="DEF"><span>'+
						'<span class="DIA"><span>'+
						'<span class="DER"><span>'+
						'<span class="APP"><span>'+
						'</div>';
		
			var $elem = $(str);	

			$elem.click(function(e){
			//	e.prevetDefault();
				oScope.onTutorialClicked(e)	
			});
			return $elem;
		};
		
		Accordion.prototype.onSectionClicked							= function(e) {
			var $target 	= $(e.currentTarget);
			var sID 		= $target.attr('id');
			var $Board		= this.$panel.find('#'+'board_container_'+sID);
			
			if($target.hasClass('open')){
				$Board.slideUp();
				return;
			}
						
			//this.$panel.find('.board-container').slideUp().slideUp('fast');//.addClass('hide');
			this.$panel.find('.open').removeClass('open');
			$target.addClass('open');
			$Board.slideDown();
			
		}
		Accordion.prototype.onBoardClicked								= function(e) {
			
		}
		Accordion.prototype.onTutorialClicked								= function(e) {
			
		}
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
