import subcategoryTransformer from "transformers/subcategory-transformer";

describe("SubcategoryTransformer", () => {
  describe("transformFromApi", () => {
    it("converts subcategory from API format", () => {
      const subcategory = {
        id: 23,
        name: "mySubcategory",
        category_id: 2,
      };

      const transformedSubcategory =
        subcategoryTransformer.transformFromApi(subcategory);

      expect(transformedSubcategory.id).toEqual(23);
      expect(transformedSubcategory.name).toEqual("mySubcategory");
      expect(transformedSubcategory.categoryId).toEqual(2);
    });
  });

  describe("transformToApi", () => {
    it("converts new subcategory to API format", () => {
      const subcategory = {
        name: "mySubcategory",
        categoryId: 2,
      };

      const transformedSubcategory =
        subcategoryTransformer.transformToApi(subcategory);

      expect(transformedSubcategory.name).toEqual("mySubcategory");
      expect(transformedSubcategory.category_id).toEqual(2);
    });
  });
});
