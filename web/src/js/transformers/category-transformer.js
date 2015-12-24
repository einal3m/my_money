
let categoryTransformer = {
  transformToApi(category) {
    return {
      name: category.name,
      category_type_id: category.categoryType.get('id')
    };
  },

  transformFromApi(category) {
    return {
      id: category.id,
      name: category.name,
      categoryTypeId: category.category_type_id
    };
  }
}

export default categoryTransformer;