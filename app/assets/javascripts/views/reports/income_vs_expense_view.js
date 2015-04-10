MyMoney.Views.IncomeVsExpenseReportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "reports/income_vs_expense",

  events: {
    "click #search": "updateReport"
  },

  initialize: function() {
    this.model = new MyMoney.Models.Report({}, {reportName: 'income_vs_expense'});
    this.dateRangeOptions = this.options['dateRangeOptions'];
    this.currentDateRange = this.options['currentDateRange'];
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
  },

  updateReport: function() {
    var view = this;
    var date_range_id = this.$('#date_range_option_id').val();

    this.currentDateRange = this.dateRangeOptions.get(date_range_id);
    var from_date = this.$('#from_date').val();
    var to_date = this.$('#to_date').val();

    this.model.set({from_date: from_date});
    this.model.set({to_date: to_date});

    if(this.model.isValid(true)){
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
      date_range: this.currentDateRange,
      date_range_options: this.dateRangeOptions
    }))
    this.renderSubViews();
    Backbone.Validation.bind(this);
    return this;
  },

  draw: function() {
    this.undraw();
    var view = this;

    _.each(['income', 'expense'], function(type) {
      var category_data = view.buildCategoryData(view.model.get(type).category_totals);
      var subcategory_data = view.buildSubcategoryData(category_data, view.model.get(type).subcategory_totals);
      var total = Math.abs(view.model.get(type).total);

      if (category_data.length > 0) {
        var chartView = new MyMoney.Views.PieChartView({
          report_id: '#' + type + '_pie',
          sums: _.map(category_data, function(data){ return data.sum; }),
          labels: _.map(category_data, function(data){ return data.category_name; })
        });
        chartView.render();
      }
      view.renderTable(category_data, subcategory_data, type, total);
    });
  },

  renderTable: function(category_data, subcategory_data, id, total) {
    var view = this;
    _.each(category_data, function(category) {
        view.addCategoryRow(category, id);
        _.each(subcategory_data[category.category_id], function(subcategory) {
          view.addSubcategoryRow(subcategory, id);
        });
    });
    view.addTotalRow(total, id);
  },

  addCategoryRow: function(category, id){
    var rowView = new MyMoney.Views.ReportCategoryRowView({
      model: category
    });
    this.$el.find('#' + id + '_table').append(rowView.render().el);
  },

  addSubcategoryRow: function(subcategory, id){
    var rowView = new MyMoney.Views.ReportSubcategoryRowView({
      model: subcategory
    });
    this.$el.find('#' + id + '_table').append(rowView.render().el);
  },

  addTotalRow: function(total, id) {
    var rowView = new MyMoney.Views.ReportTotalRowView({
      model: total
    });
    this.$el.find('#' + id + '_table').append(rowView.render().el);
  },

  undraw: function() {
    var view = this;
    _.each(['income', 'expense'], function(type){
      if (view.$('#' + type + '_pie svg')) {
        view.$('#' + type + '_pie svg').remove();
      }
    });
    _.each(['income', 'expense'], function(type){
      view.$('#' + type + '_table').empty();
    });
  },

  buildCategoryData: function(category_data) {
    var view = this;
    var data = [];

    _.each(category_data, function(d){
      var category = view.categories.get(d.category_id);
      var name = 'Un-assigned';
      if (category) {
        name = category.get('name');
      }
      data.push({
        category_name: name, 
        category_id: d.category_id, 
        sum: Math.abs(d.sum)
      });
    });

    return data;
  },

  buildSubcategoryData: function(category_data, subcategory_data) {
    var view = this;
    var data = {};
    _.each(category_data, function(d){
      data[d.category_id] = [];
    });

    _.each(subcategory_data, function(d){
      var subcategory = view.subcategories.get(d.subcategory_id);
      var name = 'Un-assigned';
      if (subcategory) {
        name = subcategory.get('name');
      }
      data[d.category_id].push({
        subcategory_name: name,
        subcategory_id: d.subcategory_id,
        category_id: d.category_id,
        sum: Math.abs(d.sum)
      });
    });

    return data;
  }

});
