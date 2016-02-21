
let subcategoryTransformer = {
  transformFromApi(subcategory) {
    return {
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.category_id
    };
  },

  transformToApi(subcategory) {
    return {
      name: subcategory.name,
      category_id: subcategory.categoryId
    }
  }
};

export default subcategoryTransformer;