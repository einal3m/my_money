MyMoney.Views.DateRangeFilterView = Backbone.View.extend({

  template: "filters/date_range_filter",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          date_range: this.model, 
          date_range_options: this.collection
        }));
    return this;
  }
});