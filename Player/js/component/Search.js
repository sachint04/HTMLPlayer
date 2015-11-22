define([
	'jquery', 
	'component/AbstractComponent', 
	'util/EventDispatcher'
], function($, AbstractComponent, EventDispatcher) {

	var Search = function() {
		AbstractComponent.call(this);
		this.$panel = null;
		this.$go = null;
		this.oConfig = null;
		this.aChap = null;
		this.oBoard = null;
		this.aBoards = [];
		this.aPages = [];
		this.fps = 20;
		this.sSectionTitle
		this._selectedPageIndex

		this.onBoardClicked = this.onBoardClicked.bind(this);
		return this;
	};

	Search.prototype = Object.create(AbstractComponent.prototype);
	Search.prototype.constructor = Search;

	Search.prototype.init = function(p_$panel, p_oConfig, oData, sSectionName) {
		this.$panel = p_$panel;
		this.$searchField = this.$panel.find('#input_search');
		this.$go = this.$panel.find('#btn_search');
		this.$searchResults = this.$panel.find('#search_results_container');
		this.aChap = (oData.length != undefined) ? oData : [oData];
		this.oConfig = p_oConfig;
		this.sSectionTitle = sSectionName;
		var oScope = this;
		this.$go.on('click', function(){
			oScope.searchChapter(oScope.$searchField.val());
		});
		/*var aSection = [];
		for (var i = 0; i < this.aChap.length; i++) {
			var oSection = this.aChap[i], sID = oSection._ID, sTitle = oSection._ChapName || oSection._TutName, sNum = (i < 9) ? "0" + (i + 1) : (i + 1), nTotalTime = 0, aBoard = (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] : [oSection[this.sSectionTitle]], $Board = [];
			aBoard.totalTime = 0;
			for (var s = 0; s < aBoard.length; s++) {
				var oBoard = aBoard[s], sBoardID = oBoard._ID, sBoardName = oBoard._BoardName, sBoardType = oBoard._Type, nTime = 0, sBoardNum = (aBoard.length > 9 && s < 9) ? "0" + (s + 1) : (s + 1), aType = [];
				this.aBoards.push(oBoard);
				if (this.sSectionTitle != "TUT") {
					var aTarget = (oBoard.Target.length != undefined) ? oBoard.Target : [oBoard.Target];
					for (var n = 0; n < aTarget.length; n++) {
						var oTarget = aTarget[n];
						if (oTarget._Type.toUpperCase() != "QUIZ") {
							this.aPages.push(oTarget);
						}
						nTime += Number(oTarget._TotalFrame);

						if (aType.indexOf(oTarget._Type) < 0) {
							aType.push(oTarget._Type);
						}
					}
					aBoard.totalTime += nTime;
					var bShowType = (oBoard._Type == "Normal");
					$Board.push(this.createBoard(sID, (s + 1), sBoardNum + ".", sBoardName, aType, this.getTotalTime(nTime), bShowType));
				} else {
					aBoard.totalTime += Number(oBoard._TotalFrame);
					$Board.push(this.createTut('tut', (s + 1), sBoardNum + ":", sBoardName, aType));
				}
			}

			if (this.sSectionTitle != "TUT") {
				var $section = this.createSection(sID, sNum + ":", sTitle, this.getTotalTime(aBoard.totalTime));
			} else {
				var $section = this.createTutorials(sID, sNum + ":", sTitle);
			}
			oSection.totalTime = aBoard.totalTime;

			aSection.push($section);
			var $boardHolder = $('<div class="board-container" style="display:none;"></div>');
			//$section.append($Board)
			$boardHolder.attr('id', 'board_container_' + $section.attr('id'))
			$boardHolder.append($Board);
			aSection.push($boardHolder);
		}
		this.$panel.append(aSection);*/
		//			AbstractComponent.prototype.init.call(this, "menu", p_oConfig, p_$xmlComponent);
	};
	
	Search.prototype.searchChapter = function(p_sSearchTerm){
		if(p_sSearchTerm === null || p_sSearchTerm === undefined || p_sSearchTerm === ''){return;}
		var nNoOfChapters = this.aChap.length,
			sChappetrName,
			aChapterList,
			nMatchFound = 0,
			
			aBoardPointer,
			nNoOfBoards,
			aBoardList,
			sBoardTitle,
			
			$section,
			aSearchResults = [],
			i;
		for(i=0; i<nNoOfChapters; i++){
			// Search in "Chap -> ChapName"
			sChappetrName = this.aChap[i]._ChapName;
			aChapterList = sChappetrName.match(new RegExp(p_sSearchTerm,"gi"));
			if(aChapterList !== null && aChapterList.length > 0){
				// Match found. List all  Boards within this Chapter
				var oResult = this.searchBoard(this.aChap[i], null, nMatchFound);
			}else{
				// Match NOT found. Search in "Chap -> Board -> BoardName"
				var oResult = this.searchBoard(this.aChap[i], p_sSearchTerm, nMatchFound);
			}
			aSearchResults = aSearchResults.concat(oResult.result);
			nMatchFound = oResult.count;
		}
		this.$searchResults.empty().append(aSearchResults);
	}
	Search.prototype.searchBoard = function(p_oChapterPointer, p_sSearchTerm, p_nNumIndex){
		var aBoards = (p_oChapterPointer.Board.length !== undefined) ? p_oChapterPointer.Board : [p_oChapterPointer.Board],
			sChapterID = p_oChapterPointer._ID,
			nNoOfBoards = aBoards.length,
			oBoardPointer,
			nNum = p_nNumIndex,
			sNumIndex,
			aSearchResults = [],
			aBoardList,
			sBoardName,
			oBoardInfo,
			bIsBoardTypeNormal,
			bMatchFound,
			$section;
		
		for(j=0; j<nNoOfBoards; j++){
			oBoardPointer = aBoards[j];
			sBoardName = oBoardPointer._BoardName;
			bIsBoardTypeNormal = (oBoardPointer._Type.toLowerCase() === "normal") ? true : false;
			if(p_sSearchTerm){
				aBoardList = sBoardName.match(new RegExp(p_sSearchTerm,"gi"));
				bMatchFound = (bIsBoardTypeNormal && aBoardList !== null && aBoardList.length > 0) ? true : false;
			}else{
				bMatchFound = (bIsBoardTypeNormal) ? true : false;
			}
			if(bMatchFound){
				sNumIndex = (nNum < 9) ? "0" + (nNum + 1) : (nNum + 1);
				oBoardInfo = this.getBoardInfo(oBoardPointer);
				$board = this.createBoard(sChapterID, (j + 1), sNumIndex + ":", sBoardName, oBoardInfo.type, oBoardInfo.time, bIsBoardTypeNormal);
				aSearchResults.push($board);
				nNum++;
			}
		}
		return {
			result: aSearchResults,
			count: nNum--
		};
	}
	/*
	* @Return: An object with "time" (Board Times) and "type" (Board Types)
	*/
	Search.prototype.getBoardInfo = function(p_oBoard){
		var aBoardTarget = (p_oBoard.Target.length !== undefined) ? p_oBoard.Target : [p_oBoard.Target],
			nNoOfBoardTargets = aBoardTarget.length,
			oBoardTargetPointer,
			nFlashFrames = 0,
			aType = [],
			i;
			
		for(i=0; i<nNoOfBoardTargets; i++){
			oBoardTargetPointer = aBoardTarget[i];
			nFlashFrames += Number(oBoardTargetPointer._TotalFrame);
			if (aType.indexOf(oBoardTargetPointer._Type) < 0) {
				aType.push(oBoardTargetPointer._Type);
			}
		}
		
		return {
			time: this.getTotalTime(nFlashFrames),
			type: aType
		};
	}

	Search.prototype.getBoardByID = function(p_sID) {
		for (var i = 0; i < this.aChap.Boardlength; i++) {
			var oSection = this.aChap[i], 
				aBoard = (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] : [oSection[this.sSectionTitle]];
			for (var s = 0; s < aBoard.length; s++) {
				if (aBoard[s]._ID === p_sID) {
					return aBoard[s];
				}
			}
		};
		return null;
	};

	Search.prototype.getBoardByName = function(p_sName) {
		for (var i = 0; i < this.aChap.length; i++) {
			var oSection = this.aChap[i], aBoard = (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] : [oSection[this.sSectionTitle]];
			for (var s = 0; s < aBoard.length; s++) {
				if (aBoard[s]._BoardName === p_sName) {
					return aBoard[s];
				}
			}
		};
		return null;
	};

	Search.prototype.getSectionTitle = function() {
		return this.sSectionTitle;
	};

	Search.prototype.getBoardAtIndex = function(p_nIndex) {
		for (var i = 0; i < this.aChap.Boardlength; i++) {
			var oSection = this.aChap[i], aBoard = (oSection[this.sSectionTitle].length != undefined) ? oSection[this.sSectionTitle] : [oSection[this.sSectionTitle]];
			if (p_nIndex < (aBoard.length - 1)) {
				return aBoard[p_nIndex];
			}
		};
		return null;
	};

	Search.prototype.getTotalTime = function(frames) {
		var sec = 0, min = 0, hr = 0, txt_hr = '', txt_min = '', txt_sec = '';
		var sec = (frames / this.fps);
		if (sec > 59) {
			min = Math.floor(sec / 60);
			sec = Math.floor(sec % 60);
		}
		if (min > 59) {
			hr = Math.floor(min / 60);
			min = Math.floor(min % 60);
		}

		//			sec = (frames > 60) ? Math.floor((frames / this.fps) %  60) : 0;

		if (hr > 0)
			txt_hr = (hr < 10 ) ? "0" + hr + ':' : hr + ':';

		//if(hr > 0 || min > 0)
		txt_min = (min < 10 ) ? "0" + min + ':' : min + ':';

		var txt_sec = (sec < 10 ) ? "0" + sec : sec;

		return txt_hr + txt_min + txt_sec;

	};

	Search.prototype.createSection = function(p_sID, p_sNum, p_sName, p_sTime) {
		var oScope = this, $elem = $("<div></div>"), sText = '<span class="acc-board-icon"></span><span class="acc-chap-num">' + p_sNum + ' </span><span class="acc-chap-title">' + p_sName + '</span><span class="acc-chap-time">' + p_sTime + '</span>';

		$elem.attr({
			"id" : p_sID,
		}).addClass('acc-chap btn').html(sText);
		$elem.click(function(e) {
			//		e.prevetDefault();
			oScope.onSectionClicked(e)
		});
		return $elem;
	};

	Search.prototype.createTutorials = function(p_sID, p_sNum, p_sName) {
		var oScope = this, $elem = $("<div></div>"), sText = '<span class="acc-chap-num">' + p_sNum + ' </span><span class="acc-chap-title">' + p_sName + '</span>';

		$elem.attr({
			"id" : p_sID,
		}).addClass('acc-chap btn').html(sText);
		$elem.click(function(e) {
			oScope.onSectionClicked(e)
		});
		return $elem;
	};

	Search.prototype.createBoard = function(p_sSectionID, p_sBoardID, p_sNum, p_sBoardName, p_aType, p_sTime, b_showType) {
		var oScope = this, str = '<div id="board_' + p_sSectionID + '_' + p_sBoardID + '" class="acc-board">' + '<span class="acc-board-num">' + p_sNum + ' </span>' + '<span class="acc-board-title">' + p_sBoardName + '</span>' + '<span class="acc-board-time-container">' + '<div class="acc-board-time">' + p_sTime + '</div>' + '<div class="type-container hide">' + '<span class="DEF board-type"></span>' + '<span class="DIA board-type"></span>' + '<span class="DER board-type"></span>' + '<span class="APP board-type"></span>' + '</div>' + '</span>' + '</div>';

		var $elem = $(str);
		if (b_showType) {
			$elem.find('.type-container').removeClass('hide');
			for (var i = 0; i < p_aType.length; i++) {
				$elem.find('.' + p_aType[i]).addClass('active')
			}
		}

		$elem.click(function(e) {
			if (e.preventDefault) {
				e.preventDefault();
			};
			oScope.onBoardClicked(e)
		});
		return $elem;
	};

	Search.prototype.createTut = function(p_sSectionID, p_sBoardID, p_sNum, p_sBoardName) {
		var oScope = this, str = '<div id="board_' + p_sSectionID + '_' + p_sBoardID + '" class="acc-board">' + '<span class="acc-board-num">' + p_sNum + ' </span>' + '<span class="acc-board-title">' + p_sBoardName + '</span>' + '<span class="DEF"><span>' + '<span class="DIA"><span>' + '<span class="DER"><span>' + '<span class="APP"><span>' + '</div>';

		var $elem = $(str);

		$elem.click(function(e) {
			if (e.preventDefault) {
				e.preventDefault();
			}
			oScope.onBoardClicked(e);
		});

		return $elem;
	};

	Search.prototype.onSectionClicked = function(e) {
		var $target = $(e.currentTarget);
		var sID = $target.attr('id');
		var $Board = this.$panel.find('#' + 'board_container_' + sID);

		this.$panel.find('.acc-chap.btn').removeClass('selected');
		if ($target.hasClass('open')) {
			$Board.slideUp();
			$target.removeClass('open').addClass('selected');
			return;
		}
		//this.$panel.find('.board-container').slideUp().slideUp('fast');//.addClass('hide');
		this._selectedPageIndex = null;
		this.oBoard = null;
		$target.addClass('open selected');
		$Board.slideDown();

		this.dispatchEvent('SECTION_SELECTED', {
			target : this,
			type : 'SECTION_SELECTED',
			sectionid : sID
		});

	};

	Search.prototype.onBoardClicked = function(e) {
		var $target = $(e.currentTarget), sID = $target.attr('id'), sName = $target.find('.acc-board-title').text();
		if ($target.hasClass('selected'))
			return;
		this.$panel.find('.acc-board').removeClass('selected');

		$target.addClass('selected');
		this.oBoard = this.getBoardByName(sName);

		this.dispatchEvent('BOARD_SELECTED', {
			target : this,
			type : 'BOARD_SELECTED',
			board : this.oBoard
		});
	}

	Search.prototype.getPageList = function() {
		if (!this.oBoard)
			return null;
		var aPages = [];
		if (this.sSectionTitle == "Board") {
			aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
		} else if (this.sSectionTitle == "TUT") {
			aPages = [this.oBoard];
		}

		return aPages;
	};

	Search.prototype.setSelectedPage = function(p_oTarget) {
		if (!this.oBoard)
			return null;
			
		if (this.sSectionTitle == "Board") {
			var aTarget = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
			for (var i = 0; i < aTarget.length; i++) {
				var oTarget = aTarget[i];
				if (p_oTarget._ID === oTarget._ID) {
					this._selectedPageIndex = i;
					break;
				}
			};
		}else{
			this._selectedPageIndex = 0;
		}
	};

	Search.prototype.getSelectedPageIndex = function() {
		return this._selectedPageIndex;
	};

	Search.prototype.getCurrentPage = function() {
		if (!this.oBoard)
			return null;
		var oPage = null;
		if (this.sSectionTitle == "Board") {
			var aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
			oPage = aPages[this._selectedPageIndex];
		} else if (this.sSectionTitle == "TUT") {
			oPage = this.oBoard;
		}

		return oPage;
	};

	Search.prototype.getPageByType = function(p_sType) {
		if (!this.oBoard)
			return null;
		if (this.sSectionTitle == "Board") {
			aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
			for (var i = 0; i < aPages.length; i++) {
				if (aPages[i]._Type == p_sType) {
					return aPages[i];
				}
			};
		}

		return null;
	};

	Search.prototype.getPageTypeList = function(p_sType) {
		if (!this.oBoard)
			return null;
		var aPages = [], result = [];
		if (this.sSectionTitle == "Board") {
			aPages = (this.oBoard.Target.length != undefined) ? this.oBoard.Target : [this.oBoard.Target];
			for (var i = 0; i < aPages.length; i++) {
				result.push(aPages[i]._Type)
			};
		}

		return result;
	}

	Search.prototype.getChapCount = function(p_sType) {
		return this.aChap.length
	}

	Search.prototype.getBoardCount = function(p_sType) {
		return this.aBoards.length;
	};
	Search.prototype.getBoardName = function(p_sType) {
		if (!this.oBoard)
			return null;
		return this.oBoard._BoardName;
	};

	Search.prototype.getTotalPageCount = function(p_sType) {
		if (this.sSectionTitle == "Board") {
			return this.aPages.length;
		} else if (this.sSectionTitle == "TUT") {
			return this.aBoards.length;
		}

		return 0;
	};

	Search.prototype.onTutorialClicked = function(e) {
		var $target = $(e.currentTarget), sID = $target.attr('id'), sName = $target.find('.acc-board-title').text(), oBoard = this.getBoardByName(sName);

		this.dispatchEvent('BOARD_SELECTED', {
			target : this,
			type : 'BOARD_SELECTED',
			board : oBoard
		});
	}

	Search.prototype.bindHandlers = function() {
		//JSON.stringify('\n \t oCompConfig = '+p_oConfig);

	};

	Search.prototype.getTotalClockTime = function() {
		var result = 0;
		for (var i = 0; i < this.aChap.length; i++) {
			result += this.aChap[i].totalTime;
		};
		return this.getTotalTime(result);
	}

	Search.prototype.initialize = function() {
		var oScope = this;

		AbstractComponent.prototype.dispatchComponentLoadedEvent.call(this);
	};

	Search.prototype.getComponentConfig = function() {
		return {};
	};

	Search.prototype.destroy = function() {

		AbstractComponent.prototype.destroy.call(this);
	};
	return Search;
});
