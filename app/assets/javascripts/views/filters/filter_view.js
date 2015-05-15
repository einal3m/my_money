MyMoney.Views.FilterView = MyMoney.Views.BaseView.extend({

  template: "filters/filter",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAccountTypeFilter();
    this.addAccountFilter();
    this.addCategoryFilter();
    this.addDateFilter();
    this.renderSubViews();
    return this;
  },

  addAccountFilter: function() {
    if (this.options.hasOwnProperty('accounts')) {
      this.addSubView('account_filter', new MyMoney.Views.AccountFilterView({
        model: this.options.account,
        collection: this.options.accounts
      }));
    }
  },

  addAccountTypeFilter: function() {
    if (this.options.hasOwnProperty('accountTypes')) {
      this.addSubView('account_type_filter', new MyMoney.Views.AccountTypeFilterView({
        model: this.model,
        accountType: this.options.accountType,
        accountTypes: this.options.accountTypes
      }));
    }
  },

  addDateFilter: function() {
    if (this.options.hasOwnProperty('date_range')) {
      this.addSubView('date_filter', new MyMoney.Views.DateRangeFilterView({
        model: this.options.date_range,
        collection: this.options.date_range_options
      }));
    }
  },

  addCategoryFilter: function(){
    if (this.options.hasOwnProperty('categories')) {
      this.addSubView('category_filter', new MyMoney.Views.CategoryFilterView({
        category_id: this.options.category_id,
        categories: this.options.categories,
        subcategory_id: this.options.subcategory_id,
        subcategories: this.options.subcategories,
        categoryTypes: this.options.categoryTypes
      }));
    }
  }
});