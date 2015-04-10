MyMoney.Views.EodBalanceReportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "reports/eod_balance",

  events: {
    "click #search": "updateReport"
  },

  initialize: function() {
    this.model = new MyMoney.Models.ReportForAccount({}, {reportName: 'eod_balance'});
    this.accounts = this.options['accounts'];
    this.account = this.options['account'];
    this.dateRangeOptions = this.options['dateRangeOptions'];
    this.currentDateRange = this.options['currentDateRange'];
  },

  updateReport: function() {
    var view = this;
    var account_id = this.$('#account_id').val();
    var date_range_id = this.$('#date_range_option_id').val();

    this.currentDateRange = this.dateRangeOptions.get(date_range_id);
    var from_date = this.$('#from_date').val();
    var to_date = this.$('#to_date').val();

    this.model.set({account_id: account_id});
    this.model.set({from_date: from_date});
    this.model.set({to_date: to_date});

    if(this.model.isValid(true)){
      window.router.setCurrentAccount(this.accounts.get(account_id));
      window.router.setCurrentDateRange(this.currentDateRange);
      $.when(this.model.fetch({
        data: $.param({
          from_date: this.currentDateRange.get('from_date'), 
          to_date: this.currentDateRange.get('to_date') }) 
      })).done(function () {
        view.draw();
      });
    }
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addSubView('filter', new MyMoney.Views.FilterView({
      account: this.account,
      accounts: this.accounts,
      date_range: this.currentDateRange,
      date_range_options: this.dateRangeOptions
    }))
    this.renderSubViews();
    Backbone.Validation.bind(this);
    return this;
  },

  draw: function() {
    this.undraw();
    this.chartView = new MyMoney.Views.LineChartView({model: this.model});
    this.chartView.render();
  },

  undraw: function() {
    if (this.$('svg')) {
      this.$('svg').remove();
    }
  }
});
