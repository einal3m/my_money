MyMoney.Views.EditSubcategoryView = Backbone.View.extend({

  template: "categories/edit_subcategory",
  tagName: "tr",
  className: 'subcategory',

  events: {
    "click #cancel": "removeView",
    "click #save": "saveSubcategory"
  },
  initialize: function(){
    this.categories = this.options['categories'];
    this.categoryTypes = this.options['categoryTypes'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      subcategory: this.model.toJSON(),
      categories: this.categories,
      categoryTypes: this.categoryTypes
    }));
    Backbone.Validation.bind(this);
    return this;
  },

  saveSubcategory: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.model.set({category_id: this.$('#category_id').val()});
    this.model.set({name: this.$('#name').val()});

    if(this.model.isValid(true)){
      this.model.save({ }, { wait: true });
    }
  },

  removeView: function(){
    this.remove();
  }
});