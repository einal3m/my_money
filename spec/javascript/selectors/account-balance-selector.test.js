import { List, Map, fromJS } from 'immutable';
import accountBalanceSelector from '../account-balance-selector';

describe('AccountBalanceSelector', () => {
  it('converts account balance into line chart form', () => {
    const accountBalances = Map()
      .set(3, fromJS([['01 Mar, 2016', 1111], ['15 Mar, 2016', 4444]]))
      .set(4, fromJS([['02 Mar, 2016', 2222], ['16 Mar, 2016', 5555]]))
      .set(5, fromJS([['03 Mar, 2016', -3333], ['14 Mar, 2016', -6666]]));

    const selectedAccounts = List([5, 3]);
    const accounts = [{ id: 3, name: 'Account3' }, { id: 5, name: 'Account5' }];

    const seriesData = accountBalanceSelector({
      reportStore: Map({ accountBalances }),
      accountStore: fromJS({ accounts, selectedAccounts }),
    });

    const series1 = seriesData.get(0);
    const series2 = seriesData.get(1);

    expect(series1.get('name')).toEqual('Account5');
    const data1 = series1.get('data');
    expect(data1.get(0).get(0)).toEqual(new Date('3 Mar, 2016'));
    expect(data1.get(0).get(1)).toEqual(-33.33);
    expect(data1.get(1).get(0)).toEqual(new Date('14 Mar, 2016'));
    expect(data1.get(1).get(1)).toEqual(-66.66);

    const data2 = series2.get('data');
    expect(series2.get('name')).toEqual('Account3');
    expect(data2.get(0).get(0)).toEqual(new Date('1 Mar, 2016'));
    expect(data2.get(0).get(1)).toEqual(11.11);
    expect(data2.get(1).get(0)).toEqual(new Date('15 Mar, 2016'));
    expect(data2.get(1).get(1)).toEqual(44.44);
  });

  it('returns an empty list when there are no selected accounts', () => {
    const seriesData = accountBalanceSelector({
      reportStore: fromJS({ accountBalances: {} }),
      accountStore: fromJS({ accounts: [], selectedAccounts: [] }),
    });

    expect(seriesData.size).toEqual(0);
  });

  it('returns an empty list when there is no accountBalance data', () => {
    const seriesData = accountBalanceSelector({
      reportStore: fromJS({ accountBalances: {} }),
      accountStore: fromJS({ accounts: [{ id: 1, name: 'Melanie' }], selectedAccounts: [1] }),
    });

    expect(seriesData.size).toEqual(0);
  });
});
