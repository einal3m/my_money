describe("SelectHelpers", function() {
  var helpers = Handlebars.helpers;

  describe("Handlebar Helpers", function() {
    var groupedCollection, collection, model_id, id;

    beforeEach(function(){
      groupedCollection = new Backbone.Collection([
        {id: 1, name: 'Group 1'},
        {id: 2, name: 'Group 2'}
      ]);
      collection = new Backbone.Collection([
        {id: 1, name: 'Hello', collection_id: 2},
        {id: 2, name: 'World', collection_id: 1}
      ]);
      id = 'account_id'
    });

    describe('#selectInput', function(){
      it("with selection", function() {
        selected_id = 2;
        expect(helpers.selectInput(collection.models, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="1">Hello</option>' + 
          '<option value="2" selected="selected">World</option>' + 
          '</select>'
        );
      });
      it("without selection", function() {
        selected_id = null;
        expect(helpers.selectInput(collection.models, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="" disabled selected>Please select...</option>' + 
          '<option value="1">Hello</option>' + 
          '<option value="2">World</option>' + 
          '</select>'
        );
      });
    });

    describe('#selectInputWithUnassigned', function(){
      it("with selection", function() {
        selected_id = 2;
        expect(helpers.selectInputWithUnassigned(collection.models, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="">Un-assigned</option>' + 
          '<option value="1">Hello</option>' + 
          '<option value="2" selected="selected">World</option>' + 
          '</select>'
        );
      });
      it("without selection", function() {
        selected_id = null;
        expect(helpers.selectInputWithUnassigned(collection.models, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="" selected>Un-assigned</option>' + 
          '<option value="1">Hello</option>' + 
          '<option value="2">World</option>' + 
          '</select>'
        );
      });
    });

    describe('#selectGroupedInput', function(){
      it("with selection", function() {
        selected_id = 2;
        expect(helpers.selectGroupedInput(groupedCollection, 'collection_id', collection, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<optgroup label="Group 1">' +
          '<option value="2" selected="selected">World</option>' + 
          '</optgroup>' +
          '<optgroup label="Group 2">' +
          '<option value="1">Hello</option>' + 
          '</optgroup>' +
          '</select>'
        );
      });
      it("without selection", function() {
        selected_id = null;
        expect(helpers.selectGroupedInput(groupedCollection, 'collection_id', collection, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="" disabled selected>Please select...</option>' + 
          '<optgroup label="Group 1">' +
          '<option value="2">World</option>' + 
          '</optgroup>' +
          '<optgroup label="Group 2">' +
          '<option value="1">Hello</option>' + 
          '</optgroup>' +
          '</select>'
        );
      });
    });

    describe('#selectGroupedInputWithUnassigned', function(){
      it("with selection", function() {
        selected_id = 2;
        expect(helpers.selectGroupedInputWithUnassigned(groupedCollection, 'collection_id', collection, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="">Un-assigned</option>' + 
          '<optgroup label="Group 1">' +
          '<option value="2" selected="selected">World</option>' + 
          '</optgroup>' +
          '<optgroup label="Group 2">' +
          '<option value="1">Hello</option>' + 
          '</optgroup>' +
          '</select>'
        );
      });
      it("without selection", function() {
        selected_id = null;
        expect(helpers.selectGroupedInputWithUnassigned(groupedCollection, 'collection_id', collection, selected_id, id).string).toEqual(
          '<select class="form-control" id="account_id" name="account_id">' +
          '<option value="" selected>Un-assigned</option>' + 
          '<optgroup label="Group 1">' +
          '<option value="2">World</option>' + 
          '</optgroup>' +
          '<optgroup label="Group 2">' +
          '<option value="1">Hello</option>' + 
          '</optgroup>' +
          '</select>'
        );
      });
    });
  });
});
