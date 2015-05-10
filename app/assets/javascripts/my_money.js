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
        window.router.loadHeader();
        window.router.loadFooter();
        Backbone.history.start();
        
    }
};

Backbone.Collection.prototype.save = function (options) {
    Backbone.sync("create", this, options);
};