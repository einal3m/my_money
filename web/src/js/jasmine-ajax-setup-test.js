beforeEach(function() {
  jasmine.Ajax.install();
});


afterEach(function() {
  expect(jasmine.Ajax.requests.mostRecent()).toBeUndefined();
  jasmine.Ajax.uninstall();
});
