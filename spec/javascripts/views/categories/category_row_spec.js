describe("CategoryRowView", function(){
  var view, account, categories, subcategories, categoryTypes, pattern;
  beforeEach(function(){
    category = new MyMoney.Models.Category({id: 3, name: 'Category1', category_type_id: 1});
    categories = new MyMoney.Collections.Categories([category]);
    var categoryType = new MyMoney.Models.CategoryType({id: 1, name: 'Category Type'});
    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([categoryType]);    

    view = new MyMoney.Views.CategoryRowView({
      model: category,
      collection: categories,
      categoryTypes: categoryTypes
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(category);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row with category name", function(){
      expect(view.el).toEqual('tr');
      expect(view.el).toContainText('Category1');
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked displays an edit view and is no longer clickable", function(){
      expect(view.editView).not.toBeDefined();
      view.$el.click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model).toEqual(category);
      expect(view.editView.collection).toEqual(categories);
      expect(view.editView.categoryTypes).toEqual(categoryTypes);
      expect(view.el).not.toHaveClass('clickable');
    });
  });

  describe('after edit event', function(){
    beforeEach(function(){
      view.render();
    });

    it("sets class to clickable", function(){
      expect(view.el).toHaveClass('clickable');
      expect(view.el).not.toHaveClass('editing');
      view.$el.click();
      expect(view.el).not.toHaveClass('clickable');
      expect(view.el).toHaveClass('editing');
      view.$('button#cancel').click();
      expect(view.el).toHaveClass('clickable');
      expect(view.el).not.toHaveClass('editing');
    });
  });
});