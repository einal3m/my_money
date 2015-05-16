describe("ButtonHelpers", function() {
  var helpers = Handlebars.helpers;
  var options = {hash: {}};

  describe("Handlebar Helpers", function() {
    it("#deleteButton", function() {
      expect(helpers.deleteButton(options).string).toEqual(
        '<button type="button" id="delete" class="btn btn-sm btn-danger">Delete</button>'
      );
      expect(helpers.deleteButton({hash: {text: 'hello'}}).string).toEqual(
        '<button type="button" id="delete" class="btn btn-sm btn-danger">hello</button>'
      );
    });

    it("#saveButton", function() {
      expect(helpers.saveButton(options).string).toEqual(
        '<button type="button" id="save" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Save</button>'
      );
      expect(helpers.saveButton({hash: {text: 'hello'}}).string).toEqual(
        '<button type="button" id="save" class="btn btn-primary"><i class="fa fa-floppy-o"></i> hello</button>'
      );
    });

    it("#editButton", function() {
      expect(helpers.editButton(options).string).toEqual(
        '<button type="button" id="edit" class="btn btn-default"><i class="fa fa-edit"></i> Edit</button>'
      );
      expect(helpers.editButton({hash: {text: 'hello'}}).string).toEqual(
        '<button type="button" id="edit" class="btn btn-default"><i class="fa fa-edit"></i> hello</button>'
      );
    });

    it("#cancelButton", function() {
      expect(helpers.cancelButton(options).string).toEqual(
        '<button type="button" id="cancel" class="btn btn-default">Cancel</button>'
      );
      expect(helpers.cancelButton({hash: {text: 'hello'}}).string).toEqual(
        '<button type="button" id="cancel" class="btn btn-default">hello</button>'
      );
    });

    it("#newButton", function() {
      expect(helpers.newButton(options).string).toEqual(
        '<button type="button" id="new" class="btn btn-default"><i class="fa fa-plus"></i> New</button>'
      );
      expect(helpers.newButton({hash: {text: 'hello'}}).string).toEqual(
        '<button type="button" id="new" class="btn btn-default"><i class="fa fa-plus"></i> hello</button>'
      );
    });

    it("#showButton", function() {
      expect(helpers.showButton(options).string).toEqual(
        '<button type="button" id="show" class="btn btn-xs btn-default">...</button>'
      );
      expect(helpers.showButton({hash: {text: 'hello'}}).string).toEqual(
        '<button type="button" id="show" class="btn btn-xs btn-default">...</button>'
      );
    });

    it("#actionButton", function() {
      expect(helpers.actionButton(options).string).toEqual(
        '<button type="button" id="action" class="btn btn-default"></button>'
      );
      expect(helpers.actionButton({hash: {text: 'hello', id: 'world', icon: 'fa-hello'}}).string).toEqual(
        '<button type="button" id="world" class="btn btn-default"><i class="fa fa-hello"></i> hello</button>'
      );
    });
  });

  describe("functions", function(){
    it("#buttonHTML", function(){
      expect(buttonHTML('hello', 'world', 'again').string).toEqual(
        '<button type="button" id="world" class="btn again">hello</button>'
      );
    });
  });
});

