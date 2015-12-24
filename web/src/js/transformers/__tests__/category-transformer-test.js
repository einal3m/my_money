import categoryTransformer from '../category-transformer';
import { fromJS } from 'immutable';

describe('CategoryTransformer', () => {
  describe('transformToApi', () => {
    it('converts category to API format', () => {
      let category = {
        name: 'myCategory',
        categoryType: fromJS({id: 2})
      }

      let transformedCategory = categoryTransformer.transformToApi(category);

      expect(transformedCategory.name).toEqual('myCategory');
      expect(transformedCategory.category_type_id).toEqual(2);
    });
  });

  describe('transformFromApi', () => {
    it('converts category from API format', () => {
      let category = {
        id: 23,
        name: 'myCategory',
        category_type_id: 2
      }

      let transformedCategory = categoryTransformer.transformFromApi(category);

      expect(transformedCategory.id).toEqual(23);
      expect(transformedCategory.name).toEqual('myCategory');
      expect(transformedCategory.categoryTypeId).toEqual(2);
    });
  });
});
