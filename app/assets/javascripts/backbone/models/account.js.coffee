class MyMoney.Models.Account extends Backbone.Model
  paramRoot: 'account'

class MyMoney.Collections.AccountsCollection extends Backbone.Collection
  model: MyMoney.Models.Account
  url: '/accounts'
