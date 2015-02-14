MyMoney.Collections.TransactionsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Transaction,

  initialize: function(models, options) {
    this.account_id = _.result(options, 'account_id');
  },

  url: function() {
    return '/transactions/unreconciled?account_id=' + this.account_id;
  },

  parse : function(resp, xhr) {
  	return resp.transactions;
  }

// class ChildElementCollection extends Backbone.Collection
//   initialize: ->
//     @bind 'add', (model) -> model.set('parent_id', @parent.id)

//   url: -> "#{@parent.url()}/resources" # let's say that @parent.url() == '/parent/1'
//   save: ->
//     response = Backbone.sync('update', @, url: @url(), contentType: 'application/json', data: JSON.stringify(children: @toJSON()))
//     response.done (models) => @reset models.resources

});