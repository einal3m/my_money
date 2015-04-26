describe('BaseView', function(){
  var view, subView;
  beforeEach(function(){
    view = new MyMoney.Views.BaseView();
  });

  describe('initialize', function(){
    it('subViews', function(){
      expect(view.subViews).toEqual({});
    });
  });

  describe('subViews', function(){
    beforeEach(function(){
      subView = new Backbone.View();
    });

    it('stores the subview', function(){
      expect(view.addSubView('test', subView)).toEqual(subView);
      expect(view.subViews['test']).toEqual(subView);
    });

    it('replaces the sub view', function(){
      spyOn(subView, 'remove');
      view.addSubView('test', subView);
      var subView2 = new Backbone.View();
      view.addSubView('test', subView2);
      expect(view.subViews['test']).toEqual(subView2);
      expect(subView.remove).toHaveBeenCalled();
    });
  });

  describe('fetchData', function(){
    it('does nothing by default', function(){
      expect(view.fetchData().state()).toEqual('resolved');
    });
  });
});
