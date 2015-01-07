class MyMoney.Views.AccountsIndexView extends Backbone.View 

	el: '#accounts'

	template: JST["backbone/templates/accounts/index"]

	initialize: ->
	    @render()
	    @addAll()

	addAll: ->
	    @collection.forEach(@addOne, @)

	addOne: (model) ->
	    @view = new MyMoney.Views.AccountView({model: model})
	    @$el.find('tbody').append @view.render().el

	render: ->
	    @$el.html @template()
	    @