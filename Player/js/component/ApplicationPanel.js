define([
    'component/AbstractComponent',
    'util/StringUtil',
    'util/LoaderUtil',
    'util/MessageLogger'
], function(AbstractComponent, StringUtil, LoaderUtil, Logger) {

    function ApplicationPanel() {
        //console.log('ApplicationPanel.CONSTRUCTOR() ');
        AbstractComponent.call(this);

		this.bApplicationPanelVisible = true;
		this.bApplicationPanelEnabled = true;

        return this;
    }

    ApplicationPanel.prototype									= Object.create(AbstractComponent.prototype);
    ApplicationPanel.prototype.constructor						= ApplicationPanel;

    ApplicationPanel.prototype.getComponentConfig					= function() {
		//console.log('ApplicationPanel.getComponentConfig() | ');
		return {
			/*TODO: Implement any default configurations*/
		};
	};
    ApplicationPanel.prototype.init								= function(p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('ApplicationPanel.init() | p_sID = ' + p_sID + ' : p_oConfig = ' + JSON.stringify(p_oConfig)+' : p_$xmlComponent = '+p_$xmlComponent[0]);
		AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
    };
    ApplicationPanel.prototype.createComponent					= function(){
		//console.log('ApplicationPanel.createComponent() | '+this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view);
	    var oScope = this,
			oLoaderUtil = new LoaderUtil();
	    oLoaderUtil.loadResource([this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view], function(data){
	        onViewLoaded.call(oScope, data);
	    });
	};
	function onViewLoaded(data){
        this.$component.append(data[0]);
        if(this.$xmlData.item){
            if(this.$xmlData.item.length === undefined){
                this.$xmlData.item = [this.$xmlData.item];
            }
            var aItems = this.$xmlData.item,
                i;

            for(i=0; i<aItems.length; i++){
                this.bindHandlers(aItems[i]);
            }
        }
        this.initialize();
        this.dispatchComponentLoadedEvent();
	}
	ApplicationPanel.prototype.addAriaRoles						= function(p_sType, p_$elem, p_sText, xmlNode, p_bAvailable){
		//console.log('ApplicationPanel.addAriaRoles() | ');
		if (p_sType === 'button') {
            p_$elem.attr({
            	'aria-role': 'button',
                'role': 'button',
                'data-available': p_bAvailable,
                'aria-labelledby': p_sText/*,
				'aria-hidden': 'true'*/
            });
        }
	};
	ApplicationPanel.prototype.bindHandlers						= function(p_oItem){
		var oItem = p_oItem,
            sItemId = oItem._id,
            sItemType = oItem._type.toUpperCase(),
            bItemAvailable = StringUtil.sanitizeValue(oItem._available),
            $elem = this.$component.find('#'+sItemId);
		//console.log('ApplicationPanel.bindHandlers() | \n\t'+ sItemType+ '\n\tsItemId = '+sItemId+'\n\tIs Available = '+bItemAvailable);
        if(!bItemAvailable){
            $elem.addClass('hide');
			return;
        }
		var oScope	= this
		$elem.on('click', function(e) {
			if($(this).hasClass('disabled')){return;}
			oScope.dispatchEvent('APPLICATION_PANEL_BUTTON_CLICK', {
				target: oScope, 
				type: 'APPLICATION_PANEL_BUTTON_CLICK',
				button: this
			});
		});
	};
	ApplicationPanel.prototype.unbindHandlers						= function(p_oItem){
		var oItem = p_oItem,
            sItemId = oItem._id,
			sItemType = oItem._type.toUpperCase(),
            $elem = this.$component.find('#'+sItemId);
		//console.log('ApplicationPanel.bindHandlers() | \n\tsItemId = '+sItemId);
		$elem.off();
	};
	ApplicationPanel.prototype.initialize							= function(p_sType, p_sID, p_$elem, xmlNode){
		//console.log('ApplicationPanel.initialize() | ');
	};
    
	ApplicationPanel.prototype.show								= function(p_bShow) {
        //console.log('ApplicationPanel.showApplicationPanel() | Panel Hidden = ' + this.$component.hasClass('hide') + ' : Event Type = ' + e.type);
		//console.log('ApplicationPanel.showApplicationPanel() | Show = '+p_bShow);
		if(this.bApplicationPanelVisible === p_bShow){return;}
		if(p_bShow){
			this.$component.removeClass('hide');
		}else{
			this.$component.addClass('hide');
		}
		this.bApplicationPanelVisible = p_bShow;
    };
	ApplicationPanel.prototype.enable							= function(p_bEnable) {
		if(this.bApplicationPanelEnabled === p_bEnable){return;}
		var aButtons = this.$component.find('button.ui-app-panel-btn'),
			i;
        if (p_bEnable) {
			for(i=0; i<aButtons.length; i++){
				$(aButtons[i]).removeClass('disabled');
			}
        } else {
            for(i=0; i<aButtons.length; i++){
				$(aButtons[i]).addClass('disabled');
			}
        }
		this.bApplicationPanelEnabled = p_bEnable;
    };
	ApplicationPanel.prototype.setSelected						= function(p_sBtnId, p_bSelected) {
		var aButtons = this.$component.find('button.ui-app-panel-btn'),
			aButton = this.$component.find('button#'+p_sBtnId+'.ui-app-panel-btn'),
			i;
		for(i=0; i<aButtons.length; i++){
			$(aButtons[i]).removeClass('selected');
		}
		if(p_bSelected){
			$(aButton[0]).addClass('selected');
		}else{
			$(aButton[0]).removeClass('selected');
		}
	}
	
    ApplicationPanel.prototype.destroy							= function() {
		if(this.$xmlData.item){
            if(this.$xmlData.item.length === undefined){this.$xmlData.item = [this.$xmlData.item];}
            var aItems = this.$xmlData.item,
                i;
			try{
            for(i=0; i<aItems.length; i++){
                this.unbindHandlers(aItems[i]);
            }
			}catch(e){}
        }

		this.bApplicationPanelVisible = null;
		this.bApplicationPanelEnabled = null;

		this.prototype			= null;

		AbstractComponent.prototype.destroy.call(this);
    };
    ApplicationPanel.prototype.toString							= function() {
		return 'component/ApplicationPanel';
	};

    return ApplicationPanel;
});