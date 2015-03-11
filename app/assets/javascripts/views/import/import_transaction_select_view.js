MyMoney.Views.ImportTransactionSelectView = Backbone.View.extend({

  template: "import/import_transaction_select",

  initialize: function() {
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];   
  },

  addAll: function(){
    for (var i = 0; i < this.collection.length; i++) { 
      this.addOne(this.collection.models[i]);
    }
  },

  addOne: function(model){
      var rowView = new MyMoney.Views.ImportTransactionRowView({
        model: model,
        categories: this.categories,
        subcategories: this.subcategories,
        categoryTypes: this.categoryTypes
      });
      this.$el.find('tbody').append(rowView.render().el);
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAll();
    return this;
  }
});