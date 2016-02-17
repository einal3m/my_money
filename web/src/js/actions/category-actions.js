import categoryApi from '../apis/category-api';
import store from '../stores/store';
import apiUtil from '../util/api-util';
import categoryTransformer from '../transformers/category-transformer';
import subcategoryTransformer from '../transformers/subcategory-transformer';

class CategoryActions {

  getCategories() {
    let that = this;
    return apiUtil.get('http://localhost:3000/category_type2').then(response => {
      that.storeCategoryTypes(response.category_type2);
    }).then(() => {
      apiUtil.get('http://localhost:3000/categories').then(response => {
      that.storeCategories(response.categories.map(category => categoryTransformer.transformFromApi(category)));
    })}).then(() => {
      apiUtil.get('http://localhost:3000/subcategories').then(response => {
      that.storeSubcategories(response.subcategories.map(subcategory => subcategoryTransformer.transformFromApi(subcategory)));
    })}).catch(function(e) {
      console.log('ERROR: ', e);
    });
  }

  storeCategoryTypes(categoryTypes) {
    store.dispatch({
      type: 'SET_CATEGORY_TYPES',
      categoryTypes: categoryTypes
    });
  }

  storeCategories(categories) {
    store.dispatch({
      type: 'SET_CATEGORIES',
      categories: categories
    })
  }

  storeSubcategories(subcategories) {
    store.dispatch({
      type: 'SET_SUBCATEGORIES',
      subcategories: subcategories
    })
  }

  createCategory(category) {
    categoryApi.createCategory(category);
  }

  saveSubcategory(subcategory) {
    console.log(subcategory);
  }

  updateCategory(category) {
    categoryApi.updateCategory(category);
  }

  addCategory(category) {
    store.dispatch({
      type: 'ADD_CATEGORY',
      category: category
    });
  }

  setCategory(category) {
    store.dispatch({
      type: 'SET_CATEGORY',
      category: category
    });
  }
}

export default new CategoryActions();
