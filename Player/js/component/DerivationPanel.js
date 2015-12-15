define([
    'component/AbstractComponent',
    'util/StringUtil',
    'util/LoaderUtil',
    'util/MessageLogger'
], function(AbstractComponent, StringUtil, LoaderUtil, Logger) {

    function DerivationPanel() {
        //console.log('DerivationPanel.CONSTRUCTOR() ');
        AbstractComponent.call(this);

		this.bDerivationPanelVisible = true;
		this.bDerivationPanelEnabled = true;

        return this;
    }

    DerivationPanel.prototype									= Object.create(AbstractComponent.prototype);
    DerivationPanel.prototype.constructor						= DerivationPanel;

    DerivationPanel.prototype.getComponentConfig					= function() {
		//console.log('DerivationPanel.getComponentConfig() | ');
		return {
			/*TODO: Implement any default configurations*/
		};
	};
    DerivationPanel.prototype.init								= function(p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('DerivationPanel.init() | p_sID = ' + p_sID + ' : p_oConfig = ' + JSON.stringify(p_oConfig)+' : p_$xmlComponent = '+p_$xmlComponent[0]);
		AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
    };
    DerivationPanel.prototype.createComponent					= function(){
		//console.log('DerivationPanel.createComponent() | '+this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view);
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
	DerivationPanel.prototype.addAriaRoles						= function(p_sType, p_$elem, p_sText, xmlNode, p_bAvailable){
		//console.log('DerivationPanel.addAriaRoles() | ');
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
	DerivationPanel.prototype.bindHandlers						= function(p_oItem){
		var oItem = p_oItem,
            sItemId = oItem._id,
            sItemType = oItem._type.toUpperCase(),
            bItemAvailable = StringUtil.sanitizeValue(oItem._available),
            $elem = this.$component.find('#'+sItemId);
		//console.log('DerivationPanel.bindHandlers() | \n\t'+ sItemType+ '\n\tsItemId = '+sItemId+'\n\tIs Available = '+bItemAvailable);
        if(!bItemAvailable){
            $elem.addClass('hide');
			return;
        }
		var oScope	= this
		$elem.on('click', function(e) {
			if($(this).hasClass('disabled')){return;}
			oScope.dispatchEvent('DERIVATION_PANEL_BUTTON_CLICK', {
				target: oScope, 
				type: 'DERIVATION_PANEL_BUTTON_CLICK',
				button: this
			});
		});
	};
	DerivationPanel.prototype.unbindHandlers						= function(p_oItem){
		var oItem = p_oItem,
            sItemId = oItem._id,
			sItemType = oItem._type.toUpperCase(),
            $elem = this.$component.find('#'+sItemId);
		//console.log('DerivationPanel.bindHandlers() | \n\tsItemId = '+sItemId);
		$elem.off();
	};
	DerivationPanel.prototype.initialize							= function(p_sType, p_sID, p_$elem, xmlNode){
		//console.log('DerivationPanel.initialize() | ');
	};
    
	DerivationPanel.prototype.show								= function(p_bShow) {
        //console.log('DerivationPanel.showDerivationPanel() | Panel Hidden = ' + this.$component.hasClass('hide') + ' : Event Type = ' + e.type);
		//console.log('DerivationPanel.showDerivationPanel() | Show = '+p_bShow);
		if(this.bDerivationPanelVisible === p_bShow){return;}
		if(p_bShow){
			this.$component.removeClass('hide');
		}else{
			this.$component.addClass('hide');
		}
		this.bDerivationPanelVisible = p_bShow;
    };
	DerivationPanel.prototype.enable							= function(p_bEnable) {
		if(this.bDerivationPanelEnabled === p_bEnable){return;}
		var aButtons = this.$component.find('button.ui-der-panel-btn'),
			i;
        if (p_bEnable) {
			for(i=0; i<aButtons.length; i++){
				$(aButtons[i]).removeClass('disbled');
			}
        } else {
            for(i=0; i<aButtons.length; i++){
				$(aButtons[i]).addClass('disbled');
			}
        }
		this.bDerivationPanelEnabled = p_bEnable;
    };
	
    DerivationPanel.prototype.destroy							= function() {
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

		this.bDerivationPanelVisible = null;
		this.bDerivationPanelEnabled = null;

		this.prototype			= null;

		AbstractComponent.prototype.destroy.call(this);
    };
    DerivationPanel.prototype.toString							= function() {
		return 'component/DerivationPanel';
	};

    return DerivationPanel;
});