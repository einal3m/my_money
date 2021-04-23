import { fromJS } from 'immutable';
import accountSelector from 'selectors/account-selector';

describe('AccountSelector', () => {
  it('groups accounts in account groups', () => {
    const account1 = { id: 11, name: 'account1', accountType: 'share' };
    const account2 = { id: 12, name: 'account2', accountType: 'savings' };
    const account3 = { id: 13, name: 'account3', accountType: 'savings' };

    const groupedAccounts = accountSelector({
      accountStore: fromJS({
        accountTypes: [{ id: 1, code: 'savings', name: 'Savings' }, { id: 2, code: 'share', name: 'Share' }],
        accounts: [account1, account2, account3],
      }),
    }).toJS();

    expect(groupedAccounts).toEqual({
      share: [account1],
      savings: [account2, account3],
    });
  });
});
