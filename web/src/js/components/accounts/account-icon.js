import React, { PropTypes } from 'react';
import BankIcon from '../common/icons/bank-icon';
import PiggyBankIcon from '../common/icons/piggy-bank-icon';
import HomeIcon from '../common/icons/home-icon';

const AccountIcon = (props) => {
  switch (props.accountType) {
    case 'savings':
      return <PiggyBankIcon />;
    case 'share':
      return <BankIcon />;
    case 'loan':
      return <HomeIcon />;
    default:
      return <span />;
  }
};

AccountIcon.propTypes = {
  accountType: PropTypes.string.isRequired,
};

export default AccountIcon;
