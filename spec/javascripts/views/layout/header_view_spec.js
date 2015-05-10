describe('HeaderView', function(){
  it('has app name', function(){
    view = new MyMoney.Views.HeaderView();
    view.render();
    expect(view.el).toContainText('my money');
  });
});