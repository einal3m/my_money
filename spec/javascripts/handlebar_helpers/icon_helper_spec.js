describe("IconHelpers", function() {
  var helpers = Handlebars.helpers;
  var options = {hash: {}};

  describe("Handlebar Helpers", function() {
    it("#editIcon", function() {
      expect(helpers.editIcon(options).string).toEqual(
        '<i class="fa fa-pencil-square-o" id="edit"></i>'
      );
    });
    it("#newIcon", function() {
      expect(helpers.newIcon(options).string).toEqual(
        '<i class="fa fa-plus" id="new"></i>'
      );
    });
    it("#deleteIcon", function() {
      expect(helpers.deleteIcon(options).string).toEqual(
        '<i class="fa fa-times" id="delete"></i>'
      );
    });
    it("#showIcon", function() {
      expect(helpers.showIcon(options).string).toEqual(
        '<i class="fa fa-hand-o-right fa-lg"></i>'
      );
    });
    it("#tickOrCross", function() {
      expect(helpers.tickOrCross(true).string).toEqual(
        '<i class="fa fa-check"></i>'
      );
      expect(helpers.tickOrCross(false).string).toEqual(
        '<i class="fa fa-times"></i>'
      );
    });
  });

  describe("functions", function(){
    it("#iconHTML", function(){
      expect(iconHTML('hello', 'world', 'again').string).toEqual(
        '<i class="fa world" id="again">hello</i>'
      );
    });
  });
});
