MyMoney.Models.ReportForAccount = MyMoney.Models.Report.extend({

  urlRoot: function() {
    return 'report/' + this.reportName + '?account_id=' + this.get('account_id');
  },

  validation: {
    account_id: {
      required: true,
      msg: 'Account is required'
    },
    from_date: {
      required: true
    },
    to_date: {
      required: true
    }
  }

});
