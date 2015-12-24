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

  createCategory(category) {
    this._send({
      url: 'http://localhost:3000/categories',
      crossOrigin: true,
      method: 'POST',
      data: {category: categoryTransformer.transformToApi(category)},
      success: function (response) {
        console.log('save success', response);
        categoryActions.storeCategory(response.category)
      }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new CategoryApi();
