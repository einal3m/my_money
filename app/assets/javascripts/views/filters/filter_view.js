MyMoney.Views.FilterView = MyMoney.Views.BaseView.extend({

  template: "filters/filter",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAccountFilter();
    this.addDateFilter();
    this.renderSubViews();
    return this;
  },

  addAccountFilter: function() {
    if (this.options.hasOwnProperty('accounts')) {
      this.addSubView('account_filter', new MyMoney.Views.AccountFilterView({
        model: this.options['account'],
        collection: this.options['accounts']
      }))
    }
  },

  addDateFilter: function() {
    if (this.options.hasOwnProperty('date_range')) {
      this.addSubView('date_filter', new MyMoney.Views.DateRangeFilterView({
        model: this.options['date_range'],
        collection: this.options['date_range_options']
      }));
    }
  }
});