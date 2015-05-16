describe("StringHelpers", function() {
  var helpers = Handlebars.helpers;

  describe("Handlebar Helpers", function() {
    it("#descriptionFormatter", function() {
      expect(helpers.descriptionFormatter('Memo', 'Notes').string).toEqual('Memo/Notes<br>');
      expect(helpers.descriptionFormatter(null, 'Notes').string).toEqual('Notes<br>');
      expect(helpers.descriptionFormatter('Memo', null).string).toEqual('Memo<br>');
    });
    it("#categoryFormatter", function() {
      category = new Backbone.Model({name: 'Cat'});
      subcategory = new Backbone.Model({name: 'Sub'});
      expect(helpers.categoryFormatter(category, subcategory).string).toEqual('<em>Cat/Sub</em>');
      expect(helpers.categoryFormatter(category, null).string).toEqual('<em>Cat</em>');
    });
    it("#reconciledFormatter", function() {
      expect(helpers.reconciledFormatter(1)).toEqual('R');
      expect(helpers.reconciledFormatter(null)).toBeUndefined();
    });
  });
});
