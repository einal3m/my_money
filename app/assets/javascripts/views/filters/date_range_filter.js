MyMoney.Views.DateRangeFilterView = Backbone.View.extend({

  template: "filters/date_range_filter",

  events: {
    "change #date_range_option_id": "updateDates",
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          date_range: this.model.toJSON(), 
          date_range_options: this.collection
        }));

    this.$('#from_date').prop('disabled', true);
    this.$('#to_date').prop('disabled', true);
    return this;
  },

  updateDates: function(e) {
    e.stopPropagation();
    this.model = this.collection.get(this.$('#date_range_option_id').val());
    this.$('#from_date').val(formatDate(this.model.get('from_date')));
    this.$('#to_date').val(formatDate(this.model.get('to_date')));
  }
});