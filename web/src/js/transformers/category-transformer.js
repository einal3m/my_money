
let categoryTransformer = {
  transformToApi(category) {
    let apiCategory = {
      name: category.name,
      category_type_id: category.categoryType.id
    };

    if (category.id) {
      apiCategory.id = category.id;
    }
    return apiCategory;
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