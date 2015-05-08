describe("CategoryRowView", function(){
  var view, account, transaction, transactions, categories, subcategories, categoryTypes;
  beforeEach(function(){
    categoryTypes = new MyMoney.Collections.CategoryTypes([
      {id: 1, name: 'Category Type'}
    ]);    
    categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Category1', category_type_id: 1},
      {id: 4, name: 'Category2', category_type_id: 1}      
    ]);
    subcategories = new MyMoney.Collections.Subcategories([
      {id: 5, name: 'Subcategory1', category_id: 3},
      {id: 6, name: 'Subcategory2', category_id: 4}      
    ]);
    transaction = new MyMoney.Models.Transaction({
      id: 7, 
      date: formatDate((new Date()).toDateString()),
      amount: 500,
      memo: 'This is a memo',
      notes: 'This is a note',
      category_id: 3,
      subcategory_id: 5,
      balance: 4000,
      reconciliation_id: 4
    });

    view = new MyMoney.Views.TransactionRowView({
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

    it("displays a table row with details", function(){
      expect(view.el).toEqual('tr');

      var columns = view.$('td');
      expect(columns.length).toEqual(7);
      expect(columns[0]).toContainText(transaction.get('date'));
      expect(columns[1]).toContainText('This is a memo/This is a note');
      expect(columns[1]).toContainText('Category1/Subcategory1');
      expect(columns[2]).toContainText('R');
      expect(columns[3]).toContainText('5.00');
      expect(columns[5]).toContainText('$40.00');
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked displays an edit view and is no longer clickable", function(){
      expect(view.editView).not.toBeDefined();
      view.$el.click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model).toEqual(transaction);
      expect(view.editView.categoryTypes).toEqual(categoryTypes);
      expect(view.editView.categories).toEqual(categories);
      expect(view.editView.subcategories).toEqual(subcategories);
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

  // function today() {
  //   var yyyy = this.getFullYear().toString();
  //   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  //   var dd  = this.getDate().toString();
  //   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  // }
});