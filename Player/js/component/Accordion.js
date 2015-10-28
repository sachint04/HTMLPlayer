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
			this.oBoard 	= null;
			this.aBoards	= [];
			this.aPages	= [];
			this.fps 		= 20;
			this.sSectionTitle;
			
			this.onBoardClicked = this.onBoardClicked.bind(this);
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
					sBoardNum	= (aBoard.length > 9 && s < 9)? "0"+ (s+1) : (s + 1),
					aType		= [];
					this.aBoards.push(oBoard);		
					if(this.sSectionTitle != "TUT"){
						var aTarget		= (oBoard.Target.length != undefined)? oBoard.Target : [oBoard.Target];
						for(var n = 0; n<aTarget.length;n++){
							var oTarget 	= aTarget[n];
							if(oTarget._Type.toUpperCase() != "QUIZ"){
								this.aPages.push(oTarget);
							}
							nTime 			+= Number(oTarget._TotalFrame);
							
							if(aType.indexOf(oTarget._Type) < 0){
								aType.push(oTarget._Type);
							}
						}
						aBoard.totalTime += nTime;
						var bShowType = (oBoard._Type == "Normal");	
						$Board.push(this.createBoard(sID, (s+1), sBoardNum+".", sBoardName, aType, this.getTotalTime(nTime), bShowType));
					}else{
						aBoard.totalTime += Number(oBoard._TotalFrame);
						$Board.push(this.createTut('tut', (s+1), sBoardNum+":", sBoardName, aType));
					}
				}
				
				if(this.sSectionTitle != "TUT"){
					var $section 		= this.createSection(sID, sNum + ":" , sTitle, this.getTotalTime(aBoard.totalTime));
				}else{
					var $section 		= this.createTutorials(sID, sNum + ":" , sTitle);					
				}
				oSection.totalTime  = aBoard.totalTime;
				
				aSection.push($section);
				var $boardHolder = $('<div class="board-container" style="display:none;"></div>');//$section.append($Board)
				$boardHolder.attr('id', 'board_container_'+$section.attr('id'))
				$boardHolder.append($Board);
				aSection.push($boardHolder);
			}
			this.$panel.append(aSection);
