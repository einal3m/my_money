MyMoney.Views.AccountStatsView = Backbone.View.extend({

	template: "accounts/account_stats",

  events: {
    "click #reconcile": "reconcileAccount"
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  reconcileAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('reconciliations/new/account' + this.model.id, {trigger: true});    
  }

});