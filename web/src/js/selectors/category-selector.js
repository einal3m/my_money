import { createSelector } from 'reselect';
import { Map, fromJS } from 'immutable';
 
const categorySelector = state => state.categoryStore.get('categories');
const categoryTypeSelector = state => state.categoryStore.get('categoryTypes');

function groupedCategories(categoryTypes, categories) {
  let categoryGroups = categories.groupBy(category => category.get('categoryTypeId'));

  return (categoryTypes).filter(categoryType => categoryType.get('editable')).map(categoryType => {
    let categoriesForType = categoryGroups.get(categoryType.get('id'));
    if (categoriesForType) {
      return Map({categoryType: categoryType, categories: categoriesForType});
    }
  });
}

export default createSelector(
  categoryTypeSelector,
  categorySelector,
  (categoryTypes, categories) => groupedCategories(categoryTypes, categories)
);
