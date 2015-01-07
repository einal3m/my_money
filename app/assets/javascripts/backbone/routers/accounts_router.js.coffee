class MyMoney.Routers.AccountsRouter extends Backbone.Router

  initialize: (options) ->
    @accounts = new MyMoney.Collections.AccountsCollection()
    @accounts.reset options.accounts

  routes:
    "index"       : "index"
    "new"         : "newAccount"
    ":id/edit"    : "edit"
    ".*"          : "index"

  index: ->
    @view = new MyMoney.Views.AccountsIndexView({collection: @accounts})

  newPost: ->
    alert('new')
    @view = new MyMoney.Views.AccountsNewView({collection: @accounts})

  edit: (id) ->
    account = @accounts.get(id)
    @view = new MyMoney.Views.AccountsEditView({model: account})
