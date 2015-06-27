MyMoney.Views.ImportFileChooserView = Backbone.View.extend({

  template: 'import/import_file_chooser',

  events: {
    'click #open_file': 'openFileChooser',
    'change #file_name' : 'updateFileName',
    'click #uploadOFX' : 'uploadOFX'
  },

  initialize: function(options){
    this.account = this.options.account;
    this.accounts = this.options.accounts;
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          account: this.account.toJSON(), 
          accounts: this.accounts.models}));
    return this;
  },

  openFileChooser: function(e) {
    e.stopPropagation();
    this.$el.find('#file_name').trigger('click');
  },

  updateFileName: function(e) {
    this.$('#show_file').html(this.$('#file_name').val());
  },

  uploadOFX: function() {
    if (this.file_selected()) {
      this.trigger('uploadOFX');
    }
  },

  file_selected: function() {
    if (this.$('#file_name').val()) {
      return true;
    }
    var $group = this.$('#file_name').closest('.form-group');
    $group.addClass('has-error');
    $group.find('.help-block').html('Please provide a file name.').removeClass('hidden');
    return false;
  }
});
