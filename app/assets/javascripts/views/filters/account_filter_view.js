MyMoney.Views.AccountFilterView = Backbone.View.extend({

  template: "filters/account_filter",


  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          account: this.model, 
          accounts: this.collection
        }));
    return this;
  },

  accountChanged: function(e){
    e.preventDefault();
    e.stopPropagation();
    console.log
    this.trigger('accountChanged', this.$('#account_id').val());
  }
});