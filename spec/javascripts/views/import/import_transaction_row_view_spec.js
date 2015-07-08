describe("MyMoney.Views.ImportTransactionRowView", function(){
  var view, transaction, categories, subcategories, categoryTypes;
  beforeEach(function(){
    categoryTypes = new MyMoney.Collections.CategoryTypes([{id: 1, name: 'Income'}]);
    categories = new MyMoney.Collections.Categories([
      { id: 2, name: 'Category1', category_type_id: 1 },
      { id: 4, name: 'Category2', category_type_id: 1 }
    ]);
    subcategories = new MyMoney.Collections.Subcategories([
      { id: 3, name: 'Subcategory1', category_id: 2 },
      { id: 5, name: 'Subcategory2', category_id: 4 }
    ]);
    transaction = new MyMoney.Models.Transaction({
      id: 2,
      date: '2014-09-02',
      memo: 'Memo1',
      amount: 2001,
      category_id: 2,
      subcategory_id: 3,
      notes: 'This is a note',
      duplicate: false,
      import: false
    });

    view = new MyMoney.Views.ImportTransactionRowView({
      model: transaction,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(transaction);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row", function(){
      expect(view.el).toEqual('tr');

      var columns = view.$('td');
      expect(columns.length).toEqual(7);
      expect(columns[0]).toContainText('2-Sep-2014');
      expect(columns[1]).toContainText('Memo1');
      expect(columns[2]).toContainElement('input#notes');
      expect(view.$('#notes').val()).toEqual('This is a note')
      expect(columns[3]).toContainElement('select#category_id');
      expect(columns[3]).toContainText('Category1');
      expect(columns[4]).toContainElement('select#subcategory_id');
      expect(columns[4]).toContainText('Subcategory1');
      expect(columns[5]).toContainText('$20.01');
      expect(columns[6]).toContainElement('input#import');
      expect(view.$('#import')[0].checked).toBeFalsy();
    });

    it('sets class to danger if duplicate transaction', function(){
      transaction.set('duplicate', true);
      view.render();
      expect(view.el).toHaveClass('danger');
    });

    it('checks checkbox when import set to true', function(){
      view.model.set('import', true);
      view.render();
      expect(view.$('#import')[0].checked).toBeTruthy();
    });

    describe('updates model', function() {
      it('notes', function(){
        view.$('#notes').val('New Note').change();
        expect(view.model.get('notes')).toEqual('New Note');
      });

      it('category and subcategory', function(){
        view.$('#category_id').val('4').change();
        expect(view.model.get('category_id')).toEqual(4);
        expect(view.model.get('subcategory_id')).toEqual(null);        

        view.$('#subcategory_id').val('5').change();
        expect(view.model.get('subcategory_id')).toEqual(5);
      });
    });

    describe('events', function(){
      xit('click on checkbox updates model', function(){
        expect(transaction.get('import')).toBeFalsy();
        view.$('#import').click();
        expect(transaction.get('import')).toBeTruthy();
        view.$('#import').click();
        expect(transaction.get('import')).toBeFalsy();
      });
    });
  });
});
