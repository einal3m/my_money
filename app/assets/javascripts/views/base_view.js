MyMoney.Views.BaseView = Backbone.View.extend({

	subViews: {},

	addSubView: function(id, view){
		if (this.subViews[id]) {
			this.subViews[id].remove();
		}
		this.subViews[id] = view;
	},

	renderSubViews: function(){
		for (var id in this.subViews){
	    this.$el.find('#' + id).html(this.subViews[id].render().el);		
		}
	}

});