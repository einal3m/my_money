MyMoney.Views.CategoryReportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "reports/category_report",

  events: {
    "click #search": "search"
  },

  initialize: function() {
    this.category = this.options.category;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    this.dateRangeOptions = this.options.dateRangeOptions;
    this.currentDateRange = this.options.currentDateRange;

  },

  fetchData: function(){
    var category_id = (this.category) ? this.category.id : null;
    this.model = new MyMoney.Models.Report({category_id: category_id}, {reportName: 'category'});
    return this.model.fetch({
      data: $.param({
        category_id: this.model.get('category_id'),
        from_date: this.currentDateRange.get('from_date'), 
        to_date: this.currentDateRange.get('to_date') 
      })
    });
  },
  
  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addSubView('filter', new MyMoney.Views.FilterView({
      category_id: this.model.get('category_id'),
      categories: this.categories,
      categoryTypes: this.categoryTypes,
      date_range: this.currentDateRange,
      date_range_options: this.dateRangeOptions
    }));

    this.transactions = new MyMoney.Collections.Transactions(this.model.get('transactions'));
    var subView = this.addSubView('transaction_table', new MyMoney.Views.TransactionTableView({
      collection: this.transactions,
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    }));
    this.transactions.on('destroy change', this.dataChanged, this);
    this.renderSubViews();
    Backbone.Validation.bind(this);
    return this;
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
  },

  search: function(){
    this.reloadPage();
  },

  dataChanged: function(){
    this.reloadPage();
  },

  updateDateRange: function(){
    var date_range_option_id = this.$('#date_range_option_id').val();
    window.router.setCurrentDateRange(this.dateRangeOptions.get(date_range_option_id));
  },

  reloadPage: function(){
    this.updateDateRange();
    var newCategoryId = this.$('#category_id').val();
    window.router.navigate('reports/category/' + newCategoryId, {trigger: true});
    if (newCategoryId == this.model.get('category_id')) {
      window.router.reportCategory(newCategoryId);
    }
  }

});
