import { Subcategory, SubcategoryFormInput } from '../types/models'
import { SubcategoryRequest, SubcategoryResponse } from '../types/api'

const subcategoryTransformer = {
  transformFromApi(subcategory: SubcategoryResponse): Subcategory {
    return {
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.category_id,
    }
  },

  transformToApi(subcategory: SubcategoryFormInput): SubcategoryRequest {
    return {
      name: subcategory.name,
      category_id: subcategory.categoryId,
    }
  },
}

export default subcategoryTransformer
