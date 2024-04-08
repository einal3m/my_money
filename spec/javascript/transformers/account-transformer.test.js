import accountTransformer from "transformers/account-transformer";

describe("AccountTransformer", () => {
  describe("transformToApi", () => {
    it("converts savings account to API format", () => {
      const account = {
        name: "myAccount",
        bank: "myBank",
        accountType: "savings",
        openingBalance: 300,
        openingBalanceDate: "2015-04-01",
      };

      const transformedAccount = accountTransformer.transformToApi(account);

      expect(transformedAccount.account_type).toEqual("savings");
      expect(transformedAccount.name).toEqual("myAccount");
      expect(transformedAccount.bank).toEqual("myBank");
      expect(transformedAccount.starting_date).toEqual("2015-04-01");
      expect(transformedAccount.starting_balance).toEqual(300);
    });

    it("converts home loan account to API format", () => {
      const account = {
        name: "myAccount",
        bank: "myBank",
        accountType: "loan",
        limit: 3000,
        term: 30,
        interestRate: 5.77,
        openingBalanceDate: "2015-04-01",
      };

      const transformedAccount = accountTransformer.transformToApi(account);

      expect(transformedAccount.account_type).toEqual("loan");
      expect(transformedAccount.name).toEqual("myAccount");
      expect(transformedAccount.bank).toEqual("myBank");
      expect(transformedAccount.limit).toEqual(3000);
      expect(transformedAccount.term).toEqual(30);
      expect(transformedAccount.interest_rate).toEqual(5.77);
      expect(transformedAccount.starting_date).toEqual("2015-04-01");
    });

    it("converts share account to API format", () => {
      const account = {
        accountType: "share",
        name: "myAccount",
        ticker: "myTicker",
      };

      const transformedAccount = accountTransformer.transformToApi(account);

      expect(transformedAccount.account_type).toEqual("share");
      expect(transformedAccount.name).toEqual("myAccount");
      expect(transformedAccount.ticker).toEqual("myTicker");
    });

    it("throws an error for unknown account type", () => {
      expect(() => {
        accountTransformer.transformToApi({ accountType: "something" });
      }).toThrow();
    });
  });

  describe("transformFromApi", () => {
    it("converts savings account from API format", () => {
      const account = {
        id: 11,
        account_type: "savings",
        name: "myAccount",
        bank: "myBank",
        starting_balance: 300,
        starting_date: "2015-04-01",
        current_balance: 5000,
      };

      const transformedAccount = accountTransformer.transformFromApi(account);

      expect(transformedAccount.id).toEqual(11);
      expect(transformedAccount.accountType).toEqual("savings");
      expect(transformedAccount.name).toEqual("myAccount");
      expect(transformedAccount.bank).toEqual("myBank");
      expect(transformedAccount.openingBalance).toEqual(300);
      expect(transformedAccount.openingBalanceDate).toEqual("2015-04-01");
      expect(transformedAccount.currentBalance).toEqual(5000);
    });

    it("converts loan account from API format", () => {
      const account = {
        id: 11,
        account_type: "loan",
        name: "myAccount",
        bank: "myBank",
        limit: 3000,
        term: 30,
        interest_rate: 5.77,
        starting_date: "2015-04-01",
        current_balance: 2000,
      };

      const transformedAccount = accountTransformer.transformFromApi(account);

      expect(transformedAccount.id).toEqual(11);
      expect(transformedAccount.accountType).toEqual("loan");
      expect(transformedAccount.name).toEqual("myAccount");
      expect(transformedAccount.bank).toEqual("myBank");
      expect(transformedAccount.limit).toEqual(3000);
      expect(transformedAccount.term).toEqual(30);
      expect(transformedAccount.interestRate).toEqual(5.77);
      expect(transformedAccount.openingBalanceDate).toEqual("2015-04-01");
      expect(transformedAccount.currentBalance).toEqual(2000);
    });

    it("converts share account from API format", () => {
      const account = {
        id: 11,
        account_type: "share",
        name: "myAccount",
        ticker: "myTicker",
        current_balance: 5000,
      };

      const transformedAccount = accountTransformer.transformFromApi(account);

      expect(transformedAccount.id).toEqual(11);
      expect(transformedAccount.accountType).toEqual("share");
      expect(transformedAccount.name).toEqual("myAccount");
      expect(transformedAccount.ticker).toEqual("myTicker");
      expect(transformedAccount.currentBalance).toEqual(5000);
    });

    it("throws an error for unknown account type", () => {
      expect(() => {
        accountTransformer.transformFromApi({ account_type: "something" });
      }).toThrow();
    });
  });
});
