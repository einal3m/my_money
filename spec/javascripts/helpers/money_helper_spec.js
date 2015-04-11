describe("date helpers", function() {
  var helpers = Handlebars.helpers;

  describe("Handlebar Helpers", function() {
    it("accountFormat should format the cents as dollars with $ and commas", function() {
      expect(helpers.accountingFormat(123456)).toEqual('$1,234.56');
      expect(helpers.accountingFormat(-123456)).toEqual('$(1,234.56)');
    });

    it("moneyIn should format the given number if it is positive", function(){
      expect(helpers.moneyIn(123456)).toEqual('1,234.56');
      expect(helpers.moneyIn(-123456)).toEqual('');
    });

    it("moneyOut should format the given number if it is negative", function(){
      expect(helpers.moneyOut(123456)).toEqual('');
      expect(helpers.moneyOut(-123456)).toEqual('1,234.56');
    });

    it("moneyInput creates a money input field", function(){
      var moneyInput = helpers.moneyInput('123456', 'money_id');
      var moneyHTML = '<div class="input-group-addon">$</div><input type="text" class="form-control" name="money_id" id="money_id" value="1,234.56">'
      expect(moneyInput.toEqual(moneyHTML);
    });
  });

  describe("functions", function(){
    it("accountingFormat formats money with $ and commas", function(){
      expect(accountingFormat(1234.56)).toEqual('$1,234.56');
      expect(accountingFormat(-1234.56)).toEqual('$(1,234.56)');
    });
    it("moneyNumberFormat formats money with commas", function(){
      expect(accountingFormat(1234.56)).toEqual('1,234.56');
      expect(accountingFormat(-1234.56)).toEqual('-1,234.56');
    });
    it("centsToDollars converts cents to dollars", function(){
      expect(centsToDollars(123456)).toEqual(1234.56);
    });
    it("dollarsToCents converts cents to dollars", function(){
      expect(dollarsToCents(1234.56)).toEqual(123456);
    });
  });
});
