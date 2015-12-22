define([
    'component/AbstractComponent',
    'util/LoaderUtil'
], function(AbstractComponent, LoaderUtil) {

    function DerivationPanelStatic() {
        //console.log('DerivationPanelStatic.CONSTRUCTOR() ');
        AbstractComponent.call(this);

		this.bDerivationPanelStaticVisible = true;

        return this;
    }

    DerivationPanelStatic.prototype									= Object.create(AbstractComponent.prototype);
    DerivationPanelStatic.prototype.constructor						= DerivationPanelStatic;

    DerivationPanelStatic.prototype.getComponentConfig					= function() {
		//console.log('DerivationPanelStatic.getComponentConfig() | ');
		return {
			/*TODO: Implement any default configurations*/
		};
	};
    DerivationPanelStatic.prototype.init								= function(p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('DerivationPanelStatic.init() | p_sID = ' + p_sID + ' : p_oConfig = ' + JSON.stringify(p_oConfig)+' : p_$xmlComponent = '+p_$xmlComponent[0]);
		AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
    };
    DerivationPanelStatic.prototype.createComponent					= function(){
		//console.log('DerivationPanelStatic.createComponent() | '+this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view);
	    var oScope = this,
			oLoaderUtil = new LoaderUtil();
	    oLoaderUtil.loadResource([this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view], function(data){
	        onViewLoaded.call(oScope, data);
	    });
	};
	function onViewLoaded(data){
        this.$component.append(data[0]);
        this.dispatchComponentLoadedEvent();
	}
    
	DerivationPanelStatic.prototype.show								= function(p_bShow) {
        //console.log('DerivationPanelStatic.showDerivationPanelStatic() | Panel Hidden = ' + this.$component.hasClass('hide') + ' : Event Type = ' + e.type);
		//console.log('DerivationPanelStatic.showDerivationPanelStatic() | Show = '+p_bShow);
		if(this.bDerivationPanelStaticVisible === p_bShow){return;}
		if(p_bShow){
			this.$component.removeClass('hide');
		}else{
			this.$component.addClass('hide');
		}
		this.bDerivationPanelStaticVisible = p_bShow;
    };
	
    DerivationPanelStatic.prototype.destroy							= function() {
		this.bDerivationPanelStaticVisible = null;

		this.prototype			= null;

		AbstractComponent.prototype.destroy.call(this);
    };
    DerivationPanelStatic.prototype.toString							= function() {
		return 'component/DerivationPanelStatic';
	};

    return DerivationPanelStatic;
});