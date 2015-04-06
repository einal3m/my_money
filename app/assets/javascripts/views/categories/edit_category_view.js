MyMoney.Views.EditCategoryView = Backbone.View.extend({

  template: "categories/edit_category",
  tagName: "tr",

  events: {
    "click #cancel": "removeView",
    "click #save": "saveCategory"
  },

  initialize: function(){
    this.categoryTypes = this.options['categoryTypes'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      category: this.model.toJSON(),
      categoryTypes: this.categoryTypes
    }));
    Backbone.Validation.bind(this);
    return this;
  },

  saveCategory: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.model.set({category_type_id: this.$('#category_type_id').val()});
    this.model.set({name: this.$('#name').val()});

    if(this.model.isValid(true)){
      this.model.save({ }, { wait: true });
    }
  },

  removeView: function(){
    this.remove();
  }
});