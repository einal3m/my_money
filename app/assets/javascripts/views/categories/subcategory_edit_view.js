MyMoney.Views.SubcategoryEditView = MyMoney.Views.BaseEditView.extend({

  tagName: "tr",
  className: 'edit',
  template: "categories/edit_subcategory",
 
  events: {
    "click #cancel": "cancelEdit",
    "click #save": "saveModel",
    "click #delete": "deleteModel"
  },

  initialize: function(){
    _.bindAll(this);
    this.categories = this.options.categories;
    this.categoryTypes = this.options.categoryTypes;
    this.model.saveState();
  },

  templateData: function(){
    return {
      subcategory: this.model.toJSON(),
      allowDelete: !this.model.isNew(),
      categories: this.categories,
      categoryTypes: this.categoryTypes
    };
  },

  setModelAttributes: function(){
    this.model.set({
      category_id: parseInt(this.$('#category_id').val(), 10),
      name: this.$('#name').val()
    });
  }

});
