MyMoney.Views.SubcategoryReportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "reports/subcategory_report",

  events: {
    "click #search": "updateReport"
  },

  initialize: function() {
    this.accounts = this.options['accounts'];
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.dateRangeOptions = this.options['dateRangeOptions'];
    this.currentDateRange = this.options['currentDateRange'];

    this.model = new MyMoney.Models.CategoryReport({}, {reportName: 'subcategory'});
    this.model.set('subcategory_id', this.options['subcategory_id']);
    this.model.set('category_id', this.options['category_id']);
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addSubView('filter', new MyMoney.Views.FilterView({
      category_id: this.model.get('category_id'),
      categories: this.categories,
      categoryTypes: this.categoryTypes,
      subcategory_id: this.model.get('subcategory_id'),
      subcategories: this.subcategories,
      date_range: this.currentDateRange,
      date_range_options: this.dateRangeOptions
    }));
    this.renderSubViews();
    Backbone.Validation.bind(this);
    return this;
  },

  updateReport: function() {
    var view = this;
    this.updateModelData();
    if(this.model.isValid(true)){
      window.router.setCurrentDateRange(this.currentDateRange);
      $.when(this.model.fetch({
        data: $.param({
          category_id: this.model.get('category_id'),
          subcategory_id: this.model.get('subcategory_id'),
          from_date: this.currentDateRange.get('from_date'), 
          to_date: this.currentDateRange.get('to_date') }) 
      })).done(function () {
        view.transactions = new MyMoney.Collections.TransactionsCollection(
          view.model.get('transactions')
        );
        var subView = view.addSubView('transaction_table', new MyMoney.Views.TransactionTableView({
          collection: view.transactions,
          accounts: view.accounts,
          categories: view.categories,
          subcategories: view.subcategories,
          categoryTypes: view.categoryTypes
        }));
        view.renderSubView('transaction_table');
        view.listenTo(subView, "transactionsUpdated", view.updateReport);
        view.draw();
      });
    }
  },

  updateModelData: function() {
    var subcategory_id = this.$('#subcategory_id').val();
    var category_id = this.$('#category_id').val();
    var date_range_id = this.$('#date_range_option_id').val();

    this.currentDateRange = this.dateRangeOptions.get(date_range_id);
    var from_date = this.$('#from_date').val();
    var to_date = this.$('#to_date').val();

    this.model.set({subcategory_id: subcategory_id});
    this.model.set({category_id: category_id});
    this.model.set({from_date: from_date});
    this.model.set({to_date: to_date});
  },

  draw: function() {
    this.undraw();
    this.chartView = new MyMoney.Views.BarChartView({model: this.model.get('month_totals')});
    this.chartView.render();
  },

  undraw: function() {
    if (this.$('svg')) {
      this.$('svg').remove();
    }
  }


});