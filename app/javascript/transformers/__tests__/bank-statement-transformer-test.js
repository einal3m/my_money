import bankStatementTranformer from '../bank-statement-transformer';

describe('BankStatementTranformer', () => {
  describe('transformFromApi', () => {
    it('converts bank statements from API format', () => {
      const bankStatementFromApi = {
        id: 11,
        account_id: 22,
        file_name: 'Filename.ofx',
        date: '2015-11-01',
        transaction_count: 4,
      };

      const transformedBankStatement = bankStatementTranformer.transformFromApi(bankStatementFromApi);

      expect(transformedBankStatement.id).toEqual(11);
      expect(transformedBankStatement.accountId).toEqual(22);
      expect(transformedBankStatement.fileName).toEqual('Filename.ofx');
      expect(transformedBankStatement.date).toEqual('2015-11-01');
      expect(transformedBankStatement.transactionCount).toEqual(4);
    });
  });
});
