
const accountTransformer = {
  transformToApi(account) {
    switch (account.accountType) {
      case 'savings':
        return {
          account_type: account.accountType,
          name: account.name,
          bank: account.bank,
          starting_date: account.openingBalanceDate,
          starting_balance: account.openingBalance,
        };
      case 'share':
        return {
          account_type: account.accountType,
          name: account.name,
          ticker: account.ticker,
        };
      case 'loan':
        return {
          account_type: account.accountType,
          name: account.name,
          bank: account.bank,
          limit: account.limit,
          term: account.term,
          interest_rate: account.interestRate,
          starting_date: account.openingBalanceDate,
        };
      default:
        throw new Error('Unknown account type');
    }
  },

  transformFromApi(account) {
    switch (account.account_type) {
      case 'savings':
        return {
          id: account.id,
          accountType: account.account_type,
          name: account.name,
          bank: account.bank,
          openingBalance: account.starting_balance,
          openingBalanceDate: account.starting_date,
          currentBalance: account.current_balance,
        };
      case 'share':
        return {
          id: account.id,
          accountType: account.account_type,
          ticker: account.ticker,
          name: account.name,
          currentBalance: account.current_balance,
        };
      case 'loan':
        return {
          id: account.id,
          accountType: account.account_type,
          name: account.name,
          bank: account.bank,
          limit: account.limit,
          term: account.term,
          interestRate: account.interest_rate,
          openingBalanceDate: account.starting_date,
          currentBalance: account.current_balance,
        };
      default:
        throw new Error('Unknown account type');
    }
  },
};

export default accountTransformer;
