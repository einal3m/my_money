import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const categorySelector = state => state.categoryStore.get('categories');
const subcategorySelector = state => state.categoryStore.get('subcategories');
const categoryTypeSelector = state => state.categoryStore.get('categoryTypes');

function filteredCategoryGroups(categoryTypes, editableOnly = false) {
  if (editableOnly) {
    return categoryTypes.filter(categoryType => categoryType.get('editable'));
  }
  return categoryTypes;
}

function groupCategories(categoryTypes, categories, subcategories, editableOnly = false) {
  const categoryGroups = categories.groupBy(category => category.get('categoryTypeId'));
  return filteredCategoryGroups(categoryTypes, editableOnly).map((categoryType) => {
    const categoriesForType = sorted(categoryGroups.get(categoryType.get('id')));
    if (categoriesForType) {
      const categoriesWithSubcategories = categoriesForType.map((category) => {
        const subcategoriesForCategory = subcategories.filter(
          subcategory => subcategory.get('categoryId') === category.get('id')
        );
        return category.set('subcategories', sorted(subcategoriesForCategory));
      });
      return Map({ categoryType, categories: categoriesWithSubcategories });
    }
    return undefined;
  });
}

function sorted(items) {
  if (!items) {
    return List([]);
  }
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

