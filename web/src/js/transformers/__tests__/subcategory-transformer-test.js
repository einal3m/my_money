import subcategoryTransformer from '../subcategory-transformer';

describe('SubcategoryTransformer', () => {
  describe('transformFromApi', () => {
    it('converts subcategory from API format', () => {
      let subcategory = {
        id: 23,
        name: 'mySubcategory',
        category_id: 2
      }

      let transformedSubcategory = subcategoryTransformer.transformFromApi(subcategory);

      expect(transformedSubcategory.id).toEqual(23);
      expect(transformedSubcategory.name).toEqual('mySubcategory');
      expect(transformedSubcategory.categoryId).toEqual(2);
    });
  });
});
