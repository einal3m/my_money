import categoryTransformer from 'transformers/categoryTransformer'
import { CategoryFormInput } from 'types/models'

describe('CategoryTransformer', () => {
  describe('transformToApi', () => {
    it('converts new category to API format', () => {
      const category: CategoryFormInput = {
        name: 'myCategory',
        categoryTypeId: 2,
      }

      const transformedCategory = categoryTransformer.transformToApi(category)

      expect(transformedCategory.name).toEqual('myCategory')
      expect(transformedCategory.category_type_id).toEqual(2)
    })

    it('converts existing category to API format', () => {
      const category = {
        id: 11,
        name: 'myCategory',
        categoryTypeId: 2,
      }

      const transformedCategory = categoryTransformer.transformToApi(category)

      expect(transformedCategory.name).toEqual('myCategory')
      expect(transformedCategory.category_type_id).toEqual(2)
    })
  })

  describe('transformFromApi', () => {
    it('converts category from API format', () => {
      const category = {
        id: 23,
        name: 'myCategory',
        category_type_id: 2,
      }

      const transformedCategory = categoryTransformer.transformFromApi(category)

      expect(transformedCategory.id).toEqual(23)
      expect(transformedCategory.name).toEqual('myCategory')
      expect(transformedCategory.categoryTypeId).toEqual(2)
    })
  })
})
