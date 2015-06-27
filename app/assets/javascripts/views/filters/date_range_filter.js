MyMoney.Views.DateRangeFilterView = Backbone.View.extend({

  template: "filters/date_range_filter",

  events: {
    "change #date_range_option_id": "dateRangeChanged",
    "change #from_date" : "fromDateChanged",
    "change #to_date" : "toDateChanged"
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          date_range: this.model.toJSON(), 
          date_range_options: this.collection
        }));

    this.enableOrDisableDates();
    return this;
  },

  dateRangeChanged: function(e){
    e.stopPropagation();
    this.setModel();
    this.enableOrDisableDates();
  },

  setModel: function() {
    this.model = this.collection.get(this.$('#date_range_option_id').val());
    this.$('#from_date').val(formatDate(this.model.get('from_date')));
    this.$('#to_date').val(formatDate(this.model.get('to_date')));
  },

  enableOrDisableDates: function(){
    var enabled = this.model.get('custom');
    this.$('#from_date').prop('disabled', !enabled);
    this.$('#to_date').prop('disabled', !enabled);
  },

  fromDateChanged: function(){
    var date = this.$('#from_date').datepicker('getDate');
    this.model.set('from_date', backEndDateFormat(date));
  },

  toDateChanged: function(){
    var date = this.$('#to_date').datepicker('getDate');
    this.model.set('to_date', backEndDateFormat(date));
  }
});
