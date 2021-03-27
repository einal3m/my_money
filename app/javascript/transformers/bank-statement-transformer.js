
const bankStatementTranformer = {
  transformFromApi(bankStatement) {
    return {
      id: bankStatement.id,
      accountId: bankStatement.account_id,
      fileName: bankStatement.file_name,
      date: bankStatement.date,
      transactionCount: bankStatement.transaction_count,
    };
  },
};

export default bankStatementTranformer;
