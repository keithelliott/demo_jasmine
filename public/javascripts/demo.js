$(function(){
window.DJMenuModel = Backbone.Model.extend({
	defaults:{
		caption: "menu",
		active: false 
	},
	
	initialize: function(){
		if(!this.get('caption')){
			this.set({'caption' : this.defaults.caption});
		}
		
		if(!this.get('active')){
			this.set({'active' : this.defaults.active});
		}
	}
});	

window.DJMenuView = Backbone.View.extend({
	events: {
		"click": "setActive"
	},
	
	setActive: function(e){
		this.$el.siblings().removeClass('active');
		this.$el.addClass('active');
	}
});

var MenuModel = new DJMenuModel;
var setupJasmineMenuItem = new DJMenuView({el:"#setupJasmine"});
var suitesAndSpecsMenuItem = new DJMenuView({el:"#suitesAndSpecs"});
var spiesMenuItem = new DJMenuView({el:"#spies"});
var asyncTestsMenuItem = new DJMenuView({el:"#asyncTests"});

});