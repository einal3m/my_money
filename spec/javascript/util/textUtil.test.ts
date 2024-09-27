import { GroupedCategories } from 'hooks/useGroupedCategories'
import {
  memoAndNotes,
  categoryAndSubcategory,
  accountNameAndBank,
  transferTo,
} from 'util/textUtil'

describe('textUtil', () => {
  describe('memoAndNotes', () => {
    it('returns a string with both memo and notes', () => {
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 100,
        memo: 'my memo',
        notes: 'my notes',
      }
      expect(memoAndNotes(transaction)).toEqual('my memo/my notes')
    })

    it('returns a string with only memo', () => {
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 100,
        memo: 'my memo',
      }
      expect(memoAndNotes(transaction)).toEqual('my memo')
    })

    it('returns a string with only notes', () => {
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 100,
        notes: 'my notes',
      }
      expect(memoAndNotes(transaction)).toEqual('my notes')
    })
  })

  describe('categoryAndSubcategory', () => {
    const groupedCategories: GroupedCategories[] = [
      {
        categoryType: {
          id: 1,
          name: 'Expense',
          code: 'expense',
          editable: true,
        },
        categories: [
          {
            id: 3,
            name: 'Cat',
            categoryTypeId: 1,
            subcategories: [
              { id: 5, categoryId: 3, name: 'Dog' },
              { id: 6, categoryId: 3, name: 'Horse' },
            ],
          },
          {
            id: 4,
            categoryTypeId: 1,
            name: 'Mouse',
            subcategories: [{ id: 5, categoryId: 4, name: 'Cow' }],
          },
        ],
      },
    ]

    it('returns a string with both category and subcategory names', () => {
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 100,
        categoryId: 3,
        subcategoryId: 6,
      }
      expect(categoryAndSubcategory(transaction, groupedCategories)).toEqual(
        'Cat/Horse',
      )
    })

    it('returns a string with category name', () => {
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 100,
        categoryId: 4,
      }
      expect(categoryAndSubcategory(transaction, groupedCategories)).toEqual(
        'Mouse',
      )
    })

    it('returns an empty string when category and subcategory are null', () => {
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 100,
      }
      expect(categoryAndSubcategory(transaction, groupedCategories)).toEqual('')
    })
  })

  describe('accountNameAndBank', () => {
    it('returns a string with both account name and bank', () => {
      const account = {
        id: 1,
        accountType: 'savings',
        name: 'My Account Name',
        bank: 'My Account Bank',
        currentBalance: 100,
      }
      expect(accountNameAndBank(account)).toEqual(
        'My Account Name (My Account Bank)',
      )
    })

    it('returns only the account name, when bank is undefined', () => {
      const account = {
        id: 1,
        accountType: 'savings',
        name: 'My Account Name',
        currentBalance: 100,
      }
      expect(accountNameAndBank(account)).toEqual('My Account Name')
    })
  })

  describe('transferTo', () => {
    it('returns a string with Transfer to: account name (bank) when amount is negative', () => {
      const accounts = [
        {
          id: 1,
          name: 'other account',
          accountType: 'savings',
          currentBalance: 100,
        },
        {
          id: 2,
          name: 'My Account Name',
          bank: 'My Account Bank',
          accountType: 'savings',
          currentBalance: 100,
        },
      ]
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: -400,
      }
      const matchingTransaction = { id: 2, accountId: 2 }
      expect(transferTo(transaction, matchingTransaction, accounts)).toEqual(
        'Transfer to: My Account Name (My Account Bank)',
      )
    })

    it('returns a string with Transfer from: account name (bank) when amount is positive', () => {
      const accounts = [
        {
          id: 1,
          name: 'other account',
          accountType: 'savings',
          currentBalance: 100,
        },
        {
          id: 2,
          name: 'My Account Name',
          bank: 'My Account Bank',
          accountType: 'savings',
          currentBalance: 100,
        },
      ]
      const transaction = {
        id: 1,
        accountId: 1,
        date: '2024-10-10',
        amount: 400,
      }
      const matchingTransaction = { id: 2, accountId: 2 }
      expect(transferTo(transaction, matchingTransaction, accounts)).toEqual(
        'Transfer from: My Account Name (My Account Bank)',
      )
    })
  })
})
