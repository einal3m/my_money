
const transactionTransformer = {
  transformToApi(transaction) {
    return {
      id: transaction.id,
      account_id: transaction.accountId,
      date: transaction.date,
      amount: transaction.amount,
      category_id: transaction.categoryId,
      subcategory_id: transaction.subcategoryId,
      notes: transaction.notes,
      memo: transaction.memo,
    };
  },

  transformFromApi(transaction) {
    return {
      id: transaction.id,
      accountId: transaction.account_id,
      date: transaction.date,
      amount: transaction.amount,
      categoryId: transaction.category_id,
      subcategoryId: transaction.subcategory_id,
      notes: transaction.notes,
      memo: transaction.memo,
      balance: transaction.balance,
    };
  },

  transformFromOfxApi(transaction) {
    return {
      accountId: transaction.account_id,
      date: transaction.date,
      memo: transaction.memo,
      amount: transaction.amount,
      categoryId: transaction.category_id,
      subcategoryId: transaction.subcategory_id,
      notes: transaction.notes,
      import: transaction.import,
      duplicate: transaction.duplicate,
    };
  },
};

export default transactionTransformer;
