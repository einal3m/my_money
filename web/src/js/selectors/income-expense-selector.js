import { Map, List } from 'immutable';
import { createSelector } from 'reselect';

const incomeVsExpenseSelector = state => state.reportStore.get('incomeVsExpense');
const categorySelector = state => state.categoryStore.get('categories');
const subcategorySelector = state => state.categoryStore.get('subcategories');

const categoryNameSelector = createSelector(
  categorySelector,
  categories => Map(categories.map(category => [category.get('id'), category.get('name')]))
);

const subcategoryNameSelector = createSelector(
  subcategorySelector,
  subcategories => Map(subcategories.map(subcategory => [subcategory.get('id'), subcategory.get('name')]))
);

const sortByName = (a, b) => a.get('name') !== 'Un-assigned' ? a.get('name').localeCompare(b.get('name')) : 1;

function convertIncomeVsExpense(incomeVsExpense, categoryNames, subcategoryNames, type) {
  if (incomeVsExpense.size === 0) return Map({});

  const converter = type === 'table' ? convertToTableData : convertToPieChartData;

  return Map({
    income: converter(incomeVsExpense.get('income'), categoryNames, subcategoryNames),
    expense: converter(incomeVsExpense.get('expense'), categoryNames, subcategoryNames),
  });
}

function convertToTableData(groupData, categoryNames, subcategoryNames) {
  // array of sorted subcategory totals grouped by category
  const groupedSubcategoryData = groupData.get('subcategory_totals').map(subcategory => Map({
    type: 'subcategory',
    categoryId: subcategory.get('category_id'),
    subcategoryId: subcategory.get('subcategory_id'),
    name: subcategoryNames.get(subcategory.get('subcategory_id')) || 'Un-assigned',
    amount: subcategory.get('sum'),
  })).sort(sortByName)
    .groupBy(subcategory => subcategory.get('categoryId'));

  // array of sorted category totals
  const categoryData = groupData.get('category_totals').map(category => Map({
    type: 'category',
    categoryId: category.get('category_id'),
    name: categoryNames.get(category.get('category_id')) || 'Un-assigned',
    amount: category.get('sum'),
  })).sort(sortByName);

  let rows = List();
  categoryData.forEach((category) => {
    rows = rows.push(category);
    const subcategoryData = groupedSubcategoryData.get(category.get('categoryId'));
    if (subcategoryData) rows = rows.concat(subcategoryData);
  });

  return Map({
    total: groupData.get('total'),
    rows,
  });
}

function convertToPieChartData() {
  return [];
}

export const pieChartData = createSelector(
  incomeVsExpenseSelector,
  incomeVsExpense => convertIncomeVsExpense(incomeVsExpense, 'pie')
);

export const tableData = createSelector(
  incomeVsExpenseSelector,
  categoryNameSelector,
  subcategoryNameSelector,
  (incomeVsExpense, categoryNames, subcategoryNames) =>
    convertIncomeVsExpense(incomeVsExpense, categoryNames, subcategoryNames, 'table')
);
