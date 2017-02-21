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

function convertIncomeVsExpense(type, incomeVsExpense, categoryNames, subcategoryNames) {
  if (incomeVsExpense.size === 0) return Map({});

  const converter = type === 'table' ? convertToTableData : convertToPieChartData;

  return Map({
    income: converter('income', incomeVsExpense.get('income'), categoryNames, subcategoryNames),
    expense: converter('expense', incomeVsExpense.get('expense'), categoryNames, subcategoryNames),
  });
}

function sortedGroupData(groupData, categoryNames) {
  return groupData.get('category_totals').map(category => Map({
    type: 'category',
    categoryId: category.get('category_id'),
    name: categoryNames.get(category.get('category_id')) || 'Un-assigned',
    amount: category.get('sum'),
  })).sort(sortByName);
}

function convertToTableData(type, groupData, categoryNames, subcategoryNames) {
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
  const categoryData = sortedGroupData(groupData, categoryNames);

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

function convertToPieChartData(type, groupData, categoryNames) {
  // array of sorted category totals
  const categoryData = sortedGroupData(groupData, categoryNames);
  const factor = type === 'income' ? 1 : -1;

  const data = categoryData.map(category => factor * category.get('amount'));
  const labels = categoryData.map(category => category.get('name'));

  return Map({
    total: factor * groupData.get('total'),
    data,
    labels,
  });
}

export const pieChartData = createSelector(
  incomeVsExpenseSelector,
  categoryNameSelector,
  (incomeVsExpense, categoryNames) => convertIncomeVsExpense('pie', incomeVsExpense, categoryNames)
);

export const tableData = createSelector(
  incomeVsExpenseSelector,
  categoryNameSelector,
  subcategoryNameSelector,
  (incomeVsExpense, categoryNames, subcategoryNames) =>
    convertIncomeVsExpense('table', incomeVsExpense, categoryNames, subcategoryNames)
);
