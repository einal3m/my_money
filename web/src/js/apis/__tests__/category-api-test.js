import categoryApi from '../category-api';
import categoryActions from '../../actions/category-actions';
import categoryTransformer from '../../transformers/category-transformer';

describe('categoryApi', () => {
  beforeEach(function() {
    spyOn(categoryApi, '_send');
  });

  describe('getCategoryTypes', () => {
    it('makes an ajax request to GET/category_types', () => {
      let callBackSpy = jasmine.createSpy('successCallBack');
      categoryApi.getCategoryTypes(callBackSpy);

      let requestParams = categoryApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/category_type2');
      expect(requestParams.method).toEqual('GET');

      spyOn(categoryActions, 'storeCategoryTypes');
      requestParams.success({category_type2: ['categoryTypes']});
      expect(categoryActions.storeCategoryTypes).toHaveBeenCalledWith(['categoryTypes']);
      expect(callBackSpy).toHaveBeenCalled();
    });
  });

  describe('getCategories', () => {
    it('makes an ajax request to GET/categories', () => {
      categoryApi.getCategories();

      let requestParams = categoryApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/categories');
      expect(requestParams.method).toEqual('GET');

      spyOn(categoryActions, 'storeCategories');
      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('transformedCategories');
      requestParams.success({categories: ['categories']});
      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('categories')
      expect(categoryActions.storeCategories).toHaveBeenCalledWith(['transformedCategories']);
    });
  });

  describe('createCategory', () => {
    it('makes an ajax request to POST/categories', () => {
      spyOn(categoryTransformer, 'transformToApi').and.returnValue('transformedToApi');
      categoryApi.createCategory('category');

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith('category');
      expect(categoryApi._send).toHaveBeenCalled();

      let requestParams = categoryApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/categories');
      expect(requestParams.method).toEqual('POST');

      let requestData = requestParams.data;
      expect(requestData).toEqual({category: 'transformedToApi'});

      spyOn(categoryActions, 'addCategory');
      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({category: 'category'});
      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('category');
      expect(categoryActions.addCategory).toHaveBeenCalledWith('transformedFromApi');
    });
  });

  describe('updateCategory', () => {
    it('makes an ajax request to PUT/categories/:id', () => {
      let category = {id: 5, name: 'Hello', categoryType: {id: 2}};
      categoryApi.updateCategory(category);

      expect(categoryApi._send).toHaveBeenCalled();

      let requestParams = categoryApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/categories/5');
      expect(requestParams.method).toEqual('PUT');

      let requestData = requestParams.data;
      expect(requestData).toEqual({category: {id: 5, name: 'Hello', category_type_id: 2}});

      spyOn(categoryActions, 'setCategory');
      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({category: 'category'});
      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('category');
      expect(categoryActions.setCategory).toHaveBeenCalledWith('transformedFromApi');
    });
  });
});
