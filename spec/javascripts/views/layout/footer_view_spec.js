describe('FooterView', function(){
  it('has quick links', function(){
    view = new MyMoney.Views.FooterView();
    view.render();
    expect(view.el).toContainText('quick links');
  });
});