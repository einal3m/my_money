
export function memoAndNotes(transaction) {
  let text = transaction.memo || '';
  text += transaction.memo && transaction.notes ? '/' : '';
  text += transaction.notes || '';
  return text;
}

export function categoryAndSubcategory(transaction, groupedCategories) {
  if (!transaction.categoryId) return '';

  const category = selectedCategory(transaction.categoryId, groupedCategories);
  if (!transaction.subcategoryId) return category.name;

  const subcategory = selectedSubcategory(transaction.subcategoryId, category);
  return `${category.name}/${subcategory.name}`;
}

export function accountNameAndBank(account) {
  if (account.bank) {
    return `${account.name} (${account.bank})`;
  }
  return account.name;
}

export function transferTo(transaction, matchingTransaction, accounts) {
  const matchingAccount = accounts.filter(
    account => account.id === matchingTransaction.accountId
  )[0];

  const toOrFrom = transaction.amount > 0 ? 'from' : 'to';

  return `Transfer ${toOrFrom}: ${accountNameAndBank(matchingAccount)}`;
}

function selectedCategory(categoryId, groupedCategories) {
  return groupedCategories.map(categoryType =>
    categoryType.categories.filter(category => category.id === categoryId)
  ).filter(c => c.length > 0)[0][0];
}

function selectedSubcategory(subcategoryId, category) {
  return category.subcategories.filter(subcategory => subcategory.id === subcategoryId)[0];
}
