MyMoney.Views.ImportFileChooserView = Backbone.View.extend({

  template: 'import/import_file_chooser',

  // tagName: "div", 
  // id: "panel1",

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
// var data = new FormData( $('form.someForm').get(0) );
// $.ajax('http://*****.com', {
//   type:'POST',
//   data: data,
//   processData: false,
//   contentType: false // it automaticly sets multipart/form-data; boundary=...
// });
// saveFile: function() {
//   var picture = $('input[name="fileInput"]')[0].files[0]; 
//   var data = new FormData();
//   data.append('file', picture);
//   $.ajax({
//     url: 'rest/accounts/upload/' + this.model.get('picture    data: data,
//     cache: false,
//     contentType: false,
//     processData: false,
//     type: 'POST',
//     success: function(data){
//       $('#loadingModal').modal('hide');
//     },
//     error: function(data){
//       alert('no upload');
//       $('#loadingModal').modal('hide');
//     }
//   });
// },
  // reconcileAccount: function(e){
  //   e.preventDefault();
  //   e.stopPropagation();

  //   var new_statement_balance = dollarsToCents(this.$('#statement_balance').val());
  //   this.model.set({statement_date: this.$('#statement_date').val()});
  //   this.model.set({statement_balance: new_statement_balance});

  //   if(this.model.isValid(true)){
  //     this.model.save({}, { wait: true, done: this.trigger('startReconcile') });
  //   }
  // },

  // goBack: function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   Backbone.history.history.back()  
  // }

});