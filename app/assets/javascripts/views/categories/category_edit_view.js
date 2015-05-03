MyMoney.Views.CategoryEditView = MyMoney.Views.BaseEditView.extend({

  tagName: "tr",
  className: 'edit',
  template: "categories/edit_category",
 
  events: {
    "click #cancel": "cancelEdit",
    "click #save": "saveModel",
    "click #delete": "deleteModel"
  },

  initialize: function(){
    _.bindAll(this);
    this.categoryTypes = this.options.categoryTypes;
    this.model.saveState();
  },

  templateData: function(){
    return {
      category: this.model.toJSON(),
      allowDelete: !(this.model.isNew()),
      categoryTypes: this.categoryTypes
    };
  },

  setModelAttributes: function(){
    this.model.set({
      category_type_id: parseInt(this.$('#category_type_id').val(), 10),
      name: this.$('#name').val()
    });
  }
  
});
