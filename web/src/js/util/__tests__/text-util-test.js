import { memoAndNotes, categoryAndSubcategory, accountNameAndBank, transferTo } from '../text-util';

describe('textUtil', () => {
  describe('memoAndNotes', () => {
    it('returns a string with both memo and notes', () => {
      const transaction = { memo: 'my memo', notes: 'my notes' };
      expect(memoAndNotes(transaction)).toEqual('my memo/my notes');
    });

    it('returns a string with only memo', () => {
      const transaction = { memo: 'my memo' };
      expect(memoAndNotes(transaction)).toEqual('my memo');
    });

    it('returns a string with only notes', () => {
      const transaction = { notes: 'my notes' };
      expect(memoAndNotes(transaction)).toEqual('my notes');
    });
  });

  describe('categoryAndSubcategory', () => {
    const groupedCategories = [
      {
        categoryType: { id: 1, name: 'Expense' },
        categories: [
          { id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }, { id: 6, name: 'Horse' }] },
          { id: 4, name: 'Mouse', subcategories: [{ id: 5, name: 'Cow' }] },
        ],
      },
    ];

    it('returns a string with both category and subcategory names', () => {
      const transaction = { categoryId: 3, subcategoryId: 6 };
      expect(categoryAndSubcategory(transaction, groupedCategories)).toEqual('Cat/Horse');
    });

    it('returns a string with category name', () => {
      const transaction = { categoryId: 4 };
      expect(categoryAndSubcategory(transaction, groupedCategories)).toEqual('Mouse');
    });

    it('returns an empty string when category and subcategory are null', () => {
      const transaction = { };
      expect(categoryAndSubcategory(transaction, groupedCategories)).toEqual('');
    });
  });

  describe('accountNameAndBank', () => {
    it('returns a string with both account name and bank', () => {
      const account = { name: 'My Account Name', bank: 'My Account Bank' };
      expect(accountNameAndBank(account)).toEqual('My Account Name (My Account Bank)');
    });

    it('returns only the account name, when bank is undefined', () => {
      const account = { name: 'My Account Name' };
      expect(accountNameAndBank(account)).toEqual('My Account Name');
    });
  });

  describe('transferTo', () => {
    it('returns a string with Transfer to: account name (bank)', () => {
      const accounts = [{ id: 1 }, { id: 2, name: 'My Account Name', bank: 'My Account Bank' }];
      const transaction = { accountId: 2 };
      expect(transferTo(transaction, accounts)).toEqual('Transfer to: My Account Name (My Account Bank)');
    });
  });
});
