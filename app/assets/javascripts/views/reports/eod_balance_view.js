MyMoney.Views.EodBalanceReportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "reports/eod_balance",

  events: {
    "click #update": "updateReport"
  },

  initialize: function() {
    this.model = new MyMoney.Models.Report({}, {reportName: 'eod_balance'});
    this.accounts = this.options['accounts'];
    this.account = this.options['account'];
    this.addSubView('filters', new MyMoney.Views.AccountFilterView({model: this.account, collection: this.accounts}));
  },

  updateReport: function() {
    var view = this;

    this.model.set({account_id: this.$('#account_id').val()});
    this.model.set({from_date: this.$('#from_date').val()});
    this.model.set({to_date: this.$('#to_date').val()});

    if(this.model.isValid(true)){
      $.when(this.model.fetch()).done(function () {
        view.draw();
      });
    }

  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
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
