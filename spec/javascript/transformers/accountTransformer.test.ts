import {
  transformFromApi,
  transformToApi,
} from 'transformers/accountTransformer'

describe('AccountTransformer', () => {
  describe('transformToApi', () => {
    it('converts savings account to API format', () => {
      const account = {
        name: 'myAccount',
        bank: 'myBank',
        accountType: 'savings',
        openingBalance: 300,
        openingBalanceDate: '2015-04-01',
        currentBalance: 1000,
      }

      const transformedAccount = transformToApi(account)

      expect(transformedAccount.account_type).toEqual('savings')
      expect(transformedAccount.name).toEqual('myAccount')
      expect(transformedAccount.bank).toEqual('myBank')
      expect(transformedAccount.starting_date).toEqual('2015-04-01')
      expect(transformedAccount.starting_balance).toEqual(300)
    })

    it('converts home loan account to API format', () => {
      const account = {
        name: 'myAccount',
        bank: 'myBank',
        accountType: 'loan',
        limit: 3000,
        term: 30,
        interestRate: 5.77,
        openingBalanceDate: '2015-04-01',
        currentBalance: 200,
      }

      const transformedAccount = transformToApi(account)

      expect(transformedAccount.account_type).toEqual('loan')
      expect(transformedAccount.name).toEqual('myAccount')
      expect(transformedAccount.bank).toEqual('myBank')
      expect(transformedAccount.limit).toEqual(3000)
      expect(transformedAccount.term).toEqual(30)
      expect(transformedAccount.interest_rate).toEqual(5.77)
      expect(transformedAccount.starting_date).toEqual('2015-04-01')
    })

    it('converts share account to API format', () => {
      const account = {
        accountType: 'share',
        name: 'myAccount',
        ticker: 'myTicker',
        currentBalance: 123,
      }

      const transformedAccount = transformToApi(account)

      expect(transformedAccount.account_type).toEqual('share')
      expect(transformedAccount.name).toEqual('myAccount')
      expect(transformedAccount.ticker).toEqual('myTicker')
    })
  })

  describe('transformFromApi', () => {
    it('converts savings account from API format', () => {
      const account = {
        id: 11,
        account_type: 'savings',
        name: 'myAccount',
        bank: 'myBank',
        starting_balance: 300,
        starting_date: '2015-04-01',
        current_balance: 5000,
        deleted_at: '2022-01-01',
      }

      const transformedAccount = transformFromApi(account)

      expect(transformedAccount.id).toEqual(11)
      expect(transformedAccount.accountType).toEqual('savings')
      expect(transformedAccount.name).toEqual('myAccount')
      expect(transformedAccount.bank).toEqual('myBank')
      expect(transformedAccount.openingBalance).toEqual(300)
      expect(transformedAccount.openingBalanceDate).toEqual('2015-04-01')
      expect(transformedAccount.currentBalance).toEqual(5000)
      expect(transformedAccount.deletedAt).toEqual('2022-01-01')
    })

    it('converts loan account from API format', () => {
      const account = {
        id: 11,
        account_type: 'loan',
        name: 'myAccount',
        bank: 'myBank',
        limit: 3000,
        term: 30,
        interest_rate: 5.77,
        starting_date: '2015-04-01',
        current_balance: 2000,
        deleted_at: '2022-01-01',
      }

      const transformedAccount = transformFromApi(account)

      expect(transformedAccount.id).toEqual(11)
      expect(transformedAccount.accountType).toEqual('loan')
      expect(transformedAccount.name).toEqual('myAccount')
      expect(transformedAccount.bank).toEqual('myBank')
      expect(transformedAccount.limit).toEqual(3000)
      expect(transformedAccount.term).toEqual(30)
      expect(transformedAccount.interestRate).toEqual(5.77)
      expect(transformedAccount.openingBalanceDate).toEqual('2015-04-01')
      expect(transformedAccount.currentBalance).toEqual(2000)
      expect(transformedAccount.deletedAt).toEqual('2022-01-01')
    })

    it('converts share account from API format', () => {
      const account = {
        id: 11,
        account_type: 'share',
        name: 'myAccount',
        ticker: 'myTicker',
        current_balance: 5000,
        deleted_at: '2022-01-01',
      }

      const transformedAccount = transformFromApi(account)

      expect(transformedAccount.id).toEqual(11)
      expect(transformedAccount.accountType).toEqual('share')
      expect(transformedAccount.name).toEqual('myAccount')
      expect(transformedAccount.ticker).toEqual('myTicker')
      expect(transformedAccount.currentBalance).toEqual(5000)
      expect(transformedAccount.deletedAt).toEqual('2022-01-01')
    })
  })
})
