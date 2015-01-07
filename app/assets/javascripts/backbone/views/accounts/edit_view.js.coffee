class MyMoney.Views.AccountsEditView extends Backbone.View

  template: JST["backbone/templates/accounts/edit"]

  el: '#accounts'

  events:
    "submit #edit-account" : "update"

  initialize: ->
    @render()

  render: ->
    @$el.html @template(@model.toJSON())
    @

  update: (e) ->
    e.preventDefault()
    e.stopPropagation()
    name = $('#name').val()
    bank = $('#bank').val()
    @model.save({name: name, bank: bank},
                success: (account) =>
                    @model = account
                    window.location.hash = "#/index")