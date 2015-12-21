import categoryTransformer from '../category-transformer';
import { fromJS } from 'immutable';

describe('CategoryTransformer', () => {
  describe('transformToApi', () => {
    it('converts category to API format', () => {
      let category={
        name: 'myCategory',
        categoryType: fromJS({id: 2})
      }

      let transformedCategory = categoryTransformer.transformToApi(category);

      expect(transformedCategory.name).toEqual('myCategory');
      expect(transformedCategory.category_type_id).toEqual(2);
    });
  });
});
