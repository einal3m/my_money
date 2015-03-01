MyMoney.Views.TransactionEditView = Backbone.View.extend({

  template: "transactions/transaction_edit",
  tagName: "tr",

  events: {
    "click #save": "saveTransaction",
    "change #category_id": "updateSubcategories"
  },

  initialize: function() {
    this.account = this.options['account'];
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.set_current_subcategories();
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      transaction: this.model.toJSON(),
      categories: this.categories,
      subcategories: this.current_subcategories,
      categoryTypes: this.categoryTypes
    }));
    Backbone.Validation.bind(this);
    return this;
  },

  set_current_subcategories: function() {
    if (this.model.get('category_id')) {
      this.current_subcategories = this.subcategories.where({category_id: this.model.get('category_id')});
    } else {
      this.current_subcategories = null;
    }
  },

  updateSubcategories: function() {
    this.model.set('category_id', parseInt(this.$('#category_id').val()));
    this.set_current_subcategories();
    var html = selectContent(this.current_subcategories, null);
    this.$el.find('#subcategory_id').html(html);
  },

  saveTransaction: function(e){
    e.preventDefault();
    e.stopPropagation();

    var amount = dollarsToCents(this.$('#amount').val());
    this.model.set({date: this.$('#date').val()});
    this.model.set({amount: amount});
    this.model.set({category_id: this.$('#category_id').val()});
    this.model.set({subcategory_id: this.$('#subcategory_id').val()});

    if(this.model.isValid(true)){
      this.model.save({ }, { wait: true });
    }
  }
});