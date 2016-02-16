import { createSelector } from 'reselect';
import { Map, List, fromJS } from 'immutable';
 
const categorySelector = state => state.categoryStore.get('categories');
const subcategorySelector = state => state.categoryStore.get('subcategories');
const categoryTypeSelector = state => state.categoryStore.get('categoryTypes');

function groupedCategories(categoryTypes, categories, subcategories) {
  let categoryGroups = categories.groupBy(category => category.get('categoryTypeId'));
  return categoryTypes.filter(categoryType => categoryType.get('editable')).map(categoryType => {
    let categoriesForType = categoryGroups.get(categoryType.get('id'));
    if (categoriesForType) {
      let categoriesWithSubcategories = categoriesForType.map(category => {
        let subcategoriesForCategory = subcategories.filter(
          subcategory => subcategory.get('categoryId') === category.get('id')
        );
        return category.set('subcategories', subcategoriesForCategory);
      });
      return Map({categoryType: categoryType, categories: categoriesWithSubcategories});
    }
  });
}

export default createSelector(
  categoryTypeSelector,
  categorySelector,
  subcategorySelector,
  (categoryTypes, categories, subcategories) => groupedCategories(categoryTypes, categories, subcategories)
);
