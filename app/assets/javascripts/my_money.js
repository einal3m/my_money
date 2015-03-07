//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers
//= require_tree ./mixins

window.MyMoney = {
	Models: {},
    Views: {},
    Collections: {},
    Routers: {},
		Mixins: {},

    init: function() {
        window.router = new MyMoney.Routers.AccountsRouter();
        Backbone.history.start();
    }
};
