import { createSelector } from 'reselect';
import { Map, List, fromJS } from 'immutable';
 
const categorySelector = state => state.categoryStore.get('categories');
const subcategorySelector = state => state.categoryStore.get('subcategories');
const categoryTypeSelector = state => state.categoryStore.get('categoryTypes');

function filteredCategoryGroups(categoryTypes, editableOnly=false) {
  if (editableOnly) {
    return categoryTypes.filter(categoryType => categoryType.get('editable'))
  }
  return categoryTypes;
}

function groupCategories(categoryTypes, categories, subcategories, editableOnly=false) {
  let categoryGroups = categories.groupBy(category => category.get('categoryTypeId'));
  return filteredCategoryGroups(categoryTypes, editableOnly).map(categoryType => {
    let categoriesForType = sorted(categoryGroups.get(categoryType.get('id')));
    if (categoriesForType) {
      let categoriesWithSubcategories = categoriesForType.map(category => {
        let subcategoriesForCategory = subcategories.filter(
          subcategory => subcategory.get('categoryId') === category.get('id')
        );
        return category.set('subcategories', sorted(subcategoriesForCategory));
      });
      return Map({categoryType: categoryType, categories: categoriesWithSubcategories});
    }
  });
}

function sorted(items) {
  return items.sortBy(item => item.get('name').toLowerCase());
}

export const groupedCategories = createSelector(
  categoryTypeSelector,
  categorySelector,
  subcategorySelector,
  (categoryTypes, categories, subcategories) => groupCategories(categoryTypes, categories, subcategories)
);

export const editableGroupedCategories = createSelector(
  categoryTypeSelector,
  categorySelector,
  subcategorySelector,
  (categoryTypes, categories, subcategories) => groupCategories(categoryTypes, categories, subcategories, true)
);

