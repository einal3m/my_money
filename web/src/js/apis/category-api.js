import categoryActions from '../actions/category-actions';
import categoryTransformer from '../transformers/category-transformer';
import reqwest from 'reqwest';

class CategoryApi {
  getCategoryTypes(successCallback) {
    this._send({
        url: 'http://localhost:3000/category_type2',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          categoryActions.storeCategoryTypes(response.category_type2);
          if (successCallback) {
            successCallback();
          }
        }
    });
  }

  getCategories() {
    this._send({
        url: 'http://localhost:3000/categories',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          categoryActions.storeCategories(response.categories.map(category => categoryTransformer.transformFromApi(category)));
        }
    });
  }

  createCategory(category) {
    this._send({
      url: 'http://localhost:3000/categories',
      crossOrigin: true,
      method: 'POST',
      data: {category: categoryTransformer.transformToApi(category)},
      success: function (response) {
        categoryActions.addCategory(categoryTransformer.transformFromApi(response.category))
      }
    });
  }

  updateCategory(category) {
    this._send({
      url: 'http://localhost:3000/categories/' + category.id,
      crossOrigin: true,
      method: 'PUT',
      data: {category: categoryTransformer.transformToApi(category)},
      success: function (response) {
        categoryActions.setCategory(categoryTransformer.transformFromApi(response.category))
      }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new CategoryApi();
