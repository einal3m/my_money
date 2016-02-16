
let subcategoryTransformer = {
  transformFromApi(subcategory) {
    return {
      id: subcategory.id,
      name: subcategory.name,
      categoryId: subcategory.category_id
    };
  }
}

export default subcategoryTransformer;