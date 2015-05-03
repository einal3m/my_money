//= require ./base_view.js

MyMoney.Views.BaseTableView = MyMoney.Views.BaseView.extend({

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    this.addTableRows();
    return this;
  },

  templateData: function(){
    return {};
  },

  addTableRows: function() {
    this.collection.each(function(model) {
      this.addTableRow(model);
    }, this);
  },

  addTableRow: function(model){
    var rowView = this.createTableRow(model);
    this.$el.find('tbody').append(rowView.render().el);
  },

  addNewView: function(){
    this.createNewView();
    this.$el.find('tbody').prepend(this.editView.render().el);
    this.$('#new').attr('disabled', 'disabled');
    this.listenTo(this.editView, 'cancel', this.editCancelled);
  },

  editCancelled: function(){
    this.$('#new').removeAttr("disabled");
  }

});
