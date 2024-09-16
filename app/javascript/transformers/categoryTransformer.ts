import { Category } from '../types/models'
import { CategoryRequest, CategoryResponse } from '../types/api'

const categoryTransformer = {
  transformToApi(category: Category): CategoryRequest {
    return {
      name: category.name,
      category_type_id: category.categoryTypeId,
    }
  },

  transformFromApi(category: CategoryResponse): Category {
    return {
      id: category.id,
      name: category.name,
      categoryTypeId: category.category_type_id,
    }
  },
}

export default categoryTransformer
