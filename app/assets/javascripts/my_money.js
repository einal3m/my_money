//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

window.MyMoney = {
	Models: {},
    Views: {},
    Collections: {},
    Routers: {},
    init: function() {
        window.router = new MyMoney.Routers.AccountsRouter();
        Backbone.history.start();
    }
};