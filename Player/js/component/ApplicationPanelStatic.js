define([
    'component/AbstractComponent',
    'util/LoaderUtil'
], function(AbstractComponent, LoaderUtil) {

    function ApplicationPanelStatic() {
        //console.log('ApplicationPanelStatic.CONSTRUCTOR() ');
        AbstractComponent.call(this);

		this.bApplicationPanelStaticVisible = true;

        return this;
    }

    ApplicationPanelStatic.prototype									= Object.create(AbstractComponent.prototype);
    ApplicationPanelStatic.prototype.constructor						= ApplicationPanelStatic;

    ApplicationPanelStatic.prototype.getComponentConfig					= function() {
		//console.log('ApplicationPanelStatic.getComponentConfig() | ');
		return {
			/*TODO: Implement any default configurations*/
		};
	};
    ApplicationPanelStatic.prototype.init								= function(p_sID, p_oConfig, p_$xmlComponent) {
        //console.log('ApplicationPanelStatic.init() | p_sID = ' + p_sID + ' : p_oConfig = ' + JSON.stringify(p_oConfig)+' : p_$xmlComponent = '+p_$xmlComponent[0]);
		AbstractComponent.prototype.init.call(this, p_sID, p_oConfig, p_$xmlComponent);
    };
    ApplicationPanelStatic.prototype.createComponent					= function(){
		//console.log('ApplicationPanelStatic.createComponent() | '+this.getLocation(this.$xmlData._viewLocation) + this.$xmlData._view);
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
    
	ApplicationPanelStatic.prototype.show								= function(p_bShow) {
        //console.log('ApplicationPanelStatic.showApplicationPanelStatic() | Panel Hidden = ' + this.$component.hasClass('hide') + ' : Event Type = ' + e.type);
		//console.log('ApplicationPanelStatic.showApplicationPanelStatic() | Show = '+p_bShow);
		if(this.bApplicationPanelStaticVisible === p_bShow){return;}
		if(p_bShow){
			this.$component.removeClass('hide');
		}else{
			this.$component.addClass('hide');
		}
		this.bApplicationPanelStaticVisible = p_bShow;
    };
	
    ApplicationPanelStatic.prototype.destroy							= function() {
		this.bApplicationPanelStaticVisible = null;

		this.prototype			= null;

		AbstractComponent.prototype.destroy.call(this);
    };
    ApplicationPanelStatic.prototype.toString							= function() {
		return 'component/ApplicationPanelStatic';
	};

    return ApplicationPanelStatic;
});