//			AbstractComponent.prototype.init.call(this, "menu", p_oConfig, p_$xmlComponent);
		}; 
		
		Accordion.prototype.getBoardByID								= function(p_sID) {
			for (var i=0; i < this.aChap.Boardlength; i++) {
				var oSection 	= this.aChap[i],
				aBoard			= (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] :[oSection[this.sSectionTitle]];
				for (var s=0; s < aBoard.length; s++) {
				  	if(aBoard[s]._ID === p_sID){
				  		return aBoard[s]; 
				  	}
			  }
			};
			return null;
		};
		
		Accordion.prototype.getBoardByName								= function(p_sName) {
			for (var i=0; i < this.aChap.length; i++) {
				var oSection 	= this.aChap[i],
				aBoard			= (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] :[oSection[this.sSectionTitle]];
				for (var s=0; s < aBoard.length; s++) {
				  	if(aBoard[s]._BoardName === p_sName){
				  		return aBoard[s]; 
				  	}
			  }
			};
			return null;
		};
		
		Accordion.prototype.getSectionTitle								= function() {
			return this.sSectionTitle;
		};
		Accordion.prototype.getBoardAtSection								= function(p_nIndex) {
			for (var i=0; i < this.aChap.Boardlength; i++) {
				var oSection 	= this.aChap[i],
				aBoard			= (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] :[oSection[this.sSectionTitle]];
				if(p_nIndex < (aBoard.length -1) ){
					return aBoard[p_nIndex];
				}
			};
			return null;
		};
		
		
		Accordion.prototype.getTotalTime								= function(frames) {
			var sec = 0 ,min = 0,hr = 0, txt_hr='',txt_min='', txt_sec='';
			var sec = (frames / this.fps);
			if(sec>59){
				min	= Math.floor(sec /60);
				sec = Math.floor(sec % 60);
			}
			if(min > 59){
				hr 	= Math.floor(min /60);				
				min = Math.floor(min % 60);
			}
			
//			sec = (frames > 60) ? Math.floor((frames / this.fps) %  60) : 0; 
			
			if(hr > 0)
			txt_hr = (hr < 10 ) ? "0"+ hr+':' : hr+':';				
			
			//if(hr > 0 || min > 0)
			txt_min = (min < 10 ) ? "0"+ min+':' : min+':';
			
			var txt_sec = (sec < 10 ) ? "0"+ sec : sec;
			
			return txt_hr+txt_min+txt_sec;
				
		};
		
		Accordion.prototype.createSection								= function(p_sID, p_sNum, p_sName, p_sTime) {
			var oScope = this,
			$elem = $("<div></div>"),
			sText =	 '<span class="acc-board-icon"></span><span class="acc-chap-num">'+p_sNum+' </span><span class="acc-chap-title">'+p_sName+'</span><span class="acc-chap-time">'+p_sTime+'</span>';
			
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
		
		Accordion.prototype.createBoard								= function(p_sSectionID, p_sBoardID, p_sNum, p_sBoardName, p_aType, p_sTime, b_showType) {
			var oScope = this,
			str = 	'<div id="board_'+p_sSectionID+'_'+p_sBoardID+'" class="acc-board">'+
						'<span class="acc-board-num">'+p_sNum+' </span>'+
						'<span class="acc-board-title">'+p_sBoardName+'</span>'+
						'<span class="acc-board-time-container">'+
							'<div class="acc-board-time">'+p_sTime+'</div>'+
							'<div class="type-container hide">'+
								'<span class="DEF board-type"></span>'+
								'<span class="DIA board-type"></span>'+
								'<span class="DER board-type"></span>'+
								'<span class="APP board-type"></span>'+
							'</div>'+
						'</span>'+
						'</div>';
		
			var $elem = $(str);	
			if(b_showType){
				$elem.find('.type-container').removeClass('hide');
				for(var i = 0; i< p_aType.length;i++){
					$elem.find('.'+p_aType[i]).addClass('active')
				}
			}
			
			$elem.click(function(e){
				if(e.preventDefault){
					e.preventDefault();
				};
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
				if(e.preventDefault){
					e.preventDefault();				}
				oScope.onBoardClicked(e);	
			});
			
			return $elem;
		};
		
		Accordion.prototype.onSectionClicked							= function(e) {
			var $target 	= $(e.currentTarget);
			var sID 		= $target.attr('id');
			var $Board		= this.$panel.find('#'+'board_container_'+sID);
			
			this.$panel.find('.acc-chap.btn').removeClass('selected');
			if($target.hasClass('open')){
				$Board.slideUp();
				$target.removeClass('open').addClass('selected');
				return;
			}
			//this.$panel.find('.board-container').slideUp().slideUp('fast');//.addClass('hide');
			$target.addClass('open selected');
			$Board.slideDown();
			
			
		};
		Accordion.prototype.getPageList								= function() {
			if(!this.oBoard )return null;		
			var aPages = [];
			if(this.sSectionTitle == "Board"){
				aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
			}else if(this.sSectionTitle == "TUT"){
				aPages = [this.oBoard];
			}
					
			return aPages;
		};
		Accordion.prototype.getPageByType								= function(p_sType) {
			if(!this.oBoard )return null;
			if(this.sSectionTitle == "Board"){
				aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
				for (var i=0; i < aPages.length; i++) {
				  if( aPages[i]._Type == p_sType){
				  	return aPages[i];
				  }
				};
			}
			
			return null;
		};
		Accordion.prototype.getPageTypeList								= function(p_sType) {
			if(!this.oBoard )return null;
			var aPages = [],
			result = [];
			if(this.sSectionTitle == "Board"){
				aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
				for (var i=0; i < aPages.length; i++) {
					result.push(aPages[i]._Type)
				};
			}
			
			return result;
		}
		Accordion.prototype.getChapCount								= function(p_sType) {
			return this.aChap.length	
		}
		Accordion.prototype.getBoardCount								= function(p_sType) {
			return	this.aBoards.length;
		};
		Accordion.prototype.getTotalPageCount								= function(p_sType) {
			if(this.sSectionTitle == "Board"){
				return	this.aPages.length;
			}else if(this.sSectionTitle == "TUT"){
				return	this.aBoards.length;
			}
			
			return 0;	
		};
		Accordion.prototype.onBoardClicked								= function(e) {
			var $target 	= $(e.currentTarget),
			sID 			= $target.attr('id'),
			sName 			= $target.find('.acc-board-title').text();
			if($target.hasClass('selected'))return;
			this.$panel.find('.acc-board').removeClass('selected');
			
			$target.addClass('selected');
			this.oBoard 	= this.getBoardByName(sName);
			
			this.dispatchEvent('BOARD_SELECTED', {target:this, type:'BOARD_SELECTED', board:this.oBoard});
		}
		Accordion.prototype.onTutorialClicked								= function(e) {
			var $target 	= $(e.currentTarget),
			sID 			= $target.attr('id'),
			sName 			= $target.find('.acc-board-title').text(),
			oBoard 			= this.getBoardByName(sName);
			
			this.dispatchEvent('BOARD_SELECTED', {target:this, type:'BOARD_SELECTED', board:oBoard});
		}
		Accordion.prototype.bindHandlers								= function() {
			//JSON.stringify('\n \t oCompConfig = '+p_oConfig);	
			
		};
		
		Accordion.prototype.getTotalClockTime						= function() {
			var result  = 0;
			for (var i=0; i < this.aChap.length; i++) {
			  result += this.aChap[i].totalTime;
			};
			return this.getTotalTime(result);
		}
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
