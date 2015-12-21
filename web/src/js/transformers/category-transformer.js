
let categoryTransformer = {
  transformToApi(category) {
    return {
      name: category.name,
      category_type_id: category.categoryType.get('id')
    };
  }
}

export default categoryTransformer;