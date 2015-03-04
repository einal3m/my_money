MyMoney.Mixins.DeleteModel = {

  events: {
    "click #delete" : "deleteModel"
  },

  deleteModel: function(e){
    e.preventDefault();
    e.stopPropagation();

    var r = confirm('Are you sure you want to delete this ' + this.model.name + '?');
    if (r == true) {
      this.model.destroy({ wait: true });
    }
  }
}