
let transactionTransformer = {
  transformToApi(transaction) {
    return {
      id: transaction.id,
      account_id: transaction.accountId,
      date: transaction.date,
      amount: transaction.amount,
      category_id: transaction.categoryId,
      subcategory_id: transaction.subcategoryId,
      notes: transaction.notes
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
      notes: transaction.notes
    };
  }
}

export default transactionTransformer;