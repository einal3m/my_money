//= require ./base_view.js

MyMoney.Views.BaseTableView = MyMoney.Views.BaseView.extend({

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    this.addTableRows();
    return this;
  }

});
