import accountSelector from '../account-selector';
import { fromJS } from 'immutable';

describe('AccountSelector', () => {
  it('groups accounts in account groups', () => {
    let account1 = {id: 11, name: 'account1', accountType: 'share'};
    let account2 = {id: 12, name: 'account2', accountType: 'savings'};
    let account3 = {id: 13, name: 'account3', accountType: 'savings'};

    let groupedAccounts = accountSelector({
      accountStore: fromJS({
        accountTypes: [{ id: 1, code: 'savings', name: 'Savings' }, { id: 2, code: 'share', name: 'Share' }],
        accounts: [account1, account2, account3]
      })
    }).toJS();

    expect(groupedAccounts).toEqual({
      'share': [account1],
      'savings': [account2, account3]
    });
  });
});
