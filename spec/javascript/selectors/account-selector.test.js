import { fromJS } from 'immutable';
import accountSelector, { activeAccountSelector} from 'selectors/account-selector';

describe('AccountSelector', () => {
  it('groups accounts in account groups', () => {
    const account1 = { id: 11, name: 'account1', accountType: 'share' };
    const account2 = { id: 12, name: 'account2', accountType: 'savings' };
    const account3 = { id: 13, name: 'account3', accountType: 'savings' };

    const groupedAccounts = accountSelector({
      accountStore: fromJS({
        accountTypes: [{ id: 1, code: 'savings', name: 'Savings' }, { id: 2, code: 'share', name: 'Share' }, { id: 3, code: 'loan', name: 'Loan' }],
        accounts: [account1, account2, account3],
      }),
    }).toJS();

    expect(groupedAccounts).toEqual({
      share: [account1],
      savings: [account2, account3],
    });
  });

  it('groups only active accounts in account groups', () => {
    const account1 = { id: 11, name: 'account1', accountType: 'share', deletedAt: null };
    const account2 = { id: 12, name: 'account2', accountType: 'savings', deletedAt: null };
    const account3 = { id: 13, name: 'account3', accountType: 'share', deletedAt: '2022-01-01' };
    const account4 = { id: 14, name: 'account4', accountType: 'savings', deletedAt: null };
    const account5 = { id: 15, name: 'account5', accountType: 'savings', deletedAt: '2022-01-01' };

    const activeAccounts = activeAccountSelector({
      accountStore: fromJS({
        accountTypes: [{ id: 1, code: 'savings', name: 'Savings' }, { id: 2, code: 'share', name: 'Share' }],
        accounts: [account1, account2, account3, account4, account5],
      }),
    }).toJS();

    expect(activeAccounts).toEqual({
      share: [account1],
      savings: [account2, account4],
    });
  });
});
