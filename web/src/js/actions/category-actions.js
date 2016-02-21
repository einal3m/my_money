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

  saveCategory(category) {
    if (category.id) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
    }
  }

  createCategory(category) {
    let that = this;
    let apiCategory = categoryTransformer.transformToApi(category);
    return apiUtil.post('http://localhost:3000/categories', {category: apiCategory}).then(response => {
      that.storeCategory(categoryTransformer.transformFromApi(response.category));
    }).catch(function(e) {
      console.log('ERROR: Create Category failed: ', e);
    });
  }

  updateCategory(category) {
    let that = this;
    let apiCategory = categoryTransformer.transformToApi(category);
    return apiUtil.put('http://localhost:3000/categories/' + category.id, {category: apiCategory}).then(response => {
      that.storeCategory(categoryTransformer.transformFromApi(response.category));
    }).catch(function(e) {
      console.log('ERROR: Create Category failed: ', e);
    });
  }

  deleteCategory(categoryId) {
    console.log('delete category', categoryId);
  }

  saveSubcategory(subcategory) {
    if (subcategory.id) {
      this.updateSubcategory(subcategory);
    } else {
      this.createSubcategory(subcategory);
    }
  }

  createSubcategory(subcategory) {
    let that = this;
    let apiSubcategory = subcategoryTransformer.transformToApi(subcategory);
    return apiUtil.post('http://localhost:3000/subcategories', {subcategory: apiSubcategory}).then(response => {
      that.storeSubcategory(subcategoryTransformer.transformFromApi(response.subcategory));
    }).catch(function(e) {
      console.log('ERROR: Create Subcategory failed: ', e);
    });
  }

  updateSubcategory(subcategory) {
    let that = this;
    let apiSubcategory = subcategoryTransformer.transformToApi(subcategory);
    return apiUtil.put('http://localhost:3000/subcategories/' + subcategory.id, {subcategory: apiSubcategory}).then(response => {
      that.storeSubcategory(subcategoryTransformer.transformFromApi(response.subcategory));
    }).catch(function(e) {
      console.log('ERROR: Create Subcategory failed: ', e);
    });
  }

  deleteSubcategory(subcategoryId) {
    console.log('delete subcategory', subcategoryId);
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

  storeSubcategories(subcategories) {
    store.dispatch({
      type: 'SET_SUBCATEGORIES',
      subcategories: subcategories
    })
  }

  storeSubcategory(subcategory) {
    console.log('storeCategory');
    store.dispatch({
      type: 'SET_SUBCATEGORY',
      subcategory: subcategory
    });
  }

}

export default new CategoryActions();
