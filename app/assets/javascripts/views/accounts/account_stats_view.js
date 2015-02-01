MyMoney.Views.AccountStatsView = Backbone.View.extend({

	template: "accounts/account_stats",

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  }

});