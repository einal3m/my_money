MyMoney.Views.PatternTableView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "pattern-table",

  template: "patterns/patterns_table",

  events: {
    "click #new": "addModelView"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  addTableRows: function() {
    this.collection.each(function(model) {
      this.addTableRow(model);
    }, this);
  },

  addTableRow: function(model){
    var row = new MyMoney.Views.PatternTableRowView({
      model: model,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    })
    this.$el.find('tbody').append(row.render().el);
  },

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addTableRows();
    return this;
  },

  addModelView: function(){
    var newModel = new MyMoney.Models.Pattern({account_id: this.collection.account_id});
    this.editView = new MyMoney.Views.PatternEditView({
      model: newModel,
      collection: this.collection,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
    this.$el.find('tbody').prepend(this.editView.render().el);
    this.$('#new').attr('disabled', 'disabled');
    this.listenTo(this.editView, 'cancelEdit', this.afterEdit);
  },

  afterEdit: function(){
    this.$('#new').removeAttr("disabled");
    if (! this.editView.model.isNew()){
      this.addTableRow(this.editView.model);
    }
  }

});