MyMoney.Views.PatternTableView = MyMoney.Views.BaseTableView.extend({

  tagName: "div", 
  className: "pattern-table",

  template: "patterns/patterns_table",

  events: {
    "click #new": "addNewView"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  createTableRow: function(model){
    return new MyMoney.Views.PatternTableRowView({
      model: model,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  },

  createNewView: function() {
    var newModel = new MyMoney.Models.Pattern({account_id: this.collection.account_id});
    this.editView = new MyMoney.Views.PatternEditView({
      model: newModel,
      collection: this.collection,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  }

});
