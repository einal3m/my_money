MyMoney.Views.BaseView = Backbone.View.extend({

  constructor: function() {
    // Define the subviews object off of the prototype chain
    this.subViews = {};

    // Call the original constructor
    Backbone.View.apply(this, arguments);
  },

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
	},

	subViews: function() {
		return this.subViews;
	}
});