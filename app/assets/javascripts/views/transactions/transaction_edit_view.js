MyMoney.Views.TransactionEditView = MyMoney.Views.BaseEditView.extend({

  tagName: "tr",
  className: 'edit',

  events: {
    "change #category_id": "updateSubcategories",
    "change #transaction_type_id": "transactionTypeChanged",
    "click #cancel": "cancelEdit",
    "click #save": "saveModel",
    "click #delete": "deleteModel"
  },

  initialize: function() {
    this.account = this.options.account;
    this.categoryTypes = this.options.categoryTypes;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.transactionTypes = this.options.transactionTypes;
    this.filteredSubcategories = this.subcategoriesForCategory(this.model.get('category_id'));
    this.setTemplate();
  },

  setTemplate: function(){
    if (this.account && this.account.isShare()) {
      this.template = 'transactions/shares_form';
    } else {
      this.template = 'transactions/savings_form';
    }
  },

  templateData: function(){
    var transaction_type = this.model.get('transaction_type');
    var transactionTypeId =  transaction_type ? this.transactionTypes.where({code: transaction_type})[0].id : null;

    return _.extend(this.model.toJSON(), {
      allowDelete: !this.model.isNew(),
      categories: this.categories,
      subcategories: this.filteredSubcategories,
      categoryTypes: this.categoryTypes,
      transactionTypeId: transactionTypeId,
      transactionTypes: this.transactionTypes.models,
      isPurchaseOrSale: (this.model.isSharePurchase() || this.model.isShareSale()),
      isPriceUpdate: this.model.isUnitPriceUpdate(),
      isDividend: this.model.isDividend()
    });
  },

  setModelAttributes: function(){
    this.model.set({
        date: backEndDateFormat(this.$('#date').datepicker('getDate')),
        notes: this.$('#notes').val()
    });

    if (this.model.isSharePurchase()) {
      this.model.set({ quantity: parseInt(this.$('#quantity').val(), 10) });
    }
    if (this.model.isShareSale()) {
      this.model.set({ quantity: -parseInt(this.$('#quantity').val(), 10) });
    }

    if (this.model.isSharePurchase() || this.model.isShareSale()) {
      this.model.set({
        unit_price: dollarsToCents(this.$('#unit_price').val())
      });
      this.model.set({ amount: this.model.get('unit_price') * this.model.get('quantity') });
    } else if (this.model.isUnitPriceUpdate()) {
      this.model.set({
        amount: 0,
        unit_price: dollarsToCents(this.$('#unit_price').val())
      });
    } else if (this.model.isDividend()) {
      this.model.set({
        amount: dollarsToCents(this.$('#amount').val())
      });
    } else {
      this.model.set({
        amount: dollarsToCents(this.$('#amount').val()),
        category_id: parseInt(this.$('#category_id').val(), 10),
        subcategory_id: parseInt(this.$('#subcategory_id').val(), 10)
      });
    }
  },

  transactionTypeChanged: function(){
    var transaction_type_id = parseInt(this.$('#transaction_type_id').val(), 10);
    var transaction_type = this.transactionTypes.get(transaction_type_id);
    this.model.set({transaction_type: transaction_type.get('code')});
    this.render();
  }

});
