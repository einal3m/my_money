beforeEach(() => {
  jasmine.Ajax.install();
});


afterEach(() => {
  expect(jasmine.Ajax.requests.mostRecent()).toBeUndefined();
  jasmine.Ajax.uninstall();
});
