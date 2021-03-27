import React from 'react';
import AccountIcon from '../account-icon';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import BankIcon from '../../common/icons/bank-icon';
import PiggyBankIcon from '../../common/icons/piggy-bank-icon';
import HomeIcon from '../../common/icons/home-icon';

describe('AccountIcon', () => {
  describe('render', () => {
    it('displays a piggy bank icon if account type is savings', () => {
      const icon = shallowRenderer(<AccountIcon accountType="savings" />);
      expect(icon.type).toEqual(PiggyBankIcon);
    });

    it('displays a bank icon if account type is share', () => {
      const icon = shallowRenderer(<AccountIcon accountType="share" />);
      expect(icon.type).toEqual(BankIcon);
    });

    it('displays a home icon if account type is loan', () => {
      const icon = shallowRenderer(<AccountIcon accountType="loan" />);
      expect(icon.type).toEqual(HomeIcon);
    });
  });
});
