class MyMoney.Views.AccountsNewView extends Backbone.View
 el: '#accounts'

 template: JST["backbone/templates/accounts/new"]

 events:
   "submit #new-account": "save"

 initialize: ->
   @render()

 render: ->
   @$el.html @template()

 save: (e) ->
   e.preventDefault()
   e.stopPropagation()
   title = $('#title').val()
   content = $('#content').val()
   model = new MyMoney.Models.Account({title: title, content: content})
   @collection.create model,
        success: (account) =>
       @model = account
       window.location.hash = "/#{@model.id}"