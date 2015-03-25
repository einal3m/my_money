MyMoney.Models.Report = MyMoney.Models.BaseReport.extend({

  urlRoot: function() {
    return '/report/' + this.reportName + '?account_id=' + this.get('account_id');
  },

  validation: {
    account_id: {
      required: true
    },
    from_date: {
      required: true
    },
    to_date: {
      required: true
    }
  }

});
