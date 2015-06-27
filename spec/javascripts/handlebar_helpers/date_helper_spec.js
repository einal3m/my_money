describe("DateHelpers", function() {
  var helpers = Handlebars.helpers;

  describe("Handlebar Helpers", function() {
    it("#dateFormatter", function() {
      expect(helpers.dateFormatter('2014-07-19').string).toEqual('19-Jul-2014');
    });

    it("#datePickerInput", function(){
      var datePickerInput = helpers.datePickerInput('2014-07-19', 'date_id');
      var dateHTML = '<input type="text" class="form-control" name="date_id" id="date_id" value="19-Jul-2014" data-provide="datepicker">'
      expect(datePickerInput.string).toEqual(dateHTML);
    });
  });

  describe("functions", function(){
    it("#formatDate", function(){
      expect(formatDate('2014-07-19')).toEqual('19-Jul-2014');
    });
    it("#backEndDateFormat", function(){
      expect(backEndDateFormat('19-Jul-2014')).toEqual('2014-07-19');
    });
  });
});
