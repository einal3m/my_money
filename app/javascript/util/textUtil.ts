import {
  CategoryWithSubcatories,
  GroupedCategories,
} from 'hooks/useGroupedCategories'
import {
  Account,
  Category,
  MatchingTransaction,
  Subcategory,
  Transaction,
} from 'types/models'

export const memoAndNotes = (transaction: Transaction): string => {
  let text = transaction.memo || ''
  text += transaction.memo && transaction.notes ? '/' : ''
  text += transaction.notes || ''
  return text
}

export const categoryAndSubcategory = (
  transaction: Transaction,
  groupedCategories: GroupedCategories[],
): string => {
  if (!transaction.categoryId) return ''

  const category = selectedCategory(transaction.categoryId, groupedCategories)
  if (!transaction.subcategoryId) return category.name

  const subcategory = selectedSubcategory(transaction.subcategoryId, category)
  return `${category.name}/${subcategory.name}`
}

export const accountNameAndBank = (account: Account): string => {
  if (account.bank) {
    return `${account.name} (${account.bank})`
  }
  return account.name
}

export const transferTo = (
  transaction: Transaction,
  matchingTransaction: MatchingTransaction,
  accounts: Account[],
): string => {
  const matchingAccount = accounts.filter(
    (account) => account.id === matchingTransaction.accountId,
  )[0]

  const toOrFrom = transaction.amount > 0 ? 'from' : 'to'

  return `Transfer ${toOrFrom}: ${accountNameAndBank(matchingAccount)}`
}

const selectedCategory = (
  categoryId: number,
  groupedCategories: GroupedCategories[],
): CategoryWithSubcatories => {
  return groupedCategories
    .map((categoryType) =>
      categoryType.categories.filter((category) => category.id === categoryId),
    )
    .filter((c) => c.length > 0)[0][0]
}

const selectedSubcategory = (
  subcategoryId: number,
  category: CategoryWithSubcatories,
): Subcategory => {
  return category.subcategories.filter(
    (subcategory) => subcategory.id === subcategoryId,
  )[0]
}
