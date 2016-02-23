import store from '../stores/store';
import apiUtil from '../util/api-util';
import categoryTransformer from '../transformers/category-transformer';
import subcategoryTransformer from '../transformers/subcategory-transformer';

class CategoryActions {

  getCategories() {
    let that = this;
    store.dispatch({type: 'GET_CATEGORIES'});

    return apiUtil.get({
      url: 'http://localhost:3000/category_type2',
      onSuccess: response => this.storeCategoryTypes(response.category_type2)
    }).then(() => {
      apiUtil.get({
        url: 'http://localhost:3000/categories',
        onSuccess: response => that.storeCategories(response.categories.map(category => categoryTransformer.transformFromApi(category)))
    })}).then(() => {
      apiUtil.get({
        url: 'http://localhost:3000/subcategories',
        onSuccess: response => that.storeSubcategories(response.subcategories.map(subcategory => subcategoryTransformer.transformFromApi(subcategory)))
    })});
  }

  saveCategory(category) {
    store.dispatch({type: 'SAVE_CATEGORY'});
    if (category.id) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
    }
  }

  createCategory(category) {
    return apiUtil.post({
      url: 'http://localhost:3000/categories',
      body: {category: categoryTransformer.transformToApi(category)},
      onSuccess: response => this.storeCategory(categoryTransformer.transformFromApi(response.category))
    });
  }

  updateCategory(category) {
    return apiUtil.put({
      url: 'http://localhost:3000/categories/' + category.id,
      body: {category: categoryTransformer.transformToApi(category)},
      onSuccess: response => this.storeCategory(categoryTransformer.transformFromApi(response.category))
    });
  }

  deleteCategory(categoryId) {
    store.dispatch({type: 'DELETE_CATEGORY'});
    return apiUtil.delete({
      url: 'http://localhost:3000/categories/' + categoryId,
      onSuccess: response => this.removeCategory(categoryId)
    });
  }

  saveSubcategory(subcategory) {
    store.dispatch({type: 'SAVE_SUBCATEGORY'});
    if (subcategory.id) {
      this.updateSubcategory(subcategory);
    } else {
      this.createSubcategory(subcategory);
    }
  }

  createSubcategory(subcategory) {
    return apiUtil.post({
      url: 'http://localhost:3000/subcategories',
      body: {subcategory: subcategoryTransformer.transformToApi(subcategory)},
      onSuccess: response => this.storeSubcategory(subcategoryTransformer.transformFromApi(response.subcategory))
    });
  }

  updateSubcategory(subcategory) {
    return apiUtil.put({
      url: 'http://localhost:3000/subcategories/' + subcategory.id,
      body: {subcategory: subcategoryTransformer.transformToApi(subcategory)},
      onSuccess: response => this.storeSubcategory(subcategoryTransformer.transformFromApi(response.subcategory))
    });
  }

  deleteSubcategory(subcategoryId) {
    store.dispatch({type: 'DELETE_SUBCATEGORY'});
    return apiUtil.delete({
      url: 'http://localhost:3000/subcategories/' + subcategoryId,
      onSuccess: () => this.removeSubcategory(subcategoryId)
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

  storeCategory(category) {
    store.dispatch({
      type: 'SET_CATEGORY',
      category: category
    });
  }

  removeCategory(categoryId) {
    store.dispatch({
      type: 'REMOVE_CATEGORY',
      categoryId: categoryId
    });
  }

  storeSubcategories(subcategories) {
    store.dispatch({
      type: 'SET_SUBCATEGORIES',
      subcategories: subcategories
    });
  }

  storeSubcategory(subcategory) {
    store.dispatch({
      type: 'SET_SUBCATEGORY',
      subcategory: subcategory
    });
  }

  removeSubcategory(subcategoryId) {
    store.dispatch({
      type: 'REMOVE_SUBCATEGORY',
      subcategoryId: subcategoryId
    });
  }
}

export default new CategoryActions();
