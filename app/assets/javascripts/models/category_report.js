MyMoney.Models.CategoryReport = MyMoney.Models.BaseReport.extend({

  validation: {
    from_date: {
      required: true
    },
    to_date: {
      required: true
    }
  }

});
