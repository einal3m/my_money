//= require ./base_view.js

MyMoney.Views.BaseTableRowView = MyMoney.Views.BaseView.extend({

  toggleClickable: function(e){
    e.preventDefault();
    e.stopPropagation();
    if (this.$el.hasClass('clickable')) {
      this.$el.removeClass('clickable');
      this.$el.addClass('editing');
      this.editModel();
    }
  },

  editModel: function(){
    this.editView = this.createEditView();
    this.listenTo(this.editView, 'cancel', this.editCancelled);
    this.renderEditView();
  },

  renderEditView: function(){
    this.$el.after(this.editView.render().el);
  },

  editCancelled: function(){
    this.$el.addClass('clickable');
    this.$el.removeClass('editing');
  }

});
