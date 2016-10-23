
const accountTransformer = {
  transformToApi(account) {
    if (account.accountType === 'savings') {
      return {
        account_type: account.accountType,
        name: account.name,
        bank: account.bank,
        starting_date: account.openingBalanceDate,
        starting_balance: account.openingBalance,
      };
    } else if (account.accountType === 'share') {
      return {
        account_type: account.accountType,
        name: account.name,
        ticker: account.ticker,
      };
    }
    throw ('Unknown account type');
  },

  transformFromApi(account) {
    if (account.account_type === 'savings') {
      return {
        id: account.id,
        accountType: account.account_type,
        name: account.name,
        bank: account.bank,
        openingBalance: account.starting_balance,
        openingBalanceDate: account.starting_date,
        currentBalance: account.current_balance,
      };
    } else if (account.account_type === 'share') {
      return {
        id: account.id,
        accountType: account.account_type,
        ticker: account.ticker,
        name: account.name,
        currentBalance: account.current_balance,
      };
    }
    throw ('Unknown account type');
  },
};

export default accountTransformer;